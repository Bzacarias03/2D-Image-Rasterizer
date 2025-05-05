import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { fabric } from 'fabric';

const ProcessorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CanvasContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border: 1px solid #ddd;
  overflow: hidden;
`;

const Canvas = styled.canvas`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: ${props => props.primary ? '#2c3e50' : '#e74c3c'};
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.primary ? '#34495e' : '#c0392b'};
  }
`;

const ZoomControls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

function ImageProcessor({ image, settings, onReset }) {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (canvasRef.current && !fabricCanvas) {
      const canvas = new fabric.Canvas(canvasRef.current);
      setFabricCanvas(canvas);
    }
  }, [fabricCanvas]);

  useEffect(() => {
    if (image && fabricCanvas) {
      processImage();
    }
  }, [image, fabricCanvas, settings]);

  const processImage = async () => {
    try {
      const imageUrl = URL.createObjectURL(image);
      
      fabric.Image.fromURL(imageUrl, (img) => {
        // Clear previous content
        fabricCanvas.clear();
        
        // Calculate dimensions based on resolution
        const scale = settings.resolution / 72; // Convert from 72 DPI to target DPI
        const width = img.width * scale;
        const height = img.height * scale;
        
        // Set canvas size
        fabricCanvas.setWidth(width);
        fabricCanvas.setHeight(height);
        
        // Add image to canvas
        img.scale(scale);
        fabricCanvas.add(img);
        fabricCanvas.centerObject(img);
        
        // Apply pixelation if enabled
        if (settings.showPixels) {
          const pixelSize = Math.max(1, Math.floor(300 / settings.resolution));
          img.filters.push(new fabric.Image.filters.Pixelate({ blocksize: pixelSize }));
          img.applyFilters();
        }
        
        fabricCanvas.renderAll();
      });
    } catch (error) {
      console.error('Error processing image:', error);
    }
  };

  const handleZoom = (delta) => {
    const newZoom = Math.max(0.1, Math.min(5, zoom + delta));
    setZoom(newZoom);
    if (fabricCanvas) {
      fabricCanvas.setZoom(newZoom);
      fabricCanvas.renderAll();
    }
  };

  const handleDownload = () => {
    if (fabricCanvas) {
      // Create a temporary canvas for the final image
      const tempCanvas = document.createElement('canvas');
      const ctx = tempCanvas.getContext('2d');
      
      // Set the temporary canvas size to match the fabric canvas
      tempCanvas.width = fabricCanvas.width;
      tempCanvas.height = fabricCanvas.height;
      
      // Draw the fabric canvas content to the temporary canvas
      ctx.drawImage(fabricCanvas.lowerCanvasEl, 0, 0);
      
      // Convert to the desired format and quality
      const mimeType = `image/${settings.format}`;
      const quality = settings.quality / 100;
      
      // Create the download link
      const dataURL = tempCanvas.toDataURL(mimeType, quality);
      const a = document.createElement('a');
      a.href = dataURL;
      a.download = `processed.${settings.format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <ProcessorContainer>
      <CanvasContainer>
        <Canvas ref={canvasRef} />
      </CanvasContainer>
      <Controls>
        <ZoomControls>
          <Button onClick={() => handleZoom(-0.1)}>-</Button>
          <span>{Math.round(zoom * 100)}%</span>
          <Button onClick={() => handleZoom(0.1)}>+</Button>
        </ZoomControls>
        <Button primary onClick={handleDownload}>
          Download
        </Button>
        <Button onClick={onReset}>
          Reset
        </Button>
      </Controls>
    </ProcessorContainer>
  );
}

export default ImageProcessor; 