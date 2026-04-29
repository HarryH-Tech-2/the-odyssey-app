import type { Location } from "./types";

/**
 * The journey home. Loosely follows Homer's ordering, with choices that echo
 * moments from the poem but allow the player to diverge.
 *
 * Every non-terminal location must lead to another id via each choice's
 * `nextId`. Use the literal "ithaca" as the victory id.
 */
export const LOCATIONS: Record<string, Location> = {
  troy: {
    id: "troy",
    title: "The Ruins of Troy",
    body:
      "Ten years of war end in ash. The wooden horse lies broken on the sand, the city's walls still smoke behind you. Your twelve ships ride low with spoils and weary men. Ithaca is far to the west, and the sea is wide.",
    choices: [
      {
        label: "Set sail immediately, while the wind is fair.",
        outcome:
          "You push off before dusk. The crew sings the old songs. Zeus watches and is not displeased by your haste.",
        effects: { days: 1, favor: 1 },
        nextId: "ismaros",
      },
      {
        label: "Burn offerings to the gods before leaving.",
        outcome:
          "The smoke rises straight. A good omen. But provisions spent on the pyre cannot be eaten at sea.",
        effects: { days: 2, favor: 2, supplies: -3 },
        nextId: "ismaros",
      },
      {
        label: "Take on more supplies from the ruined city.",
        outcome:
          "Your men scavenge grain and salted meat from abandoned stores. Useful — but looting the dead weighs on some hearts.",
        effects: { days: 2, supplies: 6, favor: -1 },
        nextId: "ismaros",
      },
    ],
  },

  ismaros: {
    id: "ismaros",
    title: "The Coast of the Cicones",
    body:
      "A coastline of olive groves and smoke from inland villages. The Cicones, allies of Troy. Your men eye the unguarded town with hungry looks.",
    choices: [
      {
        label: "Raid the town swiftly and put back to sea.",
        outcome:
          "A quick, brutal raid. Wine and cattle fill the holds — but the Cicones return with allies before you can leave. A short, ugly fight on the sand.",
        effects: { days: 2, supplies: 10, crew: -6, ship: -5, favor: -2 },
        nextId: "lotus",
      },
      {
        label: "Raid, then let the men feast on the beach.",
        outcome:
          "You win the town and the men will not be moved from the wine. By dawn the Cicones are back in force. The rout is terrible. Zeus sends a storm after.",
        effects: { days: 4, supplies: 6, crew: -14, ship: -15, favor: -3 },
        nextId: "lotus",
      },
      {
        label: "Sail past. The war is over.",
        outcome:
          "The men grumble, but you hold the tiller. The gods note a captain who remembers mercy.",
        effects: { days: 2, favor: 2 },
        nextId: "lotus",
      },
    ],
  },

  lotus: {
    id: "lotus",
    title: "The Island of the Lotus-Eaters",
    body:
      "A storm drives you to a low green shore. The people here are gentle. They offer a honeyed fruit to your scouts. The scouts do not return on their own feet — they lie smiling in the grass, forgetting Ithaca, forgetting their own names.",
    choices: [
      {
        label: "Drag them back to the ships, weeping and bound.",
        outcome:
          "It takes a day to pry them loose. They curse you from the rowing benches, but by evening most remember their homes.",
        effects: { days: 2, crew: -1 },
        nextId: "cyclops",
      },
      {
        label: "Leave the lost ones. The rest must not taste the fruit.",
        outcome:
          "You sail at once, abandoning three scouts to their sweet forgetting. The remaining crew is shaken but clear-eyed.",
        effects: { days: 1, crew: -3 },
        nextId: "cyclops",
      },
      {
        label: "Taste the fruit yourself, only once, to understand.",
        outcome:
          "For a long hour you forget the war, the ships, your wife's face. You wake with the taste of honey and shame. The men say you were gone a day.",
        effects: { days: 3, supplies: -2, favor: -1 },
        nextId: "cyclops",
      },
    ],
  },

  cyclops: {
    id: "cyclops",
    title: "The Cave of Polyphemus",
    body:
      "A rocky island of wild goats and one enormous cave. The cave stinks of sheep and something worse. You hear the tread of something very large returning down the slope.",
    choices: [
      {
        label: "Hide. Wait for the giant to sleep, then slip away.",
        outcome:
          "A patient, wise choice. You lose no men, but the delay costs supplies. You steal a handful of cheeses on the way out.",
        effects: { days: 3, supplies: 2 },
        nextId: "aeolus",
      },
      {
        label: "Blind the giant with a sharpened stake.",
        outcome:
          "The old trick. 'Nobody has blinded me!' the Cyclops howls. You escape under the bellies of his rams — but you shout your true name from the deck, and Polyphemus prays to his father Poseidon. The sea-god hears.",
        effects: { days: 2, crew: -4, favor: -5, supplies: 4 },
        nextId: "aeolus",
      },
      {
        label: "Blind him, but leave without naming yourself.",
        outcome:
          "You bite your tongue as the ship pulls away. Poseidon's curse does not fall. The men will tell this story forever — and tell it right.",
        effects: { days: 2, crew: -4, favor: -1, supplies: 4 },
        nextId: "aeolus",
      },
    ],
  },

  aeolus: {
    id: "aeolus",
    title: "The Floating Isle of Aeolus",
    body:
      "A bronze-walled island drifting on the sea. King Aeolus, keeper of the winds, welcomes you like a son. At parting he gives you a leather bag — inside, every wind but the one that blows you home.",
    choices: [
      {
        label: "Guard the bag yourself. Sleep in shifts.",
        outcome:
          "You hold the bag on your lap for nine days and nine nights. On the tenth, Ithaca's hills rise ahead. You weep and keep the bag shut.",
        effects: { days: 10, favor: 2 },
        nextId: "laestrygonians",
      },
      {
        label: "Sleep. Trust the men.",
        outcome:
          "The crew, sure the bag holds gold, cut it open as you doze. Every wind bursts free. You are blown all the way back to Aeolus, who shuts his door — a man cursed by the gods is no guest.",
        effects: { days: 18, favor: -3, supplies: -6 },
        nextId: "laestrygonians",
      },
    ],
  },

  laestrygonians: {
    id: "laestrygonians",
    title: "The Harbor of the Laestrygonians",
    body:
      "A narrow fjord with a tempting quiet harbor. As the ships file in, the cliffs fill with shapes — giants, taller than Polyphemus, each with a boulder already in hand.",
    choices: [
      {
        label: "Anchor outside the harbor, alone. Send scouts in.",
        outcome:
          "The other eleven ships enter and are crushed against the cliffs. Scouts are eaten. Only your ship, riding outside, cuts its cable and flees. The survivors row in silence.",
        effects: { days: 3, crew: -10, ship: -5, favor: -1 },
        nextId: "circe",
      },
      {
        label: "Row in with the whole fleet, together, oars flashing.",
        outcome:
          "The giants are waiting for exactly this. Eleven ships are sunk in an hour of rock and blood. Yours barely escapes, half its benches empty.",
        effects: { days: 3, crew: -22, ship: -25, favor: -2 },
        nextId: "circe",
      },
    ],
  },

  circe: {
    id: "circe",
    title: "The Hall of Circe",
    body:
      "The island of Aeaea. A low hall of polished stone, wolves and lions prowling tame at the door. Inside, a woman at a loom, singing. Half your scouting party has already become swine.",
    choices: [
      {
        label: "Storm the hall with sword drawn.",
        outcome:
          "Circe turns your men to pigs at the threshold. You reach her only to have the sword struck from your hand. She laughs and offers you wine — you accept with ill grace.",
        effects: { days: 7, crew: -2, favor: -2, supplies: 4 },
        nextId: "underworld",
      },
      {
        label: "Take the herb Hermes offered. Go as a guest.",
        outcome:
          "Her wine does not touch you. She kneels. She restores the swine to men, and for a year you feast and heal. The ship is repaired. Hearts remember joy.",
        effects: { days: 30, supplies: 10, ship: 15, crew: 2, favor: 2 },
        nextId: "underworld",
      },
    ],
  },

  underworld: {
    id: "underworld",
    title: "The Grove of Persephone",
    body:
      "Circe's parting gift: the way to the land of the dead. You must consult the shade of Tiresias to find a path home. The river hisses black at your feet.",
    choices: [
      {
        label: "Dig the pit. Pour the blood. Summon the shades.",
        outcome:
          "Tiresias drinks and speaks: 'Do not touch the cattle of Helios, or you return alone, on a stranger's ship.' You also see your mother, and the weight of years presses on you.",
        effects: { days: 2, favor: 1 },
        nextId: "sirens",
      },
      {
        label: "Do not disturb the dead. Trust your own compass.",
        outcome:
          "The men approve of your piety. But you sail without the warning Tiresias would have given. The sea knows.",
        effects: { days: 1, favor: -1 },
        nextId: "sirens",
      },
    ],
  },

  sirens: {
    id: "sirens",
    title: "The Strait of the Sirens",
    body:
      "A windless sea. A low green island. And from it, a song so perfect that men have broken their bones against the rocks reaching for it. The song knows your name.",
    choices: [
      {
        label: "Wax in every ear, yours included. Row through.",
        outcome:
          "Silence, sweat, and oars. You pass without hearing a note. Some part of you will always wonder what they were singing.",
        effects: { days: 1 },
        nextId: "scylla",
      },
      {
        label: "Tie yourself to the mast. Let the crew's ears be stopped.",
        outcome:
          "You hear the song. You beg and scream to be loosed; the crew, wise, bind you tighter. You weep for hours after. You have heard what no man has heard and lived.",
        effects: { days: 1, favor: 1 },
        nextId: "scylla",
      },
      {
        label: "Sail close. Just to listen. Briefly.",
        outcome:
          "Two men leap. The rest are only saved because you come to your senses and lash the tiller hard to port.",
        effects: { days: 1, crew: -2, favor: -1 },
        nextId: "scylla",
      },
    ],
  },

  scylla: {
    id: "scylla",
    title: "Between Scylla and Charybdis",
    body:
      "Two cliffs. Under one, a whirlpool that swallows ships whole. Under the other, a six-headed beast that takes six men, always. There is no third path.",
    choices: [
      {
        label: "Hug Scylla's cliff. Pay her price. Keep the ship.",
        outcome:
          "Six screams, six men gone in a breath. The rest row through with a ship intact. You do not look up.",
        effects: { days: 1, crew: -6 },
        nextId: "thrinacia",
      },
      {
        label: "Dare Charybdis. Time the whirlpool.",
        outcome:
          "A long, terrible roll. The ship groans at every seam; half the stores are lost overboard. But every man lives.",
        effects: { days: 1, supplies: -10, ship: -20 },
        nextId: "thrinacia",
      },
    ],
  },

  thrinacia: {
    id: "thrinacia",
    title: "The Island of Helios",
    body:
      "Fat cattle graze a golden meadow. The sun-god's herd. Tiresias warned you — if he was right, and if you listened. A storm pens you here. Supplies run low. The cattle low softly at dusk.",
    choices: [
      {
        label: "Forbid the men. Eat roots and fish, wait the storm.",
        outcome:
          "A month of hunger. Men grumble; two desert. When the wind finally turns, you sail starved but unpunished. Helios does not curse what he is not robbed of.",
        effects: { days: 30, supplies: -12, crew: -2, favor: 3 },
        nextId: "leucothea",
      },
      {
        label: "Let the crew slaughter a single ox. Only one.",
        outcome:
          "Helios sees. He complains to Zeus. The moment you leave the island a thunderbolt splits the ship. You cling to the mast in a boiling sea. The crew is gone.",
        effects: { days: 30, supplies: 4, crew: -100, ship: -60, favor: -5 },
        nextId: "leucothea",
      },
    ],
  },

  leucothea: {
    id: "leucothea",
    title: "The Veil of Leucothea",
    body:
      "Open sea. A black wall of cloud rises in the south. The wind screams through what's left of the rigging. The mast snaps. You are alone in the white water with the ship breaking under you.\n\nA seabird lands on a spar. It is a goddess — Leucothea, the white-veiled — and she holds out a strip of immortal cloth.",
    choices: [
      {
        label: "Take the veil. Strip off everything else and swim.",
        outcome:
          "The cloth lashed under your arms, you abandon the wreck and swim. Two days and two nights in the sea. On the third dawn you crawl onto a green shore and sleep where you fall.",
        effects: { days: 3, ship: -100, supplies: -10, favor: 1 },
        nextId: "calypso",
      },
      {
        label: "Cling to the timbers. Refuse a god you don't trust.",
        outcome:
          "You ride the broken keel for a day and a night. Salt-cracked, half-mad, you finally tear off the veil's offer and swim — too late, too tired. The current decides where you wash up.",
        effects: { days: 4, ship: -100, supplies: -10, favor: -1 },
        nextId: "calypso",
      },
    ],
  },

  calypso: {
    id: "calypso",
    title: "Ogygia, the Island of Calypso",
    body:
      "You wash up alone — or nearly alone — on a green island in the middle of nowhere. Calypso, a goddess, pulls you from the surf. She offers you immortality if you will stay. She weeps when you refuse.",
    choices: [
      {
        label: "Stay. Forget Penelope. Become a god.",
        outcome:
          "You stay a year. Then another. Your name fades from the lips of men. Ithaca forgets you. This is not the story of your return.",
        effects: { days: 2555, favor: -5 },
        nextId: "gameover_forgotten",
      },
      {
        label: "Refuse. Build a raft. Go home.",
        outcome:
          "She helps you, in the end. You build a raft of twenty timbers. Athena whispers to Zeus; Zeus whispers to Hermes; Calypso lets you go. The sea is wide and you are alone.",
        effects: { days: 60, ship: -40, supplies: 10, favor: 2 },
        nextId: "phaeacia",
      },
    ],
  },

  phaeacia: {
    id: "phaeacia",
    title: "The Court of the Phaeacians",
    body:
      "A kind people on a fair island. The princess Nausicaa finds you naked on the beach and does not laugh. Her father King Alcinous feasts you. They ask only one thing — your name, and your story.",
    choices: [
      {
        label: "Tell them everything. Troy, the Cyclops, all of it.",
        outcome:
          "They listen all night. At dawn they load a ship with gifts and sail you home themselves, asking nothing in return. You sleep the whole voyage. You wake on a beach you half-remember.",
        effects: { days: 5, ship: 50, supplies: 10, favor: 3 },
        nextId: "eumaeus",
      },
      {
        label: "Keep your name. Ask for passage quietly.",
        outcome:
          "They sense a great man but will not press. They give you a smaller boat, less honor — but you sail within the week, and the sea is kind.",
        effects: { days: 3, ship: 20, supplies: 5, favor: 1 },
        nextId: "eumaeus",
      },
    ],
  },

  eumaeus: {
    id: "eumaeus",
    title: "The Hut of Eumaeus",
    body:
      "Ithaca, at last — but not the homecoming you imagined. Athena meets you on the shore and presses age into your face: a beggar in rags, unrecognized. She tells you what you'd dreaded: a hundred suitors infest your hall, eating your stores, courting your wife. You must come home in disguise.\n\nThe swineherd Eumaeus, who does not know you, gives the stranger bread and a pile of skins by the fire.",
    choices: [
      {
        label: "Test him. Speak ill of his absent king and watch his face.",
        outcome:
          "Eumaeus weeps to defend you to a man he thinks a beggar. You learn what loyalty looks like from the outside. You eat his bread without speaking your name.",
        effects: { days: 1, supplies: 4, favor: 1 },
        nextId: "argos",
      },
      {
        label: "Reveal yourself to him. Trust the man who has stayed.",
        outcome:
          "He falls to his knees in the firelight and weeps. You weep with him. He swears the secret on his life and on his pigs. You have your first ally inside Ithaca.",
        effects: { days: 1, supplies: 4, favor: 2 },
        nextId: "argos",
      },
    ],
  },

  argos: {
    id: "argos",
    title: "The Old Hound, Argos",
    body:
      "On the road up to your own great hall, propped on a stranger's staff, you pass a pile of dung where the men throw the household refuse. An old, old dog lies on it. His ears prick. His tail, after twenty years, remembers.\n\nNo one but you sees him lift his head. No one but he sees through the disguise.",
    choices: [
      {
        label: "Kneel beside him. Risk the moment.",
        outcome:
          "You kneel and let him smell your hand. He sighs once — a sound you have not heard in twenty years — and dies content. You stand and walk on, and your face does not show what it shows.",
        effects: { days: 1, favor: 2 },
        nextId: "bow_contest",
      },
      {
        label: "Walk past. Save him for after. Save everything for after.",
        outcome:
          "You do not break stride. A tear cuts a track through the dust on your cheek; you turn your face. Behind you, the old dog lays his head down. He does not get up again.",
        effects: { days: 1, favor: -1 },
        nextId: "bow_contest",
      },
    ],
  },

  bow_contest: {
    id: "bow_contest",
    title: "The Contest of the Bow",
    body:
      "Inside the hall: a hundred suitors at long tables, drunk and loud. Penelope — your Penelope — stands by your great bow and announces a contest. Whoever can string it and shoot through twelve axe-heads will have her hand.\n\nNot one of them can even bend it. They sweat and curse and call for grease. You ask, in your beggar's voice, if you might try.",
    choices: [
      {
        label: "Take the bow. String it cleanly. Show them.",
        outcome:
          "The bow bends like a child's switch in your hands. The string sings. The arrow flies through every axe-head. The hall goes very quiet. Telemachus is already moving for the doors.",
        effects: { days: 1, favor: 3 },
        nextId: "suitors",
      },
      {
        label: "Take the bow. Pretend a struggle, then strike.",
        outcome:
          "You let it tremble in your hands a moment, milking their laughter. Then the laughter ends mid-throat as the arrow finds the axe-heads. The slowest suitor reaches for his sword. Too slow.",
        effects: { days: 1, favor: 1 },
        nextId: "suitors",
      },
    ],
  },

  suitors: {
    id: "suitors",
    title: "The Slaughter in the Hall",
    body:
      "You drop the rags. Telemachus bolts the doors. Eumaeus and the cowherd Philoetius take their places at your shoulders. The suitors scramble for swords that are no longer on the walls — Telemachus saw to that this morning.\n\nThis is not a fight. This is a reckoning. It will take all afternoon.",
    choices: [
      {
        label: "Spare the bard and the herald. They served under threat.",
        outcome:
          "By dusk it is done. The hall is a charnel house but the bard still has hands to play with, and the herald still has a tongue to carry the news. The gods note a king who can stop killing when killing is done.",
        effects: { days: 1, crew: -2, favor: 3 },
        nextId: "ithaca",
      },
      {
        label: "Show no mercy. They ate your bread and courted your wife.",
        outcome:
          "Every man who came courting goes home in pieces. Twelve maids who shared their beds with the suitors are hanged in the courtyard at dawn. The hall is clean. Your hand shakes for a week.",
        effects: { days: 2, crew: -3, favor: -2 },
        nextId: "ithaca",
      },
    ],
  },

  ithaca: {
    id: "ithaca",
    title: "Ithaca",
    body:
      "The hall is washed clean by dawn. The courtyard is quiet. Penelope — your Penelope — meets you in the upper room and tests you with a question only her husband would answer. You answer it.\n\nThe bed you built around the living olive tree, the bed that cannot be moved, is yours again. Your son sleeps for the first time in twenty years. Outside, the sea is dark and small.\n\nYou are home.",
    choices: [], // terminal — handled as victory
  },

  // --- terminal / game-over scenes (reached by narrative, not stat death) ---

  gameover_forgotten: {
    id: "gameover_forgotten",
    title: "The Forgotten King",
    body:
      "Seven years pass. Then seventy. The cave smells of salt and honey. You are a minor god of a small island no one sails to. Penelope weds another. Telemachus dies old in a country you will never see.\n\nThis is not the song they sing of you.",
    choices: [],
  },
};

export const STARTING_LOCATION_ID = "troy";
