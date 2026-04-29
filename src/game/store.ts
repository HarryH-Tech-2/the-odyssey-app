import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { LOCATIONS, STARTING_LOCATION_ID } from "./locations";
import type { Choice, LogEntry, Phase, StatDelta, Stats } from "./types";

export type ScreenMode = "menu" | "game";

const STARTING_STATS: Stats = {
  crew: 45,
  supplies: 30,
  ship: 100,
  favor: 0,
  days: 0,
};

// Stats are clamped to sane bounds after every change.
const CLAMPS: Record<keyof Stats, { min: number; max: number }> = {
  crew: { min: 0, max: 100 },
  supplies: { min: 0, max: 100 },
  ship: { min: 0, max: 100 },
  favor: { min: -10, max: 10 },
  days: { min: 0, max: 99999 },
};

function clamp(key: keyof Stats, value: number): number {
  const { min, max } = CLAMPS[key];
  return Math.max(min, Math.min(max, value));
}

function applyDelta(stats: Stats, delta: StatDelta): Stats {
  const next: Stats = { ...stats };
  (Object.keys(delta) as (keyof Stats)[]).forEach((k) => {
    const d = delta[k];
    if (typeof d === "number") next[k] = clamp(k, next[k] + d);
  });
  return next;
}

// Did we just die/fail because of stat values?
function fatalReason(stats: Stats): string | null {
  if (stats.crew <= 0) {
    return "With no crew left to pull the oars, your ship drifts wherever the current wills. You are not seen again.";
  }
  if (stats.ship <= 0) {
    return "The ship gives up its last timber. You cling to wreckage in a cold sea. Ithaca is a name the waves do not know.";
  }
  if (stats.supplies <= 0) {
    return "The last barrel is empty. The last rat is eaten. The crew grows quiet, then still. The ship sails on without hands.";
  }
  return null;
}

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

function buildInitialLog(): LogEntry[] {
  const starting = LOCATIONS[STARTING_LOCATION_ID];
  return [
    {
      id: uid(),
      kind: "system",
      text: "You are Odysseus, King of Ithaca. The war is over. Bring your men home.",
    },
    {
      id: uid(),
      kind: "scene",
      text: `— ${starting.title} —\n\n${starting.body}`,
      locationId: starting.id,
    },
  ];
}

export type GameState = {
  // --- transient UI state (not persisted) ---
  // Which top-level screen the app is showing. Always starts at the menu so
  // the title screen appears every launch, even with a saved game.
  screenMode: ScreenMode;

  // --- persisted game state ---
  stats: Stats;
  locationId: string;
  phase: Phase;
  // Text shown in the "outcome" phase (between choice and next scene).
  pendingOutcome: string | null;
  pendingNextId: string | null;
  // Narrative log — shown scrollable on screen.
  log: LogEntry[];
  endingText: string | null;

  // actions
  chooseOption: (choice: Choice) => void;
  advance: () => void;
  restart: () => void;
  startNewGame: () => void;
  continueGame: () => void;
  returnToMenu: () => void;
};

export const useGame = create<GameState>()(
  persist(
    (set, get) => ({
    screenMode: "menu",
    stats: { ...STARTING_STATS },
    locationId: STARTING_LOCATION_ID,
    phase: "scene",
    pendingOutcome: null,
    pendingNextId: null,
    log: buildInitialLog(),
    endingText: null,

    chooseOption: (choice: Choice) => {
      const { stats, log } = get();
      const nextStats = applyDelta(stats, choice.effects);

      const newLog: LogEntry[] = [
        ...log,
        { id: uid(), kind: "choice", text: `> ${choice.label}` },
        { id: uid(), kind: "outcome", text: choice.outcome },
      ];

      // Check for stat-based death first — overrides any narrative nextId.
      const fatal = fatalReason(nextStats);
      if (fatal) {
        set({
          stats: nextStats,
          log: [...newLog, { id: uid(), kind: "system", text: fatal }],
          phase: "gameover",
          endingText: fatal,
          pendingOutcome: null,
          pendingNextId: null,
        });
        return;
      }

      set({
        stats: nextStats,
        log: newLog,
        phase: "outcome",
        pendingOutcome: choice.outcome,
        pendingNextId: choice.nextId,
      });
    },

    advance: () => {
      const { pendingNextId, log } = get();
      if (!pendingNextId) return;

      // Victory.
      if (pendingNextId === "ithaca") {
        const ithaca = LOCATIONS.ithaca;
        set({
          locationId: "ithaca",
          phase: "victory",
          pendingOutcome: null,
          pendingNextId: null,
          endingText: ithaca.body,
          log: [
            ...log,
            {
              id: uid(),
              kind: "scene",
              text: `— ${ithaca.title} —\n\n${ithaca.body}`,
              locationId: ithaca.id,
            },
          ],
        });
        return;
      }

      const nextLoc = LOCATIONS[pendingNextId];
      if (!nextLoc) {
        // Defensive: unknown id, treat as game over.
        set({
          phase: "gameover",
          endingText: "The map runs out. You sail off the edge of the world.",
          pendingOutcome: null,
          pendingNextId: null,
        });
        return;
      }

      // Narrative terminal locations (no choices) end the game.
      if (nextLoc.choices.length === 0) {
        set({
          locationId: nextLoc.id,
          phase: "gameover",
          endingText: nextLoc.body,
          pendingOutcome: null,
          pendingNextId: null,
          log: [
            ...log,
            {
              id: uid(),
              kind: "scene",
              text: `— ${nextLoc.title} —\n\n${nextLoc.body}`,
              locationId: nextLoc.id,
            },
          ],
        });
        return;
      }

      set({
        locationId: nextLoc.id,
        phase: "scene",
        pendingOutcome: null,
        pendingNextId: null,
        log: [
          ...log,
          {
            id: uid(),
            kind: "scene",
            text: `— ${nextLoc.title} —\n\n${nextLoc.body}`,
            locationId: nextLoc.id,
          },
        ],
      });
    },

    restart: () => {
      set({
        stats: { ...STARTING_STATS },
        locationId: STARTING_LOCATION_ID,
        phase: "scene",
        pendingOutcome: null,
        pendingNextId: null,
        endingText: null,
        log: buildInitialLog(),
      });
    },

    startNewGame: () => {
      // Wipe any saved progress and drop the player straight into the game.
      set({
        screenMode: "game",
        stats: { ...STARTING_STATS },
        locationId: STARTING_LOCATION_ID,
        phase: "scene",
        pendingOutcome: null,
        pendingNextId: null,
        endingText: null,
        log: buildInitialLog(),
      });
    },

    continueGame: () => {
      // Resume the persisted game state (already loaded by the persist
      // middleware on app boot).
      set({ screenMode: "game" });
    },

    returnToMenu: () => {
      set({ screenMode: "menu" });
    },
    }),
    {
      name: "odyssey-save-v1",
      storage: createJSONStorage(() => AsyncStorage),
      // Persist only the actual game state, not the transient UI flag.
      partialize: (state) => ({
        stats: state.stats,
        locationId: state.locationId,
        phase: state.phase,
        pendingOutcome: state.pendingOutcome,
        pendingNextId: state.pendingNextId,
        log: state.log,
        endingText: state.endingText,
      }),
    }
  )
);

/** True when there is a saved in-progress game worth resuming. */
export function hasResumableSave(state: GameState): boolean {
  // Treat "fresh game" (only the seed log entries, still at the starting
  // location, no terminal phase) as not-a-save.
  if (state.phase === "victory" || state.phase === "gameover") return false;
  if (state.locationId !== STARTING_LOCATION_ID) return true;
  return state.log.length > 2;
}

// Helper for the UI: list of currently-selectable choices honoring `requires`.
export function availableChoices(stats: Stats, choices: Choice[]): Choice[] {
  return choices.filter((c) => {
    if (!c.requires) return true;
    return (Object.keys(c.requires) as (keyof Stats)[]).every(
      (k) => stats[k] >= (c.requires![k] as number)
    );
  });
}
