// Manifest of expertise records. Add a topic by dropping a JSON file into
// records/ and adding one import + entry here. Records are validated at
// build time by src/lib/expertise.ts; invalid records fail the build.

import aerodynamicDesign from './records/aerodynamic-design.json';
import cadPlm from './records/cad-plm.json';
import designOptimization from './records/design-optimization.json';
import systemsEngineering from './records/systems-engineering.json';
import advancedAirMobility from './records/advanced-air-mobility.json';
import aircraftDesign from './records/aircraft-design.json';
import aerospacePropulsion from './records/aerospace-propulsion.json';
import structuresMechanisms from './records/structures-mechanisms.json';
import postQuantumCryptography from './records/post-quantum-cryptography.json';

// Order matters: this is the display order on /expertise (and the footer shows
// the first few non-hidden ones). Footer-featured topics are listed first.
export const rawExpertiseRecords: { file: string; raw: unknown }[] = [
  { file: 'cad-plm.json', raw: cadPlm },
  { file: 'design-optimization.json', raw: designOptimization },
  { file: 'systems-engineering.json', raw: systemsEngineering },
  { file: 'advanced-air-mobility.json', raw: advancedAirMobility },
  { file: 'aerodynamic-design.json', raw: aerodynamicDesign },
  { file: 'aircraft-design.json', raw: aircraftDesign },
  { file: 'aerospace-propulsion.json', raw: aerospacePropulsion },
  { file: 'structures-mechanisms.json', raw: structuresMechanisms },
  { file: 'post-quantum-cryptography.json', raw: postQuantumCryptography },
];
