import React from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border: 2px dashed #ccc;
  border-radius: 8px;
  background-color: #fafafa;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #2c3e50;
    background-color: #f0f0f0;
  }
`;

const UploadIcon = styled.div`
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const UploadText = styled.p`
  color: #666;
  text-align: center;
  margin: 0;
`;

const SupportedFormats = styled.div`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #888;
`;

function ImageUploader({ onUpload }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.svg'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onUpload(acceptedFiles[0]);
      }
    }
  });

  return (
    <UploadContainer {...getRootProps()}>
      <input {...getInputProps()} />
      <UploadIcon>📁</UploadIcon>
      {isDragActive ? (
        <UploadText>Drop the file here...</UploadText>
      ) : (
        <>
          <UploadText>Drag & drop an image here, or click to select</UploadText>
          <SupportedFormats>
            Supported formats: PNG, JPG, JPEG, GIF, SVG, PDF
          </SupportedFormats>
        </>
      )}
    </UploadContainer>
  );
}

export default ImageUploader; 