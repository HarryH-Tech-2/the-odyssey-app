import type { ImageSourcePropType } from "react-native";

/**
 * Small (~480px wide, ~25KB) JPG thumbnails of each location, used by the
 * Figures tab so the list paints quickly. Originals in `LOCATION_IMAGES`
 * (~1.5MB PNGs) are kept for the in-game scene image.
 *
 * Hand-maintained, like LOCATION_IMAGES, because React Native's `require`
 * only accepts literal paths. Regenerate the JPGs with
 * `scripts/generate-thumbnails.mjs` after adding new location PNGs.
 */
export const FIGURE_IMAGES: Record<string, ImageSourcePropType> = {
  troy: require("../../assets/figures/troy.jpg"),
  ismaros: require("../../assets/figures/ismaros.jpg"),
  lotus: require("../../assets/figures/lotus.jpg"),
  cyclops: require("../../assets/figures/cyclops.jpg"),
  aeolus: require("../../assets/figures/aeolus.jpg"),
  laestrygonians: require("../../assets/figures/laestrygonians.jpg"),
  circe: require("../../assets/figures/circe.jpg"),
  underworld: require("../../assets/figures/underworld.jpg"),
  sirens: require("../../assets/figures/sirens.jpg"),
  scylla: require("../../assets/figures/scylla.jpg"),
  thrinacia: require("../../assets/figures/thrinacia.jpg"),
  leucothea: require("../../assets/figures/leucothea.jpg"),
  calypso: require("../../assets/figures/calypso.jpg"),
  phaeacia: require("../../assets/figures/phaeacia.jpg"),
  eumaeus: require("../../assets/figures/eumaeus.jpg"),
  argos: require("../../assets/figures/argos.jpg"),
  bow_contest: require("../../assets/figures/bow_contest.jpg"),
  suitors: require("../../assets/figures/suitors.jpg"),
  ithaca: require("../../assets/figures/ithaca.jpg"),
  gameover_forgotten: require("../../assets/figures/gameover_forgotten.jpg"),
};
