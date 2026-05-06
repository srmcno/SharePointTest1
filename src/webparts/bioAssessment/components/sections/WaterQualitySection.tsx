import * as React from 'react';
import { Stack, Label, TextField, Dropdown, IDropdownOption } from '@fluentui/react';
import { IWaterQuality } from '../types/IBioAssessmentData';
import { ALGAE_DENSITY_OPTIONS } from '../constants/formConstants';

interface IWaterQualitySectionProps {
  waterQuality: IWaterQuality;
  onChange: (field: keyof IWaterQuality, value: any) => void;
}

interface IFieldDef {
  key: keyof IWaterQuality;
  label: string;
  unit: string;
  placeholder?: string;
  type?: 'dropdown';
}

const FIELDS: IFieldDef[] = [
  { key: 'temperature', label: 'Temperature, Water', unit: '°C', placeholder: 'e.g. 18.5' },
  { key: 'conductivity', label: 'Conductivity', unit: 'μS/cm', placeholder: 'e.g. 320' },
  { key: 'ph', label: 'pH', unit: '', placeholder: '0–14' },
  { key: 'turbidity', label: 'Turbidity', unit: 'NTU', placeholder: 'e.g. 5.2' },
  { key: 'dissolvedOxygen', label: 'Dissolved Oxygen (DO)', unit: 'mg/L', placeholder: 'e.g. 8.1' },
  { key: 'chlorophyllA', label: 'Chlorophyll a (probe)', unit: 'μg/L', placeholder: 'e.g. 12.4' },
  { key: 'flow', label: 'Flow', unit: 'cfs', placeholder: 'e.g. 45' }
];

const WaterQualitySection: React.FC<IWaterQualitySectionProps> = ({ waterQuality, onChange }) => {
  return (
    <Stack tokens={{ childrenGap: 12 }}>
      <Label style={{ fontSize: 16, fontWeight: 600 }}>Water Quality Parameters</Label>

      <Stack horizontal wrap tokens={{ childrenGap: 16 }}>
        {FIELDS.map(field => (
          <Stack.Item key={field.key} style={{ minWidth: 170 }}>
            <TextField
              label={field.label}
              type="number"
              value={waterQuality[field.key] !== '' ? String(waterQuality[field.key]) : ''}
              onChange={(_, v) => onChange(field.key, v !== '' ? v : '')}
              placeholder={field.placeholder}
              suffix={field.unit}
            />
          </Stack.Item>
        ))}

        <Stack.Item style={{ minWidth: 200 }}>
          <Dropdown
            label="Algae, Blue-Green (Cyanophyta) Density"
            selectedKey={waterQuality.algaeDensity as string}
            options={ALGAE_DENSITY_OPTIONS}
            onChange={(_, option?: IDropdownOption) => onChange('algaeDensity', option?.key || '')}
            placeholder="Select density"
          />
        </Stack.Item>
      </Stack>
    </Stack>
  );
};

export default WaterQualitySection;
