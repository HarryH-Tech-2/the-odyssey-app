import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, fonts, spacing } from "./theme";

export type TabKey = "journey" | "figures";

type TabDef = {
  key: TabKey;
  label: string;
  // Small unicode glyph — keeps the bundle free of icon-font deps.
  glyph: string;
};

const TABS: TabDef[] = [
  { key: "journey", label: "Journey", glyph: "⛵" },
  { key: "figures", label: "Figures", glyph: "☉" },
];

export function BottomTabs({
  active,
  onChange,
  figuresCount,
  figuresTotal,
}: {
  active: TabKey;
  onChange: (key: TabKey) => void;
  figuresCount: number;
  figuresTotal: number;
}) {
  return (
    <View style={styles.bar}>
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        const showBadge = tab.key === "figures" && figuresCount > 0;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            style={({ pressed }) => [
              styles.tab,
              pressed && styles.tabPressed,
            ]}
          >
            <View style={styles.glyphRow}>
              <Text style={[styles.glyph, isActive && styles.glyphActive]}>
                {tab.glyph}
              </Text>
              {showBadge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {figuresCount}/{figuresTotal}
                  </Text>
                </View>
              )}
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
            <View
              style={[styles.underline, isActive && styles.underlineActive]}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    backgroundColor: colors.bgElevated,
    borderTopColor: colors.border,
    borderTopWidth: 1,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  tabPressed: {
    backgroundColor: colors.choicePressed,
  },
  glyphRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  glyph: {
    color: colors.textDim,
    fontSize: 18,
    fontFamily: fonts.title,
  },
  glyphActive: {
    color: colors.accent,
  },
  label: {
    color: colors.textDim,
    fontFamily: fonts.body,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginTop: 2,
  },
  labelActive: {
    color: colors.accent,
  },
  underline: {
    marginTop: spacing.xs,
    height: 2,
    width: 24,
    backgroundColor: "transparent",
    borderRadius: 1,
  },
  underlineActive: {
    backgroundColor: colors.accent,
  },
  badge: {
    backgroundColor: colors.accentDim,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  badgeText: {
    color: colors.text,
    fontFamily: fonts.body,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
