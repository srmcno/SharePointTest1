import * as React from 'react';
import { Stack, Label, Checkbox, TextField } from '@fluentui/react';
import { IBioAssessmentFormData } from '../types/IBioAssessmentData';
import { SUBSTRATE_OPTIONS } from '../constants/formConstants';

interface ISubstratesSectionProps {
  data: IBioAssessmentFormData;
  onChange: (field: keyof IBioAssessmentFormData, value: any) => void;
}

const SubstratesSection: React.FC<ISubstratesSectionProps> = ({ data, onChange }) => {
  const toggleSubstrate = (substrate: string, checked: boolean) => {
    const current = data.substrates;
    if (checked) {
      onChange('substrates', [...current, substrate]);
    } else {
      onChange('substrates', current.filter(s => s !== substrate));
    }
  };

  return (
    <Stack tokens={{ childrenGap: 16 }}>
      <Stack tokens={{ childrenGap: 10 }}>
        <Label style={{ fontSize: 16, fontWeight: 600 }}>Substrates</Label>
        <Label style={{ color: '#605e5c' }}>Select all substrate types present at the site</Label>
        <Stack horizontal wrap tokens={{ childrenGap: 12 }}>
          {SUBSTRATE_OPTIONS.map(substrate => (
            <Stack.Item key={substrate} style={{ minWidth: 140 }}>
              <Checkbox
                label={substrate}
                checked={data.substrates.indexOf(substrate) !== -1}
                onChange={(_, checked) => toggleSubstrate(substrate, !!checked)}
              />
            </Stack.Item>
          ))}
        </Stack>
      </Stack>

      <Stack tokens={{ childrenGap: 8 }}>
        <Label style={{ fontSize: 16, fontWeight: 600 }}>Canopy Coverage</Label>
        <Stack horizontal verticalAlign="end" tokens={{ childrenGap: 8 }}>
          <Stack.Item style={{ width: 160 }}>
            <TextField
              label="Canopy Coverage (%)"
              type="number"
              min={0}
              max={100}
              value={data.canopyCoverage !== '' ? String(data.canopyCoverage) : ''}
              onChange={(_, v) => onChange('canopyCoverage', v !== '' ? Number(v) : '')}
              suffix="%"
              placeholder="0–100"
            />
          </Stack.Item>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SubstratesSection;
