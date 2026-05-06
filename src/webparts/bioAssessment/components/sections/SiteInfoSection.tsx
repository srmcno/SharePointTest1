import * as React from 'react';
import { Stack, TextField, Label } from '@fluentui/react';
import { IBioAssessmentFormData } from '../types/IBioAssessmentData';

interface ISiteInfoSectionProps {
  data: IBioAssessmentFormData;
  onChange: (field: keyof IBioAssessmentFormData, value: any) => void;
}

const SiteInfoSection: React.FC<ISiteInfoSectionProps> = ({ data, onChange }) => {
  return (
    <Stack tokens={{ childrenGap: 12 }}>
      <Label style={{ fontSize: 16, fontWeight: 600 }}>Site Information</Label>
      <Stack horizontal tokens={{ childrenGap: 16 }} wrap>
        <Stack.Item grow={1} style={{ minWidth: 220 }}>
          <TextField
            label="Site ID"
            required
            value={data.siteId}
            onChange={(_, v) => onChange('siteId', v || '')}
            placeholder="Enter site identifier"
          />
        </Stack.Item>
        <Stack.Item grow={1} style={{ minWidth: 220 }}>
          <TextField
            label="Collector"
            required
            value={data.collector}
            onChange={(_, v) => onChange('collector', v || '')}
            placeholder="Collector name"
          />
        </Stack.Item>
        <Stack.Item grow={1} style={{ minWidth: 180 }}>
          <TextField
            label="Assessment Date"
            type="date"
            value={data.assessmentDate}
            onChange={(_, v) => onChange('assessmentDate', v || '')}
          />
        </Stack.Item>
      </Stack>
    </Stack>
  );
};

export default SiteInfoSection;
