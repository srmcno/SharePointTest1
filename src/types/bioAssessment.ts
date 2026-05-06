export interface FishObservation {
  id: string;
  species: string;
  count: number;
  growthStage: string;
  measurement: number;
  anomalies: string;
  deadOrAlive: string;
  verifiedBy: string;
}

export interface MusselObservation {
  id: string;
  species: string;
  count: number;
  growthStage: string;
}

export interface WaterQuality {
  temperature: number | string;
  conductivity: number | string;
  ph: number | string;
  turbidity: number | string;
  dissolvedOxygen: number | string;
  chlorophyllA: number | string;
  algaeDensity: string;
  flow: number | string;
}

export interface VisualObservations {
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

export interface BioAssessmentFormData {
  siteId: string;
  collector: string;
  assessmentDate: string;
  fishObservations: FishObservation[];
  musselsPresent: boolean;
  musselObservations: MusselObservation[];
  plantIdMethod: string;
  plantNotes: string;
  waterBugsIdMethod: string;
  waterBugsNotes: string;
  substrates: string[];
  canopyCoverage: number | string;
  waterQuality: WaterQuality;
  visualObservations: VisualObservations;
  ibiScore: number | string;
  additionalComments: string;
  photoUrls: string[];
}
