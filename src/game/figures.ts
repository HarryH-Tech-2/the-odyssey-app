/**
 * Famous figures from the Odyssey that the player can encounter on the
 * journey. Each figure is tied to one or more `locationIds` — the figure is
 * considered "discovered" once the player has visited any of those locations
 * (i.e. a `scene` log entry exists for that location).
 *
 * Discovery is derived from the existing log, so no new persisted state is
 * needed; this works with saves created before the feature existed.
 */

export type Figure = {
  id: string;
  name: string;
  epithet: string;
  description: string;
  // Locations whose scene entry counts as having met this figure.
  locationIds: string[];
};

export const FIGURES: Figure[] = [
  {
    id: "polyphemus",
    name: "Polyphemus",
    epithet: "The Cyclops, son of Poseidon",
    description:
      "A one-eyed giant who herds sheep in a sea-cave on a wild island. He devours guests rather than honors them. Crossing him earns the wrath of his father, the sea-god — a curse that follows you all the way home.",
    locationIds: ["cyclops"],
  },
  {
    id: "aeolus",
    name: "Aeolus",
    epithet: "Keeper of the Winds",
    description:
      "Lord of a bronze-walled island that drifts on the sea. He hosts you like a son and gives you a leather bag holding every wind but the one that blows you home. A second visit, after your fortunes turn, finds his door shut.",
    locationIds: ["aeolus"],
  },
  {
    id: "antiphates",
    name: "Antiphates",
    epithet: "King of the Laestrygonians",
    description:
      "A giant who rules over giants in a cliff-walled harbor. His people meet visitors with boulders, not bread. Eleven of your twelve ships were crushed in a single afternoon at his shore.",
    locationIds: ["laestrygonians"],
  },
  {
    id: "circe",
    name: "Circe",
    epithet: "Witch of Aeaea",
    description:
      "A goddess of polished stone halls, tame wolves, and a singing loom. She turns careless men into swine. Met as an enemy, she is dangerous; met as a guest, she heals your ship and your crew, and shows you the road to the dead.",
    locationIds: ["circe"],
  },
  {
    id: "tiresias",
    name: "Tiresias",
    epithet: "The Blind Prophet of Thebes",
    description:
      "A shade among shades in the grove of Persephone. Of all the dead, only he keeps his wits. He drinks the offered blood and warns you: do not touch the cattle of Helios, or you return alone, on a stranger's ship.",
    locationIds: ["underworld"],
  },
  {
    id: "sirens",
    name: "The Sirens",
    epithet: "Singers on the Rocks",
    description:
      "Voices on a low green island in a windless sea. Their song is too perfect to bear; men have broken their bones reaching for it. The song knows your name. The bones of older sailors lie bleached at the waterline.",
    locationIds: ["sirens"],
  },
  {
    id: "scylla",
    name: "Scylla",
    epithet: "The Six-Headed Beast",
    description:
      "She lives in a high cave above the strait. Six heads on six long necks reach down and take six men, always — a toll the sea-passage cannot bargain away. Across the water, the whirlpool Charybdis hungers for whole ships.",
    locationIds: ["scylla"],
  },
  {
    id: "helios",
    name: "Helios",
    epithet: "The Sun God",
    description:
      "His golden cattle graze a bright meadow on Thrinacia. He sees everything the sun sees. Slaughter one of his herd and he will complain to Zeus himself — and Zeus answers complaints with thunderbolts.",
    locationIds: ["thrinacia"],
  },
  {
    id: "leucothea",
    name: "Leucothea",
    epithet: "The White Goddess of the Sea",
    description:
      "Once a mortal woman, now a sea-goddess in the form of a seabird. She finds you in the wreck of your last ship and offers a strip of immortal cloth — wear it and the deep cannot keep you.",
    locationIds: ["leucothea"],
  },
  {
    id: "calypso",
    name: "Calypso",
    epithet: "The Nymph of Ogygia",
    description:
      "A goddess on a green island in the middle of nowhere. She loves you, and offers immortality if you will only stay. She weeps when you refuse, and in the end helps you build the raft that will carry you on.",
    locationIds: ["calypso"],
  },
  {
    id: "nausicaa",
    name: "Nausicaa",
    epithet: "Princess of the Phaeacians",
    description:
      "She finds you naked and salt-crusted on her father's beach. She does not laugh. She gives you cloth, food, and a way into the king's hall — and asks for nothing in return but your story.",
    locationIds: ["phaeacia"],
  },
  {
    id: "alcinous",
    name: "Alcinous",
    epithet: "King of the Phaeacians",
    description:
      "A generous king on a fair island. He feasts the stranger before he knows the stranger's name. He is the one who, in the end, lays you sleeping on a ship loaded with gifts and sends you home.",
    locationIds: ["phaeacia"],
  },
  {
    id: "athena",
    name: "Athena",
    epithet: "Grey-Eyed Daughter of Zeus",
    description:
      "She has steered your fortunes since Troy. On the shore of Ithaca she presses age into your face so you can come home unseen, and stands at your shoulder in the hall when the suitors finally reach for swords that aren't there.",
    locationIds: ["eumaeus", "suitors"],
  },
  {
    id: "eumaeus",
    name: "Eumaeus",
    epithet: "The Loyal Swineherd",
    description:
      "A servant who, in twenty years, never stopped believing his king would return. He gives a beggar bread, defends his absent lord to a stranger's face, and takes his place at your shoulder when the doors of the great hall are bolted.",
    locationIds: ["eumaeus", "argos", "suitors"],
  },
  {
    id: "argos",
    name: "Argos",
    epithet: "The Old Hound",
    description:
      "The dog you raised as a pup. Twenty years on a dung-pile by the gate, ears half gone, hide bitten through with ticks. He is the only soul on Ithaca who knows you through the disguise — and he knows you in a single breath.",
    locationIds: ["argos"],
  },
  {
    id: "penelope",
    name: "Penelope",
    epithet: "Queen of Ithaca",
    description:
      "Your wife. For twenty years she has held a hundred suitors at bay with a loom and a wit sharper than theirs. She tests you in the upper room with a question only her husband would answer, and when you answer it, she lets you in.",
    locationIds: ["bow_contest", "ithaca"],
  },
  {
    id: "telemachus",
    name: "Telemachus",
    epithet: "Prince of Ithaca",
    description:
      "Your son, born in the year you sailed for Troy. A man now, who has stripped the great hall of its weapons in secret and bolted its doors at the right moment. He stands at your shoulder when the killing begins.",
    locationIds: ["bow_contest", "suitors", "ithaca"],
  },
  {
    id: "antinous",
    name: "Antinous",
    epithet: "Chief of the Suitors",
    description:
      "The loudest of the hundred who have eaten your stores and courted your wife. He calls for grease to soften the bow he cannot bend, and laughs at the beggar who asks to try. The first arrow of the reckoning finds him.",
    locationIds: ["suitors"],
  },
];

/**
 * Returns the set of figure ids the player has discovered, given the
 * locationIds that have appeared as `scene` entries in the log.
 */
export function discoveredFigureIds(visitedLocationIds: Set<string>): Set<string> {
  const out = new Set<string>();
  for (const fig of FIGURES) {
    if (fig.locationIds.some((id) => visitedLocationIds.has(id))) {
      out.add(fig.id);
    }
  }
  return out;
}
