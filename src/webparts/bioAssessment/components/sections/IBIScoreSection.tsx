import * as React from 'react';
import { Stack, Label, TextField, Text, MessageBar, MessageBarType } from '@fluentui/react';
import { IBioAssessmentFormData } from '../types/IBioAssessmentData';

interface IIBIScoreSectionProps {
  data: IBioAssessmentFormData;
  onChange: (field: keyof IBioAssessmentFormData, value: any) => void;
}

function getIBIInterpretation(score: number | string): { text: string; type: MessageBarType } | null {
  const n = Number(score);
  if (isNaN(n) || score === '') return null;

  if (n >= 48) return { text: `Score ${n}: Excellent — High diversity, sensitive species present, minimal human disturbance.`, type: MessageBarType.success };
  if (n >= 36) return { text: `Score ${n}: Good — Above average diversity and community health.`, type: MessageBarType.success };
  if (n >= 24) return { text: `Score ${n}: Fair — Moderate disturbance, some pollution-tolerant species.`, type: MessageBarType.warning };
  if (n >= 12) return { text: `Score ${n}: Poor — Fewer species, dominance by pollution-tolerant taxa, higher disturbance.`, type: MessageBarType.error };
  return { text: `Score ${n}: Very Poor — Severely degraded, consider immediate investigation.`, type: MessageBarType.error };
}

const IBIScoreSection: React.FC<IIBIScoreSectionProps> = ({ data, onChange }) => {
  const interpretation = getIBIInterpretation(data.ibiScore);

  return (
    <Stack tokens={{ childrenGap: 14 }}>
      <Label style={{ fontSize: 16, fontWeight: 600 }}>IBI Score</Label>

      <Stack horizontal tokens={{ childrenGap: 24 }} wrap>
        <Stack.Item style={{ minWidth: 180 }}>
          <TextField
            label="IBI Score"
            type="number"
            value={data.ibiScore !== '' ? String(data.ibiScore) : ''}
            onChange={(_, v) => onChange('ibiScore', v !== '' ? Number(v) : '')}
            placeholder="Enter score"
            description="Fish-based: 12–60 | Wetland: 1–18 | B-IBI: 0–100"
          />
        </Stack.Item>

        {interpretation && (
          <Stack.Item grow={1} style={{ minWidth: 280 }}>
            <MessageBar messageBarType={interpretation.type} isMultiline>
              {interpretation.text}
            </MessageBar>
          </Stack.Item>
        )}
      </Stack>

      <Stack style={{ background: '#f3f2f1', padding: 12, borderRadius: 4 }} tokens={{ childrenGap: 6 }}>
        <Text style={{ fontWeight: 600 }}>IBI Score Reference:</Text>
        <Text variant="small">• Fish-based IBI: 12 (very poor) to 60 (excellent) — 12 metrics scored 1, 3, or 5 against reference conditions</Text>
        <Text variant="small">• Wetland IBI (macroinvertebrates): 1–15 or 1–18 depending on version — higher = healthier wetlands</Text>
        <Text variant="small">• Benthic IBI (B-IBI): 0–100 depending on taxonomic resolution and formula</Text>
        <Text variant="small">• High IBI → More diverse, sensitive species, low human disturbance</Text>
        <Text variant="small">• Low IBI → Fewer species, pollution-tolerant dominance, higher disturbance</Text>
      </Stack>

      <Stack tokens={{ childrenGap: 8 }}>
        <Label style={{ fontSize: 16, fontWeight: 600 }}>Additional Comments</Label>
        <TextField
          value={data.additionalComments}
          onChange={(_, v) => onChange('additionalComments', v || '')}
          multiline
          rows={4}
          placeholder="Any additional observations, site conditions, or notes..."
        />
      </Stack>
    </Stack>
  );
};

export default IBIScoreSection;
