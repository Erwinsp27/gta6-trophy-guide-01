// Neon Vice — GTA VI trophy guide and tracker: hand-in script.
//
// Copies the app/ and screenshots/ folders from this repository into the
// hand-in directory, then writes the dossier.json for the entry there.
//
// The repository is located from this file's own path, so the script works
// no matter which directory it is started from.

import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoDir = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });

cpSync(join(repoDir, 'app'), join(outputDir, 'app'), { recursive: true });
cpSync(join(repoDir, 'screenshots'), join(outputDir, 'screenshots'), { recursive: true });

const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 50331648,
  app_path_max_bytes: 1000,
});

const dossierPath = join(outputDir, 'dossier.json');
writeFileSync(dossierPath, dossier);

console.log(`Wrote dossier to ${dossierPath}`);
console.log(`Handed in app/ and screenshots/ from ${repoDir} to ${outputDir} and wrote dossier.json`);
