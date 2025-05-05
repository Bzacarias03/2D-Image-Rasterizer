import React, { useState } from 'react';
import styled from 'styled-components';
import ImageUploader from './components/ImageUploader';
import ImageProcessor from './components/ImageProcessor';
import SettingsPanel from './components/SettingsPanel';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Header = styled.header`
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  text-align: center;
`;

const MainContent = styled.main`
  display: flex;
  flex: 1;
  padding: 2rem;
  gap: 2rem;
`;

const LeftPanel = styled.div`
  flex: 1;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const RightPanel = styled.div`
  width: 300px;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

// Default settings object
const defaultSettings = {
  resolution: 300,
  format: 'png',
  quality: 100,
  showPixels: true
};

function App() {
  const [image, setImage] = useState(null);
  const [settings, setSettings] = useState(defaultSettings);

  const handleImageUpload = (file) => {
    setImage(file);
  };

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
  };

  const handleReset = () => {
    setImage(null);
    setSettings(defaultSettings);
  };

  return (
    <AppContainer>
      <Header>
        <h1>Advanced Image Rasterizer</h1>
      </Header>
      <MainContent>
        <LeftPanel>
          {!image ? (
            <ImageUploader onUpload={handleImageUpload} />
          ) : (
            <ImageProcessor
              image={image}
              settings={settings}
              onReset={handleReset}
            />
          )}
        </LeftPanel>
        <RightPanel>
          <SettingsPanel
            settings={settings}
            onChange={handleSettingsChange}
          />
        </RightPanel>
      </MainContent>
    </AppContainer>
  );
}

export default App;
