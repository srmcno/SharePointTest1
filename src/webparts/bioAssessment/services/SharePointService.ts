import { spfi, SPFx, SPFI } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import '@pnp/sp/fields';
import '@pnp/sp/site-users/web';
import { IBioAssessmentFormData } from '../components/types/IBioAssessmentData';

let _sp: SPFI;

export function initSP(context: any): void {
  _sp = spfi().using(SPFx(context));
}

export function getSP(): SPFI {
  return _sp;
}

export const LIST_NAME = 'BioAssessments';

export async function ensureList(): Promise<void> {
  try {
    const lists = await _sp.web.lists.filter(`Title eq '${LIST_NAME}'`)();
    if (lists.length === 0) {
      await _sp.web.lists.add(LIST_NAME, 'Bio Assessment records', 100, false, {
        EnableVersioning: true
      });
      await addListColumns();
    }
  } catch (err) {
    console.error('Error ensuring list:', err);
    throw err;
  }
}

async function addListColumns(): Promise<void> {
  const list = _sp.web.lists.getByTitle(LIST_NAME);

  const columnsToAdd = [
    { InternalName: 'Collector', Title: 'Collector', FieldType: 'Text' },
    { InternalName: 'AssessmentDate', Title: 'Assessment Date', FieldType: 'DateTime' },
    { InternalName: 'FishObservations', Title: 'Fish Observations', FieldType: 'Note' },
    { InternalName: 'MusselsPresent', Title: 'Mussels Present', FieldType: 'Boolean' },
    { InternalName: 'MusselObservations', Title: 'Mussel Observations', FieldType: 'Note' },
    { InternalName: 'PlantIdMethod', Title: 'Plant ID Method', FieldType: 'Text' },
    { InternalName: 'PlantNotes', Title: 'Plant Notes', FieldType: 'Note' },
    { InternalName: 'WaterBugsIdMethod', Title: 'Water Bugs ID Method', FieldType: 'Text' },
    { InternalName: 'WaterBugsNotes', Title: 'Water Bugs Notes', FieldType: 'Note' },
    { InternalName: 'Substrates', Title: 'Substrates', FieldType: 'Note' },
    { InternalName: 'CanopyCoverage', Title: 'Canopy Coverage Pct', FieldType: 'Number' },
    { InternalName: 'WaterTemperature', Title: 'Water Temperature', FieldType: 'Number' },
    { InternalName: 'Conductivity', Title: 'Conductivity', FieldType: 'Number' },
    { InternalName: 'PH', Title: 'pH', FieldType: 'Number' },
    { InternalName: 'Turbidity', Title: 'Turbidity', FieldType: 'Number' },
    { InternalName: 'DissolvedOxygen', Title: 'Dissolved Oxygen', FieldType: 'Number' },
    { InternalName: 'ChlorophyllA', Title: 'Chlorophyll A', FieldType: 'Number' },
    { InternalName: 'AlgaeDensity', Title: 'Algae Blue-Green Density', FieldType: 'Text' },
    { InternalName: 'Flow', Title: 'Flow', FieldType: 'Number' },
    { InternalName: 'VisualObservations', Title: 'Visual Observations', FieldType: 'Note' },
    { InternalName: 'IBIScore', Title: 'IBI Score', FieldType: 'Number' },
    { InternalName: 'AdditionalComments', Title: 'Additional Comments', FieldType: 'Note' },
    { InternalName: 'PhotoUrls', Title: 'Photo URLs', FieldType: 'Note' }
  ];

  for (const col of columnsToAdd) {
    try {
      let xml = '';
      if (col.FieldType === 'Text') {
        xml = `<Field Type="Text" DisplayName="${col.Title}" Name="${col.InternalName}" />`;
      } else if (col.FieldType === 'Note') {
        xml = `<Field Type="Note" DisplayName="${col.Title}" Name="${col.InternalName}" NumLines="6" RichText="FALSE" />`;
      } else if (col.FieldType === 'Number') {
        xml = `<Field Type="Number" DisplayName="${col.Title}" Name="${col.InternalName}" />`;
      } else if (col.FieldType === 'Boolean') {
        xml = `<Field Type="Boolean" DisplayName="${col.Title}" Name="${col.InternalName}"><Default>0</Default></Field>`;
      } else if (col.FieldType === 'DateTime') {
        xml = `<Field Type="DateTime" DisplayName="${col.Title}" Name="${col.InternalName}" Format="DateOnly" />`;
      }
      await list.fields.createFieldAsXml(xml);
    } catch (e) {
      // Column may already exist
      console.warn(`Column ${col.InternalName} may already exist:`, e);
    }
  }
}

export async function saveAssessment(data: IBioAssessmentFormData): Promise<number> {
  const item = {
    Title: data.siteId,
    Collector: data.collector,
    AssessmentDate: data.assessmentDate,
    FishObservations: JSON.stringify(data.fishObservations),
    MusselsPresent: data.musselsPresent,
    MusselObservations: JSON.stringify(data.musselObservations),
    PlantIdMethod: data.plantIdMethod,
    PlantNotes: data.plantNotes,
    WaterBugsIdMethod: data.waterBugsIdMethod,
    WaterBugsNotes: data.waterBugsNotes,
    Substrates: JSON.stringify(data.substrates),
    CanopyCoverage: data.canopyCoverage !== '' ? Number(data.canopyCoverage) : null,
    WaterTemperature: data.waterQuality.temperature !== '' ? Number(data.waterQuality.temperature) : null,
    Conductivity: data.waterQuality.conductivity !== '' ? Number(data.waterQuality.conductivity) : null,
    PH: data.waterQuality.ph !== '' ? Number(data.waterQuality.ph) : null,
    Turbidity: data.waterQuality.turbidity !== '' ? Number(data.waterQuality.turbidity) : null,
    DissolvedOxygen: data.waterQuality.dissolvedOxygen !== '' ? Number(data.waterQuality.dissolvedOxygen) : null,
    ChlorophyllA: data.waterQuality.chlorophyllA !== '' ? Number(data.waterQuality.chlorophyllA) : null,
    AlgaeDensity: data.waterQuality.algaeDensity,
    Flow: data.waterQuality.flow !== '' ? Number(data.waterQuality.flow) : null,
    VisualObservations: JSON.stringify(data.visualObservations),
    IBIScore: data.ibiScore !== '' ? Number(data.ibiScore) : null,
    AdditionalComments: data.additionalComments,
    PhotoUrls: JSON.stringify(data.photoUrls)
  };

  const result = await _sp.web.lists.getByTitle(LIST_NAME).items.add(item);
  return result.data.Id;
}

export async function getAssessments(): Promise<any[]> {
  return await _sp.web.lists.getByTitle(LIST_NAME).items
    .select('Id', 'Title', 'Collector', 'AssessmentDate', 'IBIScore', 'Created')
    .orderBy('Created', false)
    .top(50)();
}
