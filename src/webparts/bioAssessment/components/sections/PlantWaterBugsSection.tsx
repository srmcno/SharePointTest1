import * as React from 'react';
import { Stack, Label, Dropdown, IDropdownOption, TextField } from '@fluentui/react';
import { IBioAssessmentFormData } from '../types/IBioAssessmentData';
import { PLANT_ID_METHOD_OPTIONS, WATER_BUGS_ID_METHOD_OPTIONS } from '../constants/formConstants';

interface IPlantWaterBugsSectionProps {
  data: IBioAssessmentFormData;
  onChange: (field: keyof IBioAssessmentFormData, value: any) => void;
}

const PlantWaterBugsSection: React.FC<IPlantWaterBugsSectionProps> = ({ data, onChange }) => {
  return (
    <Stack tokens={{ childrenGap: 20 }}>
      <Stack tokens={{ childrenGap: 10 }}>
        <Label style={{ fontSize: 16, fontWeight: 600 }}>Plant Identification</Label>
        <Stack horizontal tokens={{ childrenGap: 16 }} wrap>
          <Stack.Item style={{ minWidth: 200 }}>
            <Dropdown
              label="Plant ID Method"
              selectedKey={data.plantIdMethod}
              options={PLANT_ID_METHOD_OPTIONS}
              onChange={(_, option?: IDropdownOption) => onChange('plantIdMethod', option?.key || '')}
              placeholder="Select method"
            />
          </Stack.Item>
          <Stack.Item grow={1} style={{ minWidth: 280 }}>
            <TextField
              label="Plant Notes / Species Observed"
              value={data.plantNotes}
              onChange={(_, v) => onChange('plantNotes', v || '')}
              placeholder="List species or describe plant community"
              multiline
              rows={3}
            />
          </Stack.Item>
        </Stack>
      </Stack>

      <Stack tokens={{ childrenGap: 10 }}>
        <Label style={{ fontSize: 16, fontWeight: 600 }}>Water Bugs (Macroinvertebrates)</Label>
        <Stack horizontal tokens={{ childrenGap: 16 }} wrap>
          <Stack.Item style={{ minWidth: 200 }}>
            <Dropdown
              label="Water Bugs ID Method"
              selectedKey={data.waterBugsIdMethod}
              options={WATER_BUGS_ID_METHOD_OPTIONS}
              onChange={(_, option?: IDropdownOption) => onChange('waterBugsIdMethod', option?.key || '')}
              placeholder="Select method"
            />
          </Stack.Item>
          <Stack.Item grow={1} style={{ minWidth: 280 }}>
            <TextField
              label="Water Bugs Notes / Taxa Observed"
              value={data.waterBugsNotes}
              onChange={(_, v) => onChange('waterBugsNotes', v || '')}
              placeholder="List taxa or describe invertebrate community"
              multiline
              rows={3}
            />
          </Stack.Item>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PlantWaterBugsSection;
