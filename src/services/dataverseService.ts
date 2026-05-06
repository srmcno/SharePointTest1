import { BioAssessmentFormData } from '../types/bioAssessment';

declare global {
  interface Window {
    GetGlobalContext?: () => any;
  }
}

export const DataverseService = {
  async saveAssessment(data: BioAssessmentFormData): Promise<string> {
    const context = window.GetGlobalContext?.();
    if (!context) {
      throw new Error('Dataverse context not available');
    }

    const webApi = context.getClientUrl() + '/api/data/v9.2/bio_assessments';

    const record = {
      bio_siteid: data.siteId,
      bio_collector: data.collector,
      bio_assessmentdate: new Date(data.assessmentDate).toISOString(),
      bio_fishobservations: JSON.stringify(data.fishObservations),
      bio_musselspresent: data.musselsPresent,
      bio_musselobservations: JSON.stringify(data.musselObservations),
      bio_plantidmethod: data.plantIdMethod,
      bio_plantnotes: data.plantNotes,
      bio_waterbugsidmethod: data.waterBugsIdMethod,
      bio_waterbugsnotes: data.waterBugsNotes,
      bio_substrates: JSON.stringify(data.substrates),
      bio_canopycoverage: data.canopyCoverage ? Number(data.canopyCoverage) : null,
      bio_watertemperature: data.waterQuality.temperature ? Number(data.waterQuality.temperature) : null,
      bio_conductivity: data.waterQuality.conductivity ? Number(data.waterQuality.conductivity) : null,
      bio_ph: data.waterQuality.ph ? Number(data.waterQuality.ph) : null,
      bio_turbidity: data.waterQuality.turbidity ? Number(data.waterQuality.turbidity) : null,
      bio_dissolvedoxygen: data.waterQuality.dissolvedOxygen ? Number(data.waterQuality.dissolvedOxygen) : null,
      bio_chlorophylla: data.waterQuality.chlorophyllA ? Number(data.waterQuality.chlorophyllA) : null,
      bio_algaedensity: data.waterQuality.algaeDensity,
      bio_flow: data.waterQuality.flow ? Number(data.waterQuality.flow) : null,
      bio_visualobservations: JSON.stringify(data.visualObservations),
      bio_ibiscore: data.ibiScore ? Number(data.ibiScore) : null,
      bio_comments: data.additionalComments,
      bio_photourls: JSON.stringify(data.photoUrls)
    };

    const response = await fetch(webApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0'
      },
      body: JSON.stringify(record)
    });

    if (!response.ok) {
      throw new Error(`Failed to save assessment: ${response.statusText}`);
    }

    const result = await response.json();
    return result.bio_assessmentid;
  },

  async getAssessments(): Promise<any[]> {
    const context = window.GetGlobalContext?.();
    if (!context) {
      throw new Error('Dataverse context not available');
    }

    const webApi = context.getClientUrl() + '/api/data/v9.2/bio_assessments?$select=bio_assessmentid,bio_siteid,bio_collector,bio_assessmentdate,bio_ibiscore&$orderby=createdon desc';

    const response = await fetch(webApi, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'OData-MaxVersion': '4.0',
        'OData-Version': '4.0'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch assessments: ${response.statusText}`);
    }

    const result = await response.json();
    return result.value;
  }
};
