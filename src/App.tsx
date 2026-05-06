import React, { useState } from 'react'
import {
  Stack,
  Pivot,
  PivotItem,
  TextField,
  Dropdown,
  Checkbox,
  Toggle,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  DefaultButton,
  Spinner,
  SpinnerSize,
  IconButton,
  Label,
} from '@fluentui/react'
import { BioAssessmentFormData, FishObservation, MusselObservation } from './types/bioAssessment'
import {
  FISH_VERIFIED_BY_OPTIONS,
  GROWTH_STAGE_OPTIONS,
  MUSSEL_SPECIES_OPTIONS,
  SUBSTRATE_OPTIONS,
  ID_METHOD_OPTIONS,
} from './services/formConstants'
import { DataverseService } from './services/dataverseService'
import './index.css'

type StatusType = 'success' | 'error' | null

const App: React.FC = () => {
  const [formData, setFormData] = useState<BioAssessmentFormData>({
    siteId: '',
    collector: '',
    assessmentDate: '',
    fishObservations: [],
    musselsPresent: false,
    musselObservations: [],
    plantIdMethod: '',
    plantNotes: '',
    waterBugsIdMethod: '',
    waterBugsNotes: '',
    substrates: [],
    canopyCoverage: '',
    waterQuality: {
      temperature: '',
      conductivity: '',
      ph: '',
      turbidity: '',
      dissolvedOxygen: '',
      chlorophyllA: '',
      algaeDensity: '',
      flow: '',
    },
    visualObservations: {
      clean: false,
      flowAlteration: false,
      oilyFilm: false,
      floatingDetritus: false,
      fishKill: false,
      foamScum: false,
      ironPrecipitates: false,
      deadAnimals: false,
      significantAlgae: false,
      habitatAlteration: false,
      trash: false,
      offensiveOdor: false,
    },
    ibiScore: '',
    additionalComments: '',
    photoUrls: [],
  })

  const [saving, setSaving] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [statusType, setStatusType] = useState<StatusType>(null)

  const handleFieldChange = (field: keyof BioAssessmentFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleWaterQualityChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      waterQuality: {
        ...prev.waterQuality,
        [field]: value,
      },
    }))
  }

  const handleVisualObservationChange = (field: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      visualObservations: {
        ...prev.visualObservations,
        [field]: value,
      },
    }))
  }

  const addFish = () => {
    const newFish: FishObservation = {
      id: `fish-${Date.now()}`,
      species: '',
      count: 0,
      growthStage: '',
      measurement: 0,
      anomalies: '',
      deadOrAlive: '',
      verifiedBy: '',
    }
    setFormData(prev => ({
      ...prev,
      fishObservations: [...prev.fishObservations, newFish],
    }))
  }

  const removeFish = (id: string) => {
    setFormData(prev => ({
      ...prev,
      fishObservations: prev.fishObservations.filter(f => f.id !== id),
    }))
  }

  const updateFish = (id: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      fishObservations: prev.fishObservations.map(f =>
        f.id === id ? { ...f, [field]: value } : f
      ),
    }))
  }

  const addMussel = () => {
    const newMussel: MusselObservation = {
      id: `mussel-${Date.now()}`,
      species: '',
      count: 0,
      growthStage: '',
    }
    setFormData(prev => ({
      ...prev,
      musselObservations: [...prev.musselObservations, newMussel],
    }))
  }

  const removeMussel = (id: string) => {
    setFormData(prev => ({
      ...prev,
      musselObservations: prev.musselObservations.filter(m => m.id !== id),
    }))
  }

  const updateMussel = (id: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      musselObservations: prev.musselObservations.map(m =>
        m.id === id ? { ...m, [field]: value } : m
      ),
    }))
  }

  const toggleSubstrate = (substrate: string) => {
    setFormData(prev => ({
      ...prev,
      substrates: prev.substrates.includes(substrate)
        ? prev.substrates.filter(s => s !== substrate)
        : [...prev.substrates, substrate],
    }))
  }

  const handleSubmit = async () => {
    if (!formData.siteId.trim()) {
      setStatusMessage('Site ID is required')
      setStatusType('error')
      return
    }

    if (!formData.collector.trim()) {
      setStatusMessage('Collector name is required')
      setStatusType('error')
      return
    }

    setSaving(true)
    setStatusMessage('')
    setStatusType(null)

    try {
      const recordId = await DataverseService.saveAssessment(formData)
      setStatusMessage(`Assessment saved successfully. Record ID: ${recordId}`)
      setStatusType('success')
      handleReset()
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to save assessment'
      setStatusMessage(errorMsg)
      setStatusType('error')
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    setFormData({
      siteId: '',
      collector: '',
      assessmentDate: '',
      fishObservations: [],
      musselsPresent: false,
      musselObservations: [],
      plantIdMethod: '',
      plantNotes: '',
      waterBugsIdMethod: '',
      waterBugsNotes: '',
      substrates: [],
      canopyCoverage: '',
      waterQuality: {
        temperature: '',
        conductivity: '',
        ph: '',
        turbidity: '',
        dissolvedOxygen: '',
        chlorophyllA: '',
        algaeDensity: '',
        flow: '',
      },
      visualObservations: {
        clean: false,
        flowAlteration: false,
        oilyFilm: false,
        floatingDetritus: false,
        fishKill: false,
        foamScum: false,
        ironPrecipitates: false,
        deadAnimals: false,
        significantAlgae: false,
        habitatAlteration: false,
        trash: false,
        offensiveOdor: false,
      },
      ibiScore: '',
      additionalComments: '',
      photoUrls: [],
    })
    setStatusMessage('')
    setStatusType(null)
  }

  return (
    <Stack className="app-container" tokens={{ childrenGap: 16, padding: 20 }}>
      <h1>Bio Assessment Form</h1>

      {statusMessage && (
        <MessageBar messageBarType={statusType === 'success' ? MessageBarType.success : MessageBarType.error}>
          {statusMessage}
        </MessageBar>
      )}

      {saving && (
        <Stack horizontalAlign="center" tokens={{ padding: 20 }}>
          <Spinner size={SpinnerSize.medium} label="Saving assessment..." />
        </Stack>
      )}

      <Pivot>
        {/* Site Information */}
        <PivotItem headerText="Site Information">
          <Stack tokens={{ childrenGap: 16, padding: 20 }}>
            <TextField
              label="Site ID *"
              value={formData.siteId}
              onChange={(_, value) => handleFieldChange('siteId', value || '')}
              required
            />
            <TextField
              label="Collector Name *"
              value={formData.collector}
              onChange={(_, value) => handleFieldChange('collector', value || '')}
              required
            />
            <TextField
              label="Assessment Date"
              type="date"
              value={formData.assessmentDate}
              onChange={(_, value) => handleFieldChange('assessmentDate', value || '')}
            />
          </Stack>
        </PivotItem>

        {/* Fish Observations */}
        <PivotItem headerText="Fish Observations">
          <Stack tokens={{ childrenGap: 16, padding: 20 }}>
            <PrimaryButton onClick={addFish} text="Add Fish Observation" />

            {formData.fishObservations.map(fish => (
              <Stack key={fish.id} tokens={{ childrenGap: 12, padding: 12 }} className="observation-group">
                <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="end">
                  <Stack style={{ flex: 1 }} tokens={{ childrenGap: 8 }}>
                    <TextField
                      label="Species"
                      value={fish.species}
                      onChange={(_, value) => updateFish(fish.id, 'species', value || '')}
                    />
                  </Stack>
                  <IconButton
                    iconProps={{ iconName: 'Delete' }}
                    onClick={() => removeFish(fish.id)}
                    title="Remove observation"
                  />
                </Stack>

                <Stack horizontal tokens={{ childrenGap: 12 }}>
                  <TextField
                    label="Count"
                    type="number"
                    value={fish.count.toString()}
                    onChange={(_,value) => updateFish(fish.id, 'count', parseInt(value || '0', 10))}
                    style={{ flex: 1 }}
                  />
                  <Dropdown
                    label="Growth Stage"
                    options={GROWTH_STAGE_OPTIONS}
                    selectedKey={fish.growthStage}
                    onChange={(_,option) => updateFish(fish.id, 'growthStage', option?.key || '')}
                    style={{ flex: 1 }}
                  />
                </Stack>

                <Stack horizontal tokens={{ childrenGap: 12 }}>
                  <TextField
                    label="Measurement (mm)"
                    type="number"
                    value={fish.measurement.toString()}
                    onChange={(_,value) => updateFish(fish.id, 'measurement', parseFloat(value || '0'))}
                    style={{ flex: 1 }}
                  />
                  <Dropdown
                    label="Dead or Alive"
                    options={[
                      { key: 'alive', text: 'Alive' },
                      { key: 'dead', text: 'Dead' },
                    ]}
                    selectedKey={fish.deadOrAlive}
                    onChange={(_,option) => updateFish(fish.id, 'deadOrAlive', option?.key || '')}
                    style={{ flex: 1 }}
                  />
                </Stack>

                <Stack horizontal tokens={{ childrenGap: 12 }}>
                  <TextField
                    label="Anomalies"
                    value={fish.anomalies}
                    onChange={(_,value) => updateFish(fish.id, 'anomalies', value || '')}
                    style={{ flex: 1 }}
                  />
                  <Dropdown
                    label="Verified By"
                    options={FISH_VERIFIED_BY_OPTIONS}
                    selectedKey={fish.verifiedBy}
                    onChange={(_,option) => updateFish(fish.id, 'verifiedBy', option?.key || '')}
                    style={{ flex: 1 }}
                  />
                </Stack>
              </Stack>
            ))}
          </Stack>
        </PivotItem>

        {/* Mussel Observations */}
        <PivotItem headerText="Mussel Observations">
          <Stack tokens={{ childrenGap: 16, padding: 20 }}>
            <Toggle
              label="Mussels Present"
              checked={formData.musselsPresent}
              onChange={(_,checked) => handleFieldChange('musselsPresent', checked || false)}
            />

            {formData.musselsPresent && (
              <>
                <PrimaryButton onClick={addMussel} text="Add Mussel Observation" />

                {formData.musselObservations.map(mussel => (
                  <Stack key={mussel.id} tokens={{ childrenGap: 12, padding: 12 }} className="observation-group">
                    <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="end">
                      <Stack style={{ flex: 1 }} tokens={{ childrenGap: 8 }}>
                        <Dropdown
                          label="Species"
                          options={MUSSEL_SPECIES_OPTIONS}
                          selectedKey={mussel.species}
                          onChange={(_,option) => updateMussel(mussel.id, 'species', option?.key || '')}
                        />
                      </Stack>
                      <IconButton
                        iconProps={{ iconName: 'Delete' }}
                        onClick={() => removeMussel(mussel.id)}
                        title="Remove observation"
                      />
                    </Stack>

                    <Stack horizontal tokens={{ childrenGap: 12 }}>
                      <TextField
                        label="Count"
                        type="number"
                        value={mussel.count.toString()}
                        onChange={(_,value) => updateMussel(mussel.id, 'count', parseInt(value || '0', 10))}
                        style={{ flex: 1 }}
                      />
                      <Dropdown
                        label="Growth Stage"
                        options={GROWTH_STAGE_OPTIONS}
                        selectedKey={mussel.growthStage}
                        onChange={(_,option) => updateMussel(mussel.id, 'growthStage', option?.key || '')}
                        style={{ flex: 1 }}
                      />
                    </Stack>
                  </Stack>
                ))}
              </>
            )}
          </Stack>
        </PivotItem>

        {/* Plant & Water Bugs */}
        <PivotItem headerText="Plant & Water Bugs">
          <Stack tokens={{ childrenGap: 16, padding: 20 }}>
            <Dropdown
              label="Plant ID Method"
              options={ID_METHOD_OPTIONS}
              selectedKey={formData.plantIdMethod}
              onChange={(_,option) => handleFieldChange('plantIdMethod', option?.key || '')}
            />
            <TextField
              label="Plant Notes"
              multiline
              rows={3}
              value={formData.plantNotes}
              onChange={(_,value) => handleFieldChange('plantNotes', value || '')}
            />

            <Dropdown
              label="Water Bugs ID Method"
              options={ID_METHOD_OPTIONS}
              selectedKey={formData.waterBugsIdMethod}
              onChange={(_,option) => handleFieldChange('waterBugsIdMethod', option?.key || '')}
            />
            <TextField
              label="Water Bugs Notes"
              multiline
              rows={3}
              value={formData.waterBugsNotes}
              onChange={(_,value) => handleFieldChange('waterBugsNotes', value || '')}
            />
          </Stack>
        </PivotItem>

        {/* Substrates & Canopy */}
        <PivotItem headerText="Substrates & Canopy">
          <Stack tokens={{ childrenGap: 16, padding: 20 }}>
            <Label>Substrate Types</Label>
            {SUBSTRATE_OPTIONS.map(substrate => (
              <Checkbox
                key={substrate}
                label={substrate}
                checked={formData.substrates.includes(substrate)}
                onChange={() => toggleSubstrate(substrate)}
              />
            ))}

            <TextField
              label="Canopy Coverage (%)"
              type="number"
              value={formData.canopyCoverage.toString()}
              onChange={(_,value) => handleFieldChange('canopyCoverage', value || '')}
            />
          </Stack>
        </PivotItem>

        {/* Water Quality */}
        <PivotItem headerText="Water Quality">
          <Stack tokens={{ childrenGap: 16, padding: 20 }}>
            <TextField
              label="Temperature (°C)"
              type="number"
              value={formData.waterQuality.temperature.toString()}
              onChange={(_,value) => handleWaterQualityChange('temperature', value || '')}
            />
            <TextField
              label="Conductivity (μS/cm)"
              type="number"
              value={formData.waterQuality.conductivity.toString()}
              onChange={(_,value) => handleWaterQualityChange('conductivity', value || '')}
            />
            <TextField
              label="pH"
              type="number"
              step="0.1"
              value={formData.waterQuality.ph.toString()}
              onChange={(_,value) => handleWaterQualityChange('ph', value || '')}
            />
            <TextField
              label="Turbidity (NTU)"
              type="number"
              value={formData.waterQuality.turbidity.toString()}
              onChange={(_,value) => handleWaterQualityChange('turbidity', value || '')}
            />
            <TextField
              label="Dissolved Oxygen (mg/L)"
              type="number"
              step="0.1"
              value={formData.waterQuality.dissolvedOxygen.toString()}
              onChange={(_,value) => handleWaterQualityChange('dissolvedOxygen', value || '')}
            />
            <TextField
              label="Chlorophyll A (μg/L)"
              type="number"
              value={formData.waterQuality.chlorophyllA.toString()}
              onChange={(_,value) => handleWaterQualityChange('chlorophyllA', value || '')}
            />
            <Dropdown
              label="Algae Density"
              options={[
                { key: 'none', text: 'None' },
                { key: 'low', text: 'Low' },
                { key: 'medium', text: 'Medium' },
                { key: 'high', text: 'High' },
              ]}
              selectedKey={formData.waterQuality.algaeDensity}
              onChange={(_,option) => handleWaterQualityChange('algaeDensity', option?.key || '')}
            />
            <TextField
              label="Flow (m/s)"
              type="number"
              step="0.01"
              value={formData.waterQuality.flow.toString()}
              onChange={(_,value) => handleWaterQualityChange('flow', value || '')}
            />
          </Stack>
        </PivotItem>

        {/* Visual Observations */}
        <PivotItem headerText="Visual Observations">
          <Stack tokens={{ childrenGap: 16, padding: 20 }}>
            <Checkbox
              label="Clean"
              checked={formData.visualObservations.clean}
              onChange={(_,checked) => handleVisualObservationChange('clean', checked || false)}
            />
            <Checkbox
              label="Flow Alteration"
              checked={formData.visualObservations.flowAlteration}
              onChange={(_,checked) => handleVisualObservationChange('flowAlteration', checked || false)}
            />
            <Checkbox
              label="Oily Film"
              checked={formData.visualObservations.oilyFilm}
              onChange={(_,checked) => handleVisualObservationChange('oilyFilm', checked || false)}
            />
            <Checkbox
              label="Floating Detritus"
              checked={formData.visualObservations.floatingDetritus}
              onChange={(_,checked) => handleVisualObservationChange('floatingDetritus', checked || false)}
            />
            <Checkbox
              label="Fish Kill"
              checked={formData.visualObservations.fishKill}
              onChange={(_,checked) => handleVisualObservationChange('fishKill', checked || false)}
            />
            <Checkbox
              label="Foam/Scum"
              checked={formData.visualObservations.foamScum}
              onChange={(_,checked) => handleVisualObservationChange('foamScum', checked || false)}
            />
            <Checkbox
              label="Iron Precipitates"
              checked={formData.visualObservations.ironPrecipitates}
              onChange={(_,checked) => handleVisualObservationChange('ironPrecipitates', checked || false)}
            />
            <Checkbox
              label="Dead Animals"
              checked={formData.visualObservations.deadAnimals}
              onChange={(_,checked) => handleVisualObservationChange('deadAnimals', checked || false)}
            />
            <Checkbox
              label="Significant Algae"
              checked={formData.visualObservations.significantAlgae}
              onChange={(_,checked) => handleVisualObservationChange('significantAlgae', checked || false)}
            />
            <Checkbox
              label="Habitat Alteration"
              checked={formData.visualObservations.habitatAlteration}
              onChange={(_,checked) => handleVisualObservationChange('habitatAlteration', checked || false)}
            />
            <Checkbox
              label="Trash"
              checked={formData.visualObservations.trash}
              onChange={(_,checked) => handleVisualObservationChange('trash', checked || false)}
            />
            <Checkbox
              label="Offensive Odor"
              checked={formData.visualObservations.offensiveOdor}
              onChange={(_,checked) => handleVisualObservationChange('offensiveOdor', checked || false)}
            />
          </Stack>
        </PivotItem>

        {/* IBI Score & Comments */}
        <PivotItem headerText="IBI Score & Comments">
          <Stack tokens={{ childrenGap: 16, padding: 20 }}>
            <TextField
              label="IBI Score"
              type="number"
              value={formData.ibiScore.toString()}
              onChange={(_,value) => handleFieldChange('ibiScore', value || '')}
            />
            <TextField
              label="Additional Comments"
              multiline
              rows={4}
              value={formData.additionalComments}
              onChange={(_,value) => handleFieldChange('additionalComments', value || '')}
            />
          </Stack>
        </PivotItem>
      </Pivot>

      {/* Action Buttons */}
      <Stack horizontal tokens={{ childrenGap: 8 }} horizontalAlign="center">
        <PrimaryButton
          text="Save Assessment"
          onClick={handleSubmit}
          disabled={saving}
        />
        <DefaultButton
          text="Reset Form"
          onClick={handleReset}
          disabled={saving}
        />
      </Stack>
    </Stack>
  )
}

export default App
