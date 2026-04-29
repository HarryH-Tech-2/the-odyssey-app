import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useShallow } from "zustand/react/shallow";
import { FIGURES, discoveredFigureIds } from "../game/figures";
import { useGame } from "../game/store";
import { BackgroundParticles } from "./BackgroundParticles";
import { BottomTabs, type TabKey } from "./BottomTabs";
import { ChoicePanel } from "./ChoicePanel";
import { FiguresScreen } from "./FiguresScreen";
import { LogView } from "./LogView";
import { StatsBar } from "./StatsBar";
import { colors, fonts, spacing } from "./theme";

export function GameScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>("journey");

  // Figure-discovery count for the tab-bar badge — derived from log scenes.
  const log = useGame(useShallow((s) => s.log));
  const figuresCount = useMemo(() => {
    const visited = new Set<string>();
    for (const e of log) {
      if (e.kind === "scene" && e.locationId) visited.add(e.locationId);
    }
    return discoveredFigureIds(visited).size;
  }, [log]);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      {/* Drifting motes behind the UI — must be the first child so it
          renders underneath everything else. */}
      <BackgroundParticles />
      <View style={styles.header}>
        <Text style={styles.brand}>THE ODYSSEY</Text>
      </View>

      {activeTab === "journey" ? (
        <>
          <StatsBar />
          <LogView />
          <ChoicePanel />
        </>
      ) : (
        <FiguresScreen />
      )}

      <BottomTabs
        active={activeTab}
        onChange={setActiveTab}
        figuresCount={figuresCount}
        figuresTotal={FIGURES.length}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    paddingVertical: spacing.sm,
    alignItems: "center",
    // Transparent so motes drift through the title strip.
    backgroundColor: "transparent",
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  brand: {
    color: colors.accent,
    fontFamily: fonts.title,
    fontSize: 14,
    letterSpacing: 6,
    fontWeight: "600",
  },
});
