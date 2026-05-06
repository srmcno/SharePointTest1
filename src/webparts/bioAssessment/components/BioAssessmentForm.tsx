import * as React from 'react';
import {
  Stack, Pivot, PivotItem, PrimaryButton, DefaultButton,
  MessageBar, MessageBarType, Spinner, SpinnerSize,
  Text, Separator, Label
} from '@fluentui/react';
import { IBioAssessmentFormData, defaultFormData, IWaterQuality, IVisualObservations } from './types/IBioAssessmentData';
import { saveAssessment, ensureList } from '../services/SharePointService';
import SiteInfoSection from './sections/SiteInfoSection';
import FishSection from './sections/FishSection';
import MusselSection from './sections/MusselSection';
import PlantWaterBugsSection from './sections/PlantWaterBugsSection';
import SubstratesSection from './sections/SubstratesSection';
import WaterQualitySection from './sections/WaterQualitySection';
import ObservationsSection from './sections/ObservationsSection';
import IBIScoreSection from './sections/IBIScoreSection';
import PhotoSection from './sections/PhotoSection';

export interface IBioAssessmentFormProps {
  siteUrl: string;
  listName: string;
}

type FormStatus = 'idle' | 'saving' | 'success' | 'error' | 'initializing';

const BioAssessmentForm: React.FC<IBioAssessmentFormProps> = ({ siteUrl, listName }) => {
  const [formData, setFormData] = React.useState<IBioAssessmentFormData>({ ...defaultFormData });
  const [status, setStatus] = React.useState<FormStatus>('initializing');
  const [statusMessage, setStatusMessage] = React.useState('');
  const [savedId, setSavedId] = React.useState<number | null>(null);

  React.useEffect(() => {
    ensureList()
      .then(() => setStatus('idle'))
      .catch(err => {
        setStatus('error');
        setStatusMessage(`Could not connect to SharePoint list: ${err.message || err}`);
      });
  }, []);

  const updateField = (field: keyof IBioAssessmentFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateWaterQuality = (field: keyof IWaterQuality, value: any) => {
    setFormData(prev => ({
      ...prev,
      waterQuality: { ...prev.waterQuality, [field]: value }
    }));
  };

  const updateVisualObs = (field: keyof IVisualObservations, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      visualObservations: { ...prev.visualObservations, [field]: value }
    }));
  };

  const validate = (): string | null => {
    if (!formData.siteId.trim()) return 'Site ID is required.';
    if (!formData.collector.trim()) return 'Collector name is required.';
    return null;
  };

  const handleSubmit = async () => {
    const error = validate();
    if (error) {
      setStatus('error');
      setStatusMessage(error);
      return;
    }

    setStatus('saving');
    setStatusMessage('');

    try {
      const id = await saveAssessment(formData);
      setSavedId(id);
      setStatus('success');
      setStatusMessage(`Assessment saved successfully (Item ID: ${id}). You can find it in the "${listName}" list.`);
    } catch (err: any) {
      setStatus('error');
      setStatusMessage(`Failed to save: ${err.message || 'Unknown error'}. Please check your SharePoint permissions.`);
    }
  };

  const handleReset = () => {
    setFormData({ ...defaultFormData });
    setStatus('idle');
    setStatusMessage('');
    setSavedId(null);
  };

  if (status === 'initializing') {
    return (
      <Stack horizontalAlign="center" verticalAlign="center" style={{ minHeight: 200 }} tokens={{ childrenGap: 12 }}>
        <Spinner size={SpinnerSize.large} label="Connecting to SharePoint..." />
      </Stack>
    );
  }

  return (
    <Stack tokens={{ childrenGap: 0 }} style={{ maxWidth: 1100, margin: '0 auto', fontFamily: 'Segoe UI, sans-serif' }}>
      <Stack
        style={{ background: '#0078d4', padding: '16px 24px', borderRadius: '4px 4px 0 0' }}
        horizontal
        verticalAlign="center"
        tokens={{ childrenGap: 12 }}
      >
        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>
          Water Resource Bio Assessment
        </Text>
        <Text style={{ color: '#deecf9', fontSize: 13 }}>
          Site: {formData.siteId || '(not set)'} | Collector: {formData.collector || '(not set)'} | {formData.assessmentDate}
        </Text>
      </Stack>

      <Stack style={{ background: '#fff', border: '1px solid #edebe9', padding: '0 0 16px' }}>
        {status === 'success' && (
          <Stack style={{ padding: '16px 24px 0' }}>
            <MessageBar
              messageBarType={MessageBarType.success}
              isMultiline
              onDismiss={() => setStatus('idle')}
            >
              {statusMessage}
            </MessageBar>
          </Stack>
        )}

        {status === 'error' && (
          <Stack style={{ padding: '16px 24px 0' }}>
            <MessageBar
              messageBarType={MessageBarType.error}
              isMultiline
              onDismiss={() => setStatus('idle')}
            >
              {statusMessage}
            </MessageBar>
          </Stack>
        )}

        <Pivot>
          <PivotItem headerText="Site Info" itemIcon="MapPin">
            <Stack style={{ padding: '20px 24px' }}>
              <SiteInfoSection data={formData} onChange={updateField} />
            </Stack>
          </PivotItem>

          <PivotItem headerText="Fish" itemIcon="Fish">
            <Stack style={{ padding: '20px 24px' }}>
              <FishSection
                observations={formData.fishObservations}
                onChange={(obs) => updateField('fishObservations', obs)}
              />
            </Stack>
          </PivotItem>

          <PivotItem headerText="Mussels" itemIcon="CircleRing">
            <Stack style={{ padding: '20px 24px' }}>
              <MusselSection
                musselsPresent={formData.musselsPresent}
                observations={formData.musselObservations}
                onPresentChange={(v) => updateField('musselsPresent', v)}
                onChange={(obs) => updateField('musselObservations', obs)}
              />
            </Stack>
          </PivotItem>

          <PivotItem headerText="Plants & Bugs" itemIcon="Plant">
            <Stack style={{ padding: '20px 24px' }}>
              <PlantWaterBugsSection data={formData} onChange={updateField} />
            </Stack>
          </PivotItem>

          <PivotItem headerText="Substrates" itemIcon="Location">
            <Stack style={{ padding: '20px 24px' }}>
              <SubstratesSection data={formData} onChange={updateField} />
            </Stack>
          </PivotItem>

          <PivotItem headerText="Water Quality" itemIcon="Drop">
            <Stack style={{ padding: '20px 24px' }}>
              <WaterQualitySection
                waterQuality={formData.waterQuality}
                onChange={updateWaterQuality}
              />
            </Stack>
          </PivotItem>

          <PivotItem headerText="Observations & IBI" itemIcon="Warning">
            <Stack style={{ padding: '20px 24px' }} tokens={{ childrenGap: 24 }}>
              <ObservationsSection
                observations={formData.visualObservations}
                onChange={updateVisualObs}
              />
              <Separator />
              <IBIScoreSection data={formData} onChange={updateField} />
            </Stack>
          </PivotItem>

          <PivotItem headerText="Photos" itemIcon="Camera">
            <Stack style={{ padding: '20px 24px' }}>
              <PhotoSection
                photoUrls={formData.photoUrls}
                onChange={(urls) => updateField('photoUrls', urls)}
                siteUrl={siteUrl}
              />
            </Stack>
          </PivotItem>
        </Pivot>

        <Separator />

        <Stack
          horizontal
          horizontalAlign="space-between"
          verticalAlign="center"
          style={{ padding: '12px 24px' }}
          tokens={{ childrenGap: 12 }}
        >
          <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
            <Label style={{ color: '#605e5c' }}>
              {formData.fishObservations.length} fish |{' '}
              {formData.musselsPresent ? formData.musselObservations.length + ' mussels' : 'no mussels'} |{' '}
              {formData.substrates.length} substrate(s) |{' '}
              {formData.photoUrls.length} photo(s)
            </Label>
          </Stack>

          <Stack horizontal tokens={{ childrenGap: 8 }}>
            <DefaultButton
              text="Reset Form"
              onClick={handleReset}
              disabled={status === 'saving'}
            />
            <PrimaryButton
              text={status === 'saving' ? 'Saving...' : 'Save Assessment'}
              onClick={handleSubmit}
              disabled={status === 'saving'}
              iconProps={status === 'saving' ? undefined : { iconName: 'Save' }}
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BioAssessmentForm;
