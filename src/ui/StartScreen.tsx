import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { hasResumableSave, useGame } from "../game/store";
import { BackgroundParticles } from "./BackgroundParticles";
import { TITLE_IMAGE } from "./locationImages";
import { colors, fonts, radius, spacing } from "./theme";

/**
 * Title screen shown on every app launch. Offers a fresh start, plus a
 * Continue option when a saved game is available.
 */
export function StartScreen() {
  const startNewGame = useGame((s) => s.startNewGame);
  const continueGame = useGame((s) => s.continueGame);
  const canContinue = useGame(hasResumableSave);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <BackgroundParticles />

      <View style={styles.heroWrap}>
        <Image source={TITLE_IMAGE} style={styles.hero} resizeMode="cover" />
        {/* Soft fade at the bottom of the hero so it bleeds into the menu. */}
        <View style={styles.heroFade} pointerEvents="none" />
      </View>

      <View style={styles.titleBlock}>
        <Text style={styles.title}>THE ODYSSEY</Text>
        <Text style={styles.subtitle}>A long way home.</Text>
      </View>

      <View style={styles.menu}>
        {canContinue && (
          <PrimaryButton label="Continue Voyage" onPress={continueGame} />
        )}
        <PrimaryButton
          label={canContinue ? "Begin Anew" : "Begin Voyage"}
          onPress={startNewGame}
          variant={canContinue ? "secondary" : "primary"}
        />
      </View>
    </SafeAreaView>
  );
}

function PrimaryButton({
  label,
  onPress,
  variant = "primary",
}: {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
}) {
  const isPrimary = variant === "primary";
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        isPrimary ? styles.btnPrimary : styles.btnSecondary,
        pressed && (isPrimary ? styles.btnPrimaryPressed : styles.btnSecondaryPressed),
      ]}
    >
      <Text
        style={[styles.btnText, isPrimary ? styles.btnTextPrimary : styles.btnTextSecondary]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  heroWrap: {
    width: "100%",
    aspectRatio: 3 / 2,
    maxHeight: 320,
  },
  hero: {
    width: "100%",
    height: "100%",
  },
  heroFade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
    backgroundColor: colors.bg,
    opacity: 0.55,
  },
  titleBlock: {
    alignItems: "center",
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  title: {
    color: colors.accent,
    fontFamily: fonts.title,
    fontSize: 28,
    letterSpacing: 8,
    fontWeight: "700",
  },
  subtitle: {
    color: colors.textDim,
    fontFamily: fonts.body,
    fontSize: 14,
    fontStyle: "italic",
    marginTop: spacing.sm,
    letterSpacing: 1,
  },
  menu: {
    marginTop: "auto",
    padding: spacing.lg,
    gap: spacing.md,
  },
  btn: {
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  btnPrimary: {
    backgroundColor: colors.accent,
  },
  btnPrimaryPressed: {
    backgroundColor: colors.accentDim,
  },
  btnSecondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.accentDim,
  },
  btnSecondaryPressed: {
    backgroundColor: colors.choicePressed,
  },
  btnText: {
    fontFamily: fonts.title,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 2,
  },
  btnTextPrimary: {
    color: colors.bg,
  },
  btnTextSecondary: {
    color: colors.accent,
  },
});
