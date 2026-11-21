import { cpSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const repoDir = process.cwd();

mkdirSync(outDir, { recursive: true });
cpSync(join(repoDir, "app"), join(outDir, "app"), { recursive: true });
cpSync(join(repoDir, "screenshots"), join(outDir, "screenshots"), { recursive: true });

const dossier = buildDossier(outDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 50331648,
  app_path_max_bytes: 1000,
});
writeFileSync(join(outDir, "dossier.json"), dossier);
console.log(`Neon Vice dossier written to ${join(outDir, "dossier.json")}`);
console.log("App copied to app/, screenshots copied to screenshots/, dossier.json written.");
