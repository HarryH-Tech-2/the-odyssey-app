// Generate one painterly scene image per location via Replicate (flux-schnell).
// Usage:  REPLICATE_API_TOKEN=... node scripts/generate-images.mjs
//
// Re-runs are safe: existing files are skipped unless --force is passed.

import { writeFile, mkdir, access } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "..", "assets", "locations");
const FORCE = process.argv.includes("--force");

const TOKEN = process.env.REPLICATE_API_TOKEN;
if (!TOKEN) {
  console.error("Missing REPLICATE_API_TOKEN");
  process.exit(1);
}

// One unified visual style across all images so the journey feels cohesive.
const STYLE =
  "moody classical oil painting, mythological scene from Homer's Odyssey, " +
  "dramatic chiaroscuro lighting, painterly brushwork, weathered fresco palette of " +
  "terracotta, deep ocean blue, bronze and aged gold, cinematic composition, " +
  "no text, no letters, no signature";

const SCENES = [
  {
    id: "troy",
    prompt:
      "the smoldering ruins of Troy at dusk seen from the shore, the broken wooden horse half-collapsed on the sand, " +
      "twelve dark Greek galleys riding low at the waterline, distant smoke still rising from the city walls",
  },
  {
    id: "ismaros",
    prompt:
      "a rugged Greek coastline of olive groves at midday, columns of smoke rising from inland villages of the Cicones, " +
      "a black-hulled bronze-age ship drawn up on a quiet beach, hungry sailors gathered on the shore",
  },
  {
    id: "lotus",
    prompt:
      "a low green flowering island, soft afternoon haze, several barefoot sailors lying smiling in tall grass, " +
      "honey-colored fruit scattered around them, a forgotten ship dimly visible at the lagoon edge",
  },
  {
    id: "cyclops",
    prompt:
      "a vast dark cave mouth in a rocky island hillside, the looming silhouette of a one-eyed giant returning down the slope " +
      "with a flock of sheep, firelight glowing deep within the cave, evening sky bruised purple",
  },
  {
    id: "aeolus",
    prompt:
      "a floating bronze-walled island drifting on a stormy sea, a king of winds in robes handing a leather bag to a sailor, " +
      "swirling clouds and currents of wind made visible, ornate bronze ramparts",
  },
  {
    id: "laestrygonians",
    prompt:
      "a narrow fjord harbor with towering black cliffs, enormous giant figures hurling boulders down at small wooden ships, " +
      "ships splintering on the rocks, churning bloody water, panicked rowers",
  },
  {
    id: "circe",
    prompt:
      "the entrance of a low hall of polished stone, a wolf and a lion lying tame at the door, " +
      "a sorceress in saffron robes at a great loom inside, soft hearth light, swine huddled in the courtyard",
  },
  {
    id: "underworld",
    prompt:
      "a dark grove of black poplars beside a hissing black river, pale translucent shades of the dead drifting like mist, " +
      "a small pit of dark blood at the riverbank, a lone hooded figure with a sword keeping the shades back",
  },
  {
    id: "sirens",
    prompt:
      "a windless silver sea, a low green rocky island with two beautiful winged singers on the rocks, " +
      "a single Greek galley passing close, a man bound to the mast straining against the ropes, oarsmen rowing with eyes shut",
  },
  {
    id: "scylla",
    prompt:
      "a narrow strait between two enormous black sea cliffs, a six-headed serpent monster lunging from one cliff toward a passing ship, " +
      "a vast spiraling whirlpool churning beneath the other cliff, foam and storm spray",
  },
  {
    id: "thrinacia",
    prompt:
      "a golden meadow at dusk on a remote island, a herd of unnaturally luminous sacred cattle grazing, " +
      "a beached weathered Greek ship under heavy storm clouds, hungry sailors gathered around a low fire",
  },
  {
    id: "calypso",
    prompt:
      "a wild green island shore at sunset, a beautiful sea-nymph in flowing robes weeping on the rocks, " +
      "a lone bearded man building a small raft of fresh-cut timbers at the water's edge, distant horizon empty",
  },
  {
    id: "phaeacia",
    prompt:
      "a kindly Greek royal court at feast inside a torch-lit hall, a noble princess with handmaidens at the threshold, " +
      "a weather-beaten stranger seated as honored guest, gifts of bronze and cloth piled on the floor",
  },
  {
    id: "ithaca",
    prompt:
      "a small rocky Greek island at golden dawn, an old loyal hound rising to greet a returning weather-worn king on a quiet beach, " +
      "olive trees on the hillside, a modest stone house above the cove, peaceful and homecoming feeling",
  },
  {
    id: "gameover_forgotten",
    prompt:
      "a lonely sea-cave on a forgotten green island, a fading bearded figure standing at the cave mouth looking out over an empty ocean, " +
      "soft mournful evening light, a sense of memory dissolving, ghostly atmosphere",
  },
  {
    id: "leucothea",
    prompt:
      "a violent ocean storm at midday, a Greek galley with a snapped mast breaking apart in towering waves, " +
      "a luminous sea-goddess in a white veil hovering above the foam offering a strip of cloth to a drowning sailor",
  },
  {
    id: "eumaeus",
    prompt:
      "a humble stone hut at dusk on a wooded Greek hillside, a weathered swineherd at a low fire, " +
      "a disguised bearded beggar in rags accepting a wooden bowl of bread, dogs and pigs in the yard, warm hearth light",
  },
  {
    id: "argos",
    prompt:
      "a stone road outside a great hall at midday, a very old emaciated hound lying on a pile of household refuse lifting his head, " +
      "a bearded beggar in rags pausing on the road, eyes meeting the dog, soft late-summer light, deeply poignant",
  },
  {
    id: "bow_contest",
    prompt:
      "the interior of an ancient Greek megaron hall lit by torches, a great curved war bow at the center, " +
      "twelve iron axe-heads aligned in a row down the hall, a disguised bearded man drawing the bow with calm strength, " +
      "drunken suitors at long tables falling silent",
  },
  {
    id: "suitors",
    prompt:
      "the same torchlit Greek hall now in chaos, an ancient king with a war bow and his son with a sword fighting suitors, " +
      "overturned tables, scattered cups, dramatic shadow and firelight, fierce decisive violence, no gore",
  },
  {
    id: "_title",
    prompt:
      "an epic mythological vista at golden hour, a lone bronze-age Greek galley sailing toward a distant rocky island, " +
      "wine-dark Aegean sea, towering cumulus clouds lit from within, a faint silhouette of a hero at the prow, " +
      "wide cinematic composition suitable as a title screen",
  },
];

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function generate(scene) {
  const outPath = resolve(OUT_DIR, `${scene.id}.png`);
  if (!FORCE && (await fileExists(outPath))) {
    console.log(`[skip]   ${scene.id} (exists)`);
    return;
  }

  const prompt = `${scene.prompt}. ${STYLE}`;
  console.log(`[start]  ${scene.id}`);

  const res = await fetch(
    "https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
        Prefer: "wait=60",
      },
      body: JSON.stringify({
        input: {
          prompt,
          aspect_ratio: "3:2",
          output_format: "png",
          num_outputs: 1,
          num_inference_steps: 4,
          go_fast: true,
          megapixels: "1",
        },
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`${scene.id}: ${res.status} ${await res.text()}`);
  }

  let prediction = await res.json();

  // If the API didn't finish synchronously, poll the prediction URL.
  while (
    prediction.status !== "succeeded" &&
    prediction.status !== "failed" &&
    prediction.status !== "canceled"
  ) {
    await new Promise((r) => setTimeout(r, 1500));
    const poll = await fetch(prediction.urls.get, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (!poll.ok) throw new Error(`${scene.id} poll: ${poll.status}`);
    prediction = await poll.json();
  }

  if (prediction.status !== "succeeded") {
    throw new Error(
      `${scene.id} failed: ${prediction.status} ${JSON.stringify(prediction.error)}`
    );
  }

  const url = Array.isArray(prediction.output)
    ? prediction.output[0]
    : prediction.output;
  if (!url) throw new Error(`${scene.id}: no output url`);

  const img = await fetch(url);
  if (!img.ok) throw new Error(`${scene.id} download: ${img.status}`);
  const buf = Buffer.from(await img.arrayBuffer());
  await writeFile(outPath, buf);
  console.log(`[done]   ${scene.id} -> ${outPath} (${(buf.length / 1024).toFixed(0)} KB)`);
}

await mkdir(OUT_DIR, { recursive: true });

// Run in parallel — flux-schnell is fast and Replicate handles concurrency fine.
const results = await Promise.allSettled(SCENES.map(generate));
const failed = results.filter((r) => r.status === "rejected");
if (failed.length) {
  for (const f of failed) console.error(f.reason);
  process.exit(1);
}
console.log("All images generated.");
