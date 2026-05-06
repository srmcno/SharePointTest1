export interface IFishObservation {
  id: string;
  species: string;
  count: number;
  growthStage: string;
  measurement: number;
  anomalies: string;
  deadOrAlive: string;
  verifiedBy: string;
}

export interface IMusselObservation {
  id: string;
  species: string;
  count: number;
  growthStage: string;
}

export interface IWaterQuality {
  temperature: number | string;
  conductivity: number | string;
  ph: number | string;
  turbidity: number | string;
  dissolvedOxygen: number | string;
  chlorophyllA: number | string;
  algaeDensity: string;
  flow: number | string;
}

export interface IVisualObservations {
  clean: boolean;
  flowAlteration: boolean;
  oilyFilm: boolean;
  floatingDetritus: boolean;
  fishKill: boolean;
  foamScum: boolean;
  ironPrecipitates: boolean;
  deadAnimals: boolean;
  significantAlgae: boolean;
  habitatAlteration: boolean;
  trash: boolean;
  offensiveOdor: boolean;
}

export interface IBioAssessmentFormData {
  siteId: string;
  collector: string;
  assessmentDate: string;
  fishObservations: IFishObservation[];
  musselsPresent: boolean;
  musselObservations: IMusselObservation[];
  plantIdMethod: string;
  plantNotes: string;
  waterBugsIdMethod: string;
  waterBugsNotes: string;
  substrates: string[];
  canopyCoverage: number | string;
  waterQuality: IWaterQuality;
  visualObservations: IVisualObservations;
  ibiScore: number | string;
  additionalComments: string;
  photoUrls: string[];
}

export const defaultFormData: IBioAssessmentFormData = {
  siteId: '',
  collector: '',
  assessmentDate: new Date().toISOString().split('T')[0],
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
    flow: ''
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
    offensiveOdor: false
  },
  ibiScore: '',
  additionalComments: '',
  photoUrls: []
};
