import React, { useEffect, useRef } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useShallow } from "zustand/react/shallow";
import { useGame } from "../game/store";
import type { LogEntry } from "../game/types";
import { LOCATION_IMAGES } from "./locationImages";
import { colors, fonts, spacing } from "./theme";

/**
 * Scrollable narrative log. Auto-scrolls to the bottom when new entries
 * arrive so the latest scene is always visible.
 */
export function LogView() {
  const log = useGame(useShallow((s) => s.log));
  const ref = useRef<ScrollView>(null);

  useEffect(() => {
    // Let layout settle, then scroll to the end.
    const t = setTimeout(() => ref.current?.scrollToEnd({ animated: true }), 30);
    return () => clearTimeout(t);
  }, [log.length]);

  return (
    <ScrollView
      ref={ref}
      style={styles.scroll}
      contentContainerStyle={styles.content}
    >
      {log.map((entry) => (
        <LogLine key={entry.id} entry={entry} />
      ))}
    </ScrollView>
  );
}

function LogLine({ entry }: { entry: LogEntry }) {
  if (entry.kind === "scene") {
    // Split the first line (the "— Title —" header) from body so we can
    // style it distinctly.
    const [header, ...rest] = entry.text.split("\n\n");
    const image = entry.locationId ? LOCATION_IMAGES[entry.locationId] : undefined;
    return (
      <View style={styles.scene}>
        {image && (
          <Image source={image} style={styles.sceneImage} resizeMode="cover" />
        )}
        <Text style={styles.sceneHeader}>{header}</Text>
        {rest.length > 0 && (
          <Text style={styles.sceneBody}>{rest.join("\n\n")}</Text>
        )}
      </View>
    );
  }

  if (entry.kind === "choice") {
    return <Text style={styles.choice}>{entry.text}</Text>;
  }

  if (entry.kind === "outcome") {
    return <Text style={styles.outcome}>{entry.text}</Text>;
  }

  // system
  return <Text style={styles.system}>{entry.text}</Text>;
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    // Transparent so the BackgroundParticles layer drifts visibly behind the
    // narrative log.
    backgroundColor: "transparent",
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  scene: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
  },
  sceneImage: {
    // Cap height so the title + body of the scene remain visible on screen
    // without scrolling on typical phones.
    width: "100%",
    height: Math.min(180, Dimensions.get("window").height * 0.22),
    borderRadius: 4,
    marginBottom: spacing.md,
    backgroundColor: colors.border,
  },
  sceneHeader: {
    color: colors.accent,
    fontFamily: fonts.title,
    fontSize: 16,
    letterSpacing: 2,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  sceneBody: {
    color: colors.text,
    fontFamily: fonts.body,
    fontSize: 17,
    lineHeight: 26,
  },
  choice: {
    color: colors.accentDim,
    fontFamily: fonts.body,
    fontStyle: "italic",
    fontSize: 15,
    lineHeight: 22,
    marginTop: spacing.sm,
  },
  outcome: {
    color: colors.textDim,
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
  },
  system: {
    color: colors.accent,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 22,
    fontStyle: "italic",
    textAlign: "center",
  },
});
