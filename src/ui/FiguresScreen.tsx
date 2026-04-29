import React, { useMemo } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useShallow } from "zustand/react/shallow";
import { FIGURES, discoveredFigureIds, type Figure } from "../game/figures";
import { useGame } from "../game/store";
import { FIGURE_IMAGES } from "./figureImages";
import { colors, fonts, radius, spacing } from "./theme";

/**
 * The "Figures" tab. Shows every famous figure the player can encounter on
 * the journey. Discovered figures show their portrait, name, and lore;
 * undiscovered figures are silhouettes.
 *
 * Discovery is derived from the visited-locations set in the log, so this
 * works with existing saves without any migration.
 */
export function FiguresScreen() {
  const log = useGame(useShallow((s) => s.log));

  const { discovered, visitedCount, totalCount } = useMemo(() => {
    const visited = new Set<string>();
    for (const e of log) {
      if (e.kind === "scene" && e.locationId) visited.add(e.locationId);
    }
    const ids = discoveredFigureIds(visited);
    return {
      discovered: ids,
      visitedCount: ids.size,
      totalCount: FIGURES.length,
    };
  }, [log]);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
    >
      <View style={styles.headerWrap}>
        <Text style={styles.headerTitle}>Figures of the Journey</Text>
        <Text style={styles.headerCount}>
          {visitedCount} of {totalCount} encountered
        </Text>
      </View>

      {FIGURES.map((fig) => (
        <FigureCard
          key={fig.id}
          figure={fig}
          discovered={discovered.has(fig.id)}
        />
      ))}
    </ScrollView>
  );
}

function FigureCard({
  figure,
  discovered,
}: {
  figure: Figure;
  discovered: boolean;
}) {
  // Pick the first available thumbnail among the figure's location ids.
  // Thumbnails are ~25KB JPGs vs the ~1.5MB scene PNGs — keeps the Figures
  // list fast even with every figure discovered.
  const portrait = figure.locationIds
    .map((id) => FIGURE_IMAGES[id])
    .find((src) => src !== undefined);

  if (!discovered) {
    return (
      <View style={[styles.card, styles.cardLocked]}>
        <View style={styles.lockedPlaceholder}>
          <Text style={styles.lockedGlyph}>?</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.lockedName}>???</Text>
          <Text style={styles.lockedDesc}>Not yet encountered.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      {portrait && (
        <Image
          source={portrait}
          style={styles.portrait}
          resizeMode="cover"
        />
      )}
      <View style={styles.body}>
        <Text style={styles.name}>{figure.name}</Text>
        <Text style={styles.epithet}>{figure.epithet}</Text>
        <Text style={styles.desc}>{figure.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "transparent",
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  headerWrap: {
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  headerTitle: {
    color: colors.accent,
    fontFamily: fonts.title,
    fontSize: 16,
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  headerCount: {
    color: colors.textDim,
    fontFamily: fonts.body,
    fontSize: 13,
    marginTop: spacing.xs,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: colors.bgElevated,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.md,
    overflow: "hidden",
  },
  cardLocked: {
    backgroundColor: colors.bg,
    borderStyle: "dashed",
  },
  portrait: {
    width: "100%",
    height: 140,
    backgroundColor: colors.border,
  },
  lockedPlaceholder: {
    width: "100%",
    height: 80,
    backgroundColor: colors.bgElevated,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  lockedGlyph: {
    color: colors.accentDim,
    fontFamily: fonts.title,
    fontSize: 36,
    opacity: 0.6,
  },
  body: {
    padding: spacing.md,
    gap: spacing.xs,
  },
  name: {
    color: colors.accent,
    fontFamily: fonts.title,
    fontSize: 18,
    letterSpacing: 1,
  },
  epithet: {
    color: colors.textDim,
    fontFamily: fonts.body,
    fontStyle: "italic",
    fontSize: 13,
    marginBottom: spacing.xs,
  },
  desc: {
    color: colors.text,
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
  },
  lockedName: {
    color: colors.textDim,
    fontFamily: fonts.title,
    fontSize: 18,
    letterSpacing: 4,
  },
  lockedDesc: {
    color: colors.textDim,
    fontFamily: fonts.body,
    fontStyle: "italic",
    fontSize: 13,
  },
});
