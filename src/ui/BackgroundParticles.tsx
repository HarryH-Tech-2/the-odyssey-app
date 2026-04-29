import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";
import { colors } from "./theme";

/**
 * Slow drifting motes behind the game UI — sea-spray / oil-lamp ember feel.
 * Pure React Native Animated so we don't pull in extra deps. Uses the native
 * driver so the loops keep running smoothly even while the JS thread is busy.
 */

const PARTICLE_COUNT = 28;

type Particle = {
  startX: number; // 0..1 (fraction of screen width)
  size: number;
  driftPx: number; // total vertical travel
  durationMs: number;
  delayMs: number;
  opacity: number;
  swayPx: number; // horizontal wobble amplitude
};

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function makeParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    startX: Math.random(),
    size: rand(2, 5),
    driftPx: rand(120, 320),
    durationMs: rand(18000, 32000),
    delayMs: rand(0, 20000),
    opacity: rand(0.18, 0.45),
    swayPx: rand(8, 28),
  }));
}

export function BackgroundParticles() {
  const { width: W, height: H } = Dimensions.get("window");
  // Snapshot particles once so they don't reshuffle on re-render.
  const particles = useMemo(() => makeParticles(), []);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {particles.map((p, i) => (
        <Mote key={i} particle={p} screenW={W} screenH={H} />
      ))}
    </View>
  );
}

function Mote({
  particle,
  screenW,
  screenH,
}: {
  particle: Particle;
  screenW: number;
  screenH: number;
}) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(particle.delayMs),
        Animated.timing(progress, {
          toValue: 1,
          duration: particle.durationMs,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [particle.delayMs, particle.durationMs, progress]);

  // Vertical drift: bottom of screen → above the top.
  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [screenH + particle.size, -particle.driftPx],
  });

  // Gentle horizontal sway (sinusoidal-ish via 5-stop interpolation).
  const translateX = progress.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, particle.swayPx, 0, -particle.swayPx, 0],
  });

  // Soft fade in then out so particles don't pop on/off.
  const opacity = progress.interpolate({
    inputRange: [0, 0.15, 0.85, 1],
    outputRange: [0, particle.opacity, particle.opacity, 0],
  });

  const left = particle.startX * screenW;

  return (
    <Animated.View
      style={[
        styles.mote,
        {
          left,
          width: particle.size,
          height: particle.size,
          borderRadius: particle.size / 2,
          opacity,
          transform: [{ translateY }, { translateX }],
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  mote: {
    position: "absolute",
    top: 0,
    backgroundColor: colors.accent, // bronze / oil-lamp gold
    // Soft glow via shadow (iOS) — Android ignores shadow* but the dot still
    // reads as a warm mote against the deep night-sea background.
    shadowColor: colors.accent,
    shadowOpacity: 0.6,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
  },
});
