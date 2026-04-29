// Resize location PNGs into small JPG thumbnails for the Figures list.
// Originals (~1.5MB each) are kept for the in-game scene image; thumbnails
// (~25KB each) are what the Figures tab paints into 140px-tall cards.
//
// Shells out to sharp-cli (already a transitive dep). No need to install
// sharp directly.
//
// Usage:  node scripts/generate-thumbnails.mjs
//         node scripts/generate-thumbnails.mjs --force   # rebuild existing

import { mkdir, readdir, access, stat } from "node:fs/promises";
import { dirname, resolve, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = resolve(__dirname, "..", "assets", "locations");
const OUT_DIR = resolve(__dirname, "..", "assets", "figures");
const FORCE = process.argv.includes("--force");

// Width chosen for ~2x density on a 360-380dp phone card. JPG @ q80 is fine
// for photographic content and an order of magnitude smaller than PNG.
const WIDTH = 480;
const QUALITY = 80;

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

function runSharp(input, outDir) {
  return new Promise((resolveP, rejectP) => {
    const args = [
      "--no-install",
      "sharp-cli",
      "-i", input,
      "-o", outDir + "/",
      "-f", "jpeg",
      "-q", String(QUALITY),
      "resize", String(WIDTH),
    ];
    // npx is a .cmd on Windows — must use shell:true so the cmd shim resolves.
    const child = spawn("npx", args, { shell: true, stdio: "ignore" });
    child.on("error", rejectP);
    child.on("exit", (code) => {
      if (code === 0) resolveP();
      else rejectP(new Error(`sharp-cli exited with code ${code} for ${input}`));
    });
  });
}

await mkdir(OUT_DIR, { recursive: true });

const entries = await readdir(SRC_DIR);
const pngs = entries.filter(
  (f) => extname(f).toLowerCase() === ".png" && !f.startsWith("_")
);

let built = 0;
let skipped = 0;
for (const file of pngs) {
  const id = basename(file, ".png");
  const inPath = resolve(SRC_DIR, file);
  const outPath = resolve(OUT_DIR, `${id}.jpg`);

  if (!FORCE && (await fileExists(outPath))) {
    skipped++;
    continue;
  }

  await runSharp(inPath, OUT_DIR);

  const { size } = await stat(outPath);
  console.log(`[done] ${id}.jpg  (${(size / 1024).toFixed(0)} KB)`);
  built++;
}

console.log(`\n${built} built, ${skipped} skipped.`);
