import * as React from 'react';
import {
  Stack, Label, DefaultButton, IconButton, TextField,
  Dropdown, IDropdownOption, Separator, Text
} from '@fluentui/react';
import { IFishObservation } from '../types/IBioAssessmentData';
import {
  FISH_VERIFIED_BY_OPTIONS,
  FISH_GROWTH_STAGE_OPTIONS,
  FISH_DEAD_OR_ALIVE_OPTIONS
} from '../constants/formConstants';

interface IFishSectionProps {
  observations: IFishObservation[];
  onChange: (observations: IFishObservation[]) => void;
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

const emptyFish = (): IFishObservation => ({
  id: generateId(),
  species: '',
  count: 0,
  growthStage: '',
  measurement: 0,
  anomalies: '',
  deadOrAlive: 'alive',
  verifiedBy: ''
});

const FishSection: React.FC<IFishSectionProps> = ({ observations, onChange }) => {
  const addRow = () => onChange([...observations, emptyFish()]);

  const updateRow = (id: string, field: keyof IFishObservation, value: any) => {
    onChange(observations.map(o => o.id === id ? { ...o, [field]: value } : o));
  };

  const removeRow = (id: string) => {
    onChange(observations.filter(o => o.id !== id));
  };

  return (
    <Stack tokens={{ childrenGap: 12 }}>
      <Label style={{ fontSize: 16, fontWeight: 600 }}>Fish Observations</Label>

      {observations.length === 0 && (
        <Text style={{ color: '#605e5c', fontStyle: 'italic' }}>
          No fish observations recorded. Click "Add Fish" to begin.
        </Text>
      )}

      {observations.map((obs, idx) => (
        <Stack key={obs.id} style={{ border: '1px solid #edebe9', borderRadius: 4, padding: 12 }} tokens={{ childrenGap: 10 }}>
          <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
            <Text style={{ fontWeight: 600, color: '#0078d4' }}>Fish #{idx + 1}</Text>
            <IconButton
              iconProps={{ iconName: 'Delete' }}
              title="Remove this fish observation"
              onClick={() => removeRow(obs.id)}
              styles={{ root: { color: '#a4262c' } }}
            />
          </Stack>

          <Stack horizontal tokens={{ childrenGap: 12 }} wrap>
            <Stack.Item grow={2} style={{ minWidth: 200 }}>
              <TextField
                label="Species"
                value={obs.species}
                onChange={(_, v) => updateRow(obs.id, 'species', v || '')}
                placeholder="Common or scientific name"
              />
            </Stack.Item>
            <Stack.Item style={{ minWidth: 100 }}>
              <TextField
                label="Count"
                type="number"
                min={0}
                value={String(obs.count)}
                onChange={(_, v) => updateRow(obs.id, 'count', Number(v) || 0)}
              />
            </Stack.Item>
            <Stack.Item style={{ minWidth: 150 }}>
              <Dropdown
                label="Growth Stage"
                selectedKey={obs.growthStage}
                options={FISH_GROWTH_STAGE_OPTIONS}
                onChange={(_, option?: IDropdownOption) => updateRow(obs.id, 'growthStage', option?.key || '')}
                placeholder="Select stage"
              />
            </Stack.Item>
            <Stack.Item style={{ minWidth: 130 }}>
              <TextField
                label="Measurement (mm)"
                type="number"
                min={0}
                value={obs.measurement > 0 ? String(obs.measurement) : ''}
                onChange={(_, v) => updateRow(obs.id, 'measurement', Number(v) || 0)}
                placeholder="Length in mm"
              />
            </Stack.Item>
          </Stack>

          <Stack horizontal tokens={{ childrenGap: 12 }} wrap>
            <Stack.Item grow={2} style={{ minWidth: 240 }}>
              <TextField
                label="External Anomalies or Deformities"
                value={obs.anomalies}
                onChange={(_, v) => updateRow(obs.id, 'anomalies', v || '')}
                placeholder="Describe any deformities, lesions, etc."
                multiline
                rows={2}
              />
            </Stack.Item>
            <Stack.Item style={{ minWidth: 140 }}>
              <Dropdown
                label="Dead or Alive"
                selectedKey={obs.deadOrAlive}
                options={FISH_DEAD_OR_ALIVE_OPTIONS}
                onChange={(_, option?: IDropdownOption) => updateRow(obs.id, 'deadOrAlive', option?.key || 'alive')}
              />
            </Stack.Item>
            <Stack.Item style={{ minWidth: 160 }}>
              <Dropdown
                label="Verified By"
                selectedKey={obs.verifiedBy}
                options={FISH_VERIFIED_BY_OPTIONS}
                onChange={(_, option?: IDropdownOption) => updateRow(obs.id, 'verifiedBy', option?.key || '')}
                placeholder="Select method"
              />
            </Stack.Item>
          </Stack>
        </Stack>
      ))}

      <DefaultButton
        iconProps={{ iconName: 'Add' }}
        text="Add Fish"
        onClick={addRow}
        style={{ alignSelf: 'flex-start' }}
      />
    </Stack>
  );
};

export default FishSection;
