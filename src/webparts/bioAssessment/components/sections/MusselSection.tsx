import * as React from 'react';
import {
  Stack, Label, DefaultButton, IconButton,
  Dropdown, IDropdownOption, TextField, Toggle, Text
} from '@fluentui/react';
import { IMusselObservation } from '../types/IBioAssessmentData';
import { MUSSEL_SPECIES_OPTIONS, MUSSEL_GROWTH_STAGE_OPTIONS } from '../constants/formConstants';

interface IMusselSectionProps {
  musselsPresent: boolean;
  observations: IMusselObservation[];
  onPresentChange: (present: boolean) => void;
  onChange: (observations: IMusselObservation[]) => void;
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

const emptyMussel = (): IMusselObservation => ({
  id: generateId(),
  species: '',
  count: 0,
  growthStage: ''
});

const MusselSection: React.FC<IMusselSectionProps> = ({
  musselsPresent, observations, onPresentChange, onChange
}) => {
  const addRow = () => onChange([...observations, emptyMussel()]);

  const updateRow = (id: string, field: keyof IMusselObservation, value: any) => {
    onChange(observations.map(o => o.id === id ? { ...o, [field]: value } : o));
  };

  const removeRow = (id: string) => {
    onChange(observations.filter(o => o.id !== id));
  };

  return (
    <Stack tokens={{ childrenGap: 12 }}>
      <Label style={{ fontSize: 16, fontWeight: 600 }}>Mussel Observations</Label>

      <Toggle
        label="Mussels Present?"
        checked={musselsPresent}
        onText="Yes"
        offText="No"
        onChange={(_, checked) => onPresentChange(!!checked)}
      />

      {musselsPresent && (
        <Stack tokens={{ childrenGap: 12 }}>
          {observations.length === 0 && (
            <Text style={{ color: '#605e5c', fontStyle: 'italic' }}>
              No mussel observations recorded. Click "Add Mussel" to begin.
            </Text>
          )}

          {observations.map((obs, idx) => (
            <Stack
              key={obs.id}
              style={{ border: '1px solid #edebe9', borderRadius: 4, padding: 12 }}
              tokens={{ childrenGap: 10 }}
            >
              <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                <Text style={{ fontWeight: 600, color: '#0078d4' }}>Mussel #{idx + 1}</Text>
                <IconButton
                  iconProps={{ iconName: 'Delete' }}
                  title="Remove this mussel observation"
                  onClick={() => removeRow(obs.id)}
                  styles={{ root: { color: '#a4262c' } }}
                />
              </Stack>

              <Stack horizontal tokens={{ childrenGap: 12 }} wrap>
                <Stack.Item grow={2} style={{ minWidth: 240 }}>
                  <Dropdown
                    label="Species"
                    selectedKey={obs.species}
                    options={MUSSEL_SPECIES_OPTIONS}
                    onChange={(_, option?: IDropdownOption) => updateRow(obs.id, 'species', option?.key || '')}
                    placeholder="Select mussel species"
                  />
                </Stack.Item>
                <Stack.Item style={{ minWidth: 100 }}>
                  <TextField
                    label="Count"
                    type="number"
                    min={0}
                    value={obs.count > 0 ? String(obs.count) : ''}
                    onChange={(_, v) => updateRow(obs.id, 'count', Number(v) || 0)}
                  />
                </Stack.Item>
                <Stack.Item style={{ minWidth: 160 }}>
                  <Dropdown
                    label="Growth Stage"
                    selectedKey={obs.growthStage}
                    options={MUSSEL_GROWTH_STAGE_OPTIONS}
                    onChange={(_, option?: IDropdownOption) => updateRow(obs.id, 'growthStage', option?.key || '')}
                    placeholder="Select stage"
                  />
                </Stack.Item>
              </Stack>
            </Stack>
          ))}

          <DefaultButton
            iconProps={{ iconName: 'Add' }}
            text="Add Mussel"
            onClick={addRow}
            style={{ alignSelf: 'flex-start' }}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default MusselSection;
