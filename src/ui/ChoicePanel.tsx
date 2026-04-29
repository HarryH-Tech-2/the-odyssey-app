import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useShallow } from "zustand/react/shallow";
import { LOCATIONS } from "../game/locations";
import { availableChoices, useGame } from "../game/store";
import type { Choice } from "../game/types";
import { colors, fonts, radius, spacing } from "./theme";

/**
 * Bottom panel that adapts to the current game phase:
 *   scene    -> show choice buttons
 *   outcome  -> show a single "Continue" button
 *   gameover -> show ending + "Sail again"
 *   victory  -> show triumph + "Sail again"
 */
export function ChoicePanel() {
  const phase = useGame((s) => s.phase);
  const locationId = useGame((s) => s.locationId);
  const stats = useGame(useShallow((s) => s.stats));
  const endingText = useGame((s) => s.endingText);
  const chooseOption = useGame((s) => s.chooseOption);
  const advance = useGame((s) => s.advance);
  const restart = useGame((s) => s.restart);

  if (phase === "gameover" || phase === "victory") {
    const isWin = phase === "victory";
    return (
      <View style={styles.wrap}>
        <Text style={[styles.endingLabel, isWin ? styles.win : styles.lose]}>
          {isWin ? "Nostos" : "The End of the Song"}
        </Text>
        {endingText && <Text style={styles.endingBody}>{endingText}</Text>}
        <PrimaryButton label="Sail again" onPress={restart} />
      </View>
    );
  }

  if (phase === "outcome") {
    return (
      <View style={styles.wrap}>
        <PrimaryButton label="Continue" onPress={advance} />
      </View>
    );
  }

  // scene
  const loc = LOCATIONS[locationId];
  const choices = availableChoices(stats, loc?.choices ?? []);

  return (
    <View style={styles.wrap}>
      {choices.map((c, i) => (
        <ChoiceButton key={i} choice={c} onPress={() => chooseOption(c)} />
      ))}
    </View>
  );
}

function ChoiceButton({
  choice,
  onPress,
}: {
  choice: Choice;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.choiceBtn,
        pressed && styles.choiceBtnPressed,
      ]}
    >
      <Text style={styles.choiceBtnText}>{choice.label}</Text>
    </Pressable>
  );
}

function PrimaryButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.primaryBtn,
        pressed && styles.primaryBtnPressed,
      ]}
    >
      <Text style={styles.primaryBtnText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.bgElevated,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    padding: spacing.md,
    gap: spacing.sm,
  },
  choiceBtn: {
    backgroundColor: colors.choiceBg,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  choiceBtnPressed: {
    backgroundColor: colors.choicePressed,
  },
  choiceBtnText: {
    color: colors.text,
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 22,
  },
  primaryBtn: {
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  primaryBtnPressed: {
    backgroundColor: colors.accentDim,
  },
  primaryBtnText: {
    color: colors.bg,
    fontFamily: fonts.title,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },
  endingLabel: {
    fontFamily: fonts.title,
    fontSize: 14,
    letterSpacing: 3,
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: spacing.xs,
  },
  win: { color: colors.good },
  lose: { color: colors.danger },
  endingBody: {
    color: colors.text,
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
});
