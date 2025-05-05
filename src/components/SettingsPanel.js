import React from 'react';
import styled from 'styled-components';

const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SettingGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Checkbox = styled.input`
  width: 1.2rem;
  height: 1.2rem;
`;

function SettingsPanel({ settings, onChange }) {
  const handleChange = (key, value) => {
    onChange({
      ...settings,
      [key]: value
    });
  };

  return (
    <PanelContainer>
      <SettingGroup>
        <Label htmlFor="resolution">Resolution (DPI)</Label>
        <Input
          type="number"
          id="resolution"
          min="72"
          max="1200"
          step="1"
          value={settings.resolution}
          onChange={(e) => handleChange('resolution', parseInt(e.target.value))}
        />
      </SettingGroup>

      <SettingGroup>
        <Label htmlFor="format">Output Format</Label>
        <Select
          id="format"
          value={settings.format}
          onChange={(e) => handleChange('format', e.target.value)}
        >
          <option value="png">PNG</option>
          <option value="jpg">JPG</option>
          <option value="webp">WebP</option>
        </Select>
      </SettingGroup>

      <SettingGroup>
        <Label htmlFor="quality">Quality (%)</Label>
        <Input
          type="range"
          id="quality"
          min="1"
          max="100"
          value={settings.quality}
          onChange={(e) => handleChange('quality', parseInt(e.target.value))}
        />
        <span>{settings.quality}%</span>
      </SettingGroup>

      <SettingGroup>
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            id="showPixels"
            checked={settings.showPixels}
            onChange={(e) => handleChange('showPixels', e.target.checked)}
          />
          <Label htmlFor="showPixels">Show Individual Pixels</Label>
        </CheckboxContainer>
      </SettingGroup>
    </PanelContainer>
  );
}

export default SettingsPanel; 