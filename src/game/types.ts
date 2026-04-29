export type Stats = {
  crew: number;
  supplies: number;
  ship: number;
  favor: number; // favor of the gods, -10..+10
  days: number;
};

export type StatDelta = Partial<Stats>;

export type Choice = {
  label: string;
  // Shown after the player picks this option. Describes what happened.
  outcome: string;
  effects: StatDelta;
  // Next location id. Use "ithaca" as the victory location id.
  nextId: string;
  // Optional minimum stat requirements to even show this choice.
  requires?: Partial<Stats>;
};

export type Location = {
  id: string;
  title: string;
  body: string; // intro / scene text shown on arrival
  choices: Choice[];
};

export type Phase = "scene" | "outcome" | "gameover" | "victory";

export type LogEntry = {
  id: string;
  text: string;
  kind: "scene" | "choice" | "outcome" | "system";
  // Set on `scene` entries so the UI can render the matching location image.
  locationId?: string;
};
