import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useShallow } from "zustand/react/shallow";
import { useGame } from "../game/store";
import { colors, fonts, radius, spacing } from "./theme";

/**
 * Top-of-screen status readout. Kept compact so the log can breathe.
 *
 * Zustand v5: object selectors infinite-loop without useShallow.
 */
export function StatsBar() {
  const stats = useGame(useShallow((s) => s.stats));

  return (
    <View style={styles.row}>
      <Stat label="Crew" value={stats.crew} warn={stats.crew <= 10} />
      <Stat label="Ship" value={stats.ship} warn={stats.ship <= 20} />
      <Stat label="Food" value={stats.supplies} warn={stats.supplies <= 8} />
      <Stat
        label="Favor"
        value={stats.favor}
        signed
        warn={stats.favor <= -4}
        good={stats.favor >= 4}
      />
      <Stat label="Day" value={stats.days} />
    </View>
  );
}

function Stat(props: {
  label: string;
  value: number;
  warn?: boolean;
  good?: boolean;
  signed?: boolean;
}) {
  const { label, value, warn, good, signed } = props;
  const display = signed && value > 0 ? `+${value}` : `${value}`;
  return (
    <View style={styles.stat}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text
        style={[
          styles.statValue,
          warn && styles.statWarn,
          good && styles.statGood,
        ]}
      >
        {display}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    backgroundColor: colors.bgElevated,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  stat: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.bg,
    borderRadius: radius.sm,
    paddingVertical: spacing.xs,
  },
  statLabel: {
    color: colors.textDim,
    fontFamily: fonts.body,
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  statValue: {
    color: colors.text,
    fontFamily: fonts.title,
    fontSize: 18,
    fontWeight: "600",
  },
  statWarn: { color: colors.danger },
  statGood: { color: colors.good },
});
