# The Odyssey

A choice-driven retelling of Homer's *Odyssey* for Android, built with Expo
and React Native.

You play Odysseus after the fall of Troy. Choose how to handle the Cyclops,
the song of the Sirens, the witch Circe, the suitors in your own hall —
and try to bring your crew home to Ithaca.

## Stack

- Expo SDK 54 / React Native 0.81 (new architecture enabled)
- Zustand for state, persisted via AsyncStorage
- EAS Build + EAS Update for distribution

## Project layout

```
src/
  game/        story, types, persistence, figures registry
  ui/          screens, tab bar, theme, image maps
assets/
  locations/   full-resolution scene PNGs (~1.5 MB each)
  figures/     480px JPG thumbnails for the Figures tab
scripts/
  generate-images.mjs       regenerate scene art via Replicate
  generate-thumbnails.mjs   regenerate figure thumbs via sharp-cli
```

## Local development

```bash
npm install
npm start            # Expo dev server
npm run android      # boot on an Android emulator/device
```

## Releases

```bash
npm run build:dev    # internal APK for sideloading
npm run build:prod   # production AAB for the Play Store

npm run update:dev  -- --message "..."   # OTA push to dev channel
npm run update:prod -- --message "..."   # OTA push to production channel
```

OTA updates only apply to builds with a matching `runtimeVersion`
(`appVersion` policy). Bumping `version` in `app.json` requires a fresh
native build.

## Privacy

See [PRIVACY.md](./PRIVACY.md).
