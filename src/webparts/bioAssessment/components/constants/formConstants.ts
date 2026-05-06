import { IDropdownOption } from '@fluentui/react';

export const FISH_VERIFIED_BY_OPTIONS: IDropdownOption[] = [
  { key: 'ai', text: 'AI' },
  { key: 'inaturalist', text: 'iNaturalist' },
  { key: 'google', text: 'Google' },
  { key: 'fishbrain', text: 'FishBrain' },
  { key: 'fishverify', text: 'FishVerify' },
  { key: 'selfid', text: 'Self ID' },
  { key: 'other', text: 'Other' }
];

export const FISH_GROWTH_STAGE_OPTIONS: IDropdownOption[] = [
  { key: 'fry', text: 'Fry' },
  { key: 'fingerling', text: 'Fingerling' },
  { key: 'juvenile', text: 'Juvenile' },
  { key: 'subadult', text: 'Sub-adult' },
  { key: 'adult', text: 'Adult' },
  { key: 'spawning', text: 'Spawning' }
];

export const FISH_DEAD_OR_ALIVE_OPTIONS: IDropdownOption[] = [
  { key: 'alive', text: 'Alive' },
  { key: 'dead', text: 'Dead' }
];

export const MUSSEL_SPECIES_OPTIONS: IDropdownOption[] = [
  { key: 'bankclimber', text: 'Bankclimber' },
  { key: 'bleufer', text: 'Bleufer' },
  { key: 'butterfly', text: 'Butterfly' },
  { key: 'creeper', text: 'Creeper' },
  { key: 'deertoe', text: 'Deertoe' },
  { key: 'elktoe', text: 'Elk Toe' },
  { key: 'fatmucket', text: 'Fat Mucket' },
  { key: 'fawnsfoot', text: 'Fawnsfoot' },
  { key: 'flatfloater', text: 'Flat Floater' },
  { key: 'flutedshell', text: 'Flutedshell' },
  { key: 'fragilepapershell', text: 'Fragile Papershell' },
  { key: 'giantfloater', text: 'Giant Floater' },
  { key: 'gulfmapleleaf', text: 'Gulf Maple Leaf' },
  { key: 'lillyput', text: 'Lillyput' },
  { key: 'littlespectaclecase', text: 'Little Spectaclecase' },
  { key: 'louisianafatmucket', text: 'Louisiana Fatmucket' },
  { key: 'louisianapigtoe', text: 'Louisiana Pigtoe' },
  { key: 'monkeyface', text: 'Monkeyface' },
  { key: 'mucket', text: 'Mucket' },
  { key: 'neoshomucket', text: 'Neosho Mucket' },
  { key: 'ouachitakidneyshell', text: 'Ouachita Kidneyshell' },
  { key: 'ouachitarockpocketbook', text: 'Ouachita Rock Pocketbook' },
  { key: 'paperpondshell', text: 'Paper Pondshell' },
  { key: 'pimpleback', text: 'Pimpleback' },
  { key: 'pinkpapershell', text: 'Pink Papershell' },
  { key: 'pistolgrip', text: 'Pistolgrip' },
  { key: 'plainpocketbook', text: 'Plain Pocketbook' },
  { key: 'pondmussel', text: 'Pond Mussel' },
  { key: 'pondhorn', text: 'Pondhorn' },
  { key: 'pyramidpigtoe', text: 'Pyramid Pigtoe' },
  { key: 'rabbitsfoot', text: "Rabbitsfoot" },
  { key: 'rockpocketbook', text: 'Rock Pocketbook' },
  { key: 'roundpigtoe', text: 'Round Pigtoe' },
  { key: 'southernhickorynut', text: 'Southern Hickorynut' },
  { key: 'spike', text: 'Spike' },
  { key: 'texaslillyput', text: 'Texas Lillyput' },
  { key: 'threehornwartyback', text: 'Threehorn Wartyback' },
  { key: 'threeridge', text: 'Threeridge' },
  { key: 'wabashpigtoe', text: 'Wabash Pigtoe' },
  { key: 'wartyback', text: 'Wartyback' },
  { key: 'washboard', text: 'Washboard' },
  { key: 'westernfanshell', text: 'Western Fanshell' },
  { key: 'whiteheelsplitter', text: 'White Heelsplitter' },
  { key: 'wingedmapleleaf', text: 'Winged Mapleleaf' },
  { key: 'yellowsandshell', text: 'Yellow Sandshell' },
  { key: 'zebra', text: 'Zebra Mussel' },
  { key: 'other', text: 'Other' }
];

export const MUSSEL_GROWTH_STAGE_OPTIONS: IDropdownOption[] = [
  { key: 'glochidia', text: 'Glochidia' },
  { key: 'hostfish', text: 'Host Fish' },
  { key: 'juvenile', text: 'Juvenile' },
  { key: 'adult', text: 'Adult' }
];

export const PLANT_ID_METHOD_OPTIONS: IDropdownOption[] = [
  { key: 'inaturalist', text: 'iNaturalist' },
  { key: 'google', text: 'Google' },
  { key: 'selfid', text: 'Self ID' },
  { key: 'flora', text: 'Flora Guide' },
  { key: 'ai', text: 'AI' }
];

export const WATER_BUGS_ID_METHOD_OPTIONS: IDropdownOption[] = [
  { key: 'inaturalist', text: 'iNaturalist' },
  { key: 'google', text: 'Google' },
  { key: 'selfid', text: 'Self ID' },
  { key: 'ai', text: 'AI' }
];

export const SUBSTRATE_OPTIONS: string[] = [
  'Bedrock',
  'Boulder',
  'Cobble',
  'Gravel/Pebble',
  'Sand',
  'Clay',
  'Peat',
  'Earth',
  'Artificial'
];

export const ALGAE_DENSITY_OPTIONS: IDropdownOption[] = [
  { key: 'none', text: 'None' },
  { key: 'low', text: 'Low' },
  { key: 'moderate', text: 'Moderate' },
  { key: 'high', text: 'High' },
  { key: 'veryhigh', text: 'Very High / Bloom' }
];

export const IBI_SCORE_INFO = {
  fish: { min: 12, max: 60, label: 'Fish-based IBI (12 = very poor, 60 = excellent)' },
  wetland: { min: 1, max: 18, label: 'Wetland IBI / Macroinvertebrates (1–18)' },
  benthic: { min: 0, max: 100, label: 'Benthic IBI / B-IBI (0–100)' }
};
