import type { ImageSourcePropType } from "react-native";

/**
 * Static image map for each location id. React Native's `require` only
 * accepts literal paths, so this map must be hand-maintained — add a new
 * entry whenever a new location is added to `src/game/locations.ts`.
 */
export const LOCATION_IMAGES: Record<string, ImageSourcePropType> = {
  troy: require("../../assets/locations/troy.png"),
  ismaros: require("../../assets/locations/ismaros.png"),
  lotus: require("../../assets/locations/lotus.png"),
  cyclops: require("../../assets/locations/cyclops.png"),
  aeolus: require("../../assets/locations/aeolus.png"),
  laestrygonians: require("../../assets/locations/laestrygonians.png"),
  circe: require("../../assets/locations/circe.png"),
  underworld: require("../../assets/locations/underworld.png"),
  sirens: require("../../assets/locations/sirens.png"),
  scylla: require("../../assets/locations/scylla.png"),
  thrinacia: require("../../assets/locations/thrinacia.png"),
  leucothea: require("../../assets/locations/leucothea.png"),
  calypso: require("../../assets/locations/calypso.png"),
  phaeacia: require("../../assets/locations/phaeacia.png"),
  eumaeus: require("../../assets/locations/eumaeus.png"),
  argos: require("../../assets/locations/argos.png"),
  bow_contest: require("../../assets/locations/bow_contest.png"),
  suitors: require("../../assets/locations/suitors.png"),
  ithaca: require("../../assets/locations/ithaca.png"),
  gameover_forgotten: require("../../assets/locations/gameover_forgotten.png"),
};

/** Hero image for the start screen. */
export const TITLE_IMAGE = require("../../assets/locations/_title.png");
