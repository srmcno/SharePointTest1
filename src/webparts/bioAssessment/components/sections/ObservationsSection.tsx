import * as React from 'react';
import { Stack, Label, Checkbox } from '@fluentui/react';
import { IVisualObservations } from '../types/IBioAssessmentData';

interface IObservationsSectionProps {
  observations: IVisualObservations;
  onChange: (field: keyof IVisualObservations, value: boolean) => void;
}

interface IObsGroup {
  label: string;
  fields: { key: keyof IVisualObservations; label: string }[];
}

const OBS_GROUPS: IObsGroup[] = [
  {
    label: 'General Conditions',
    fields: [
      { key: 'clean', label: 'Clean' },
      { key: 'flowAlteration', label: 'Flow Alteration' }
    ]
  },
  {
    label: 'Surface Conditions',
    fields: [
      { key: 'oilyFilm', label: 'Oily Film / Grease' },
      { key: 'floatingDetritus', label: 'Floating Detritus' },
      { key: 'foamScum', label: 'Foam / Scum' },
      { key: 'ironPrecipitates', label: 'Iron Precipitates' }
    ]
  },
  {
    label: 'Biological Indicators',
    fields: [
      { key: 'fishKill', label: 'Fish Kill' },
      { key: 'deadAnimals', label: 'Dead Animal(s)' },
      { key: 'significantAlgae', label: 'Significant Algae' }
    ]
  },
  {
    label: 'Other Impacts',
    fields: [
      { key: 'habitatAlteration', label: 'Habitat Alteration' },
      { key: 'trash', label: 'Trash' },
      { key: 'offensiveOdor', label: 'Offensive Odor' }
    ]
  }
];

const ObservationsSection: React.FC<IObservationsSectionProps> = ({ observations, onChange }) => {
  return (
    <Stack tokens={{ childrenGap: 16 }}>
      <Label style={{ fontSize: 16, fontWeight: 600 }}>Visual Observations</Label>

      <Stack horizontal wrap tokens={{ childrenGap: 24 }}>
        {OBS_GROUPS.map(group => (
          <Stack key={group.label} style={{ minWidth: 200 }} tokens={{ childrenGap: 8 }}>
            <Label style={{ color: '#0078d4', fontWeight: 600 }}>{group.label}</Label>
            {group.fields.map(field => (
              <Checkbox
                key={field.key}
                label={field.label}
                checked={observations[field.key]}
                onChange={(_, checked) => onChange(field.key, !!checked)}
              />
            ))}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default ObservationsSection;
