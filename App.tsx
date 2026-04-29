import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useGame } from "./src/game/store";
import { GameScreen } from "./src/ui/GameScreen";
import { StartScreen } from "./src/ui/StartScreen";

export default function App() {
  const screenMode = useGame((s) => s.screenMode);
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      {screenMode === "menu" ? <StartScreen /> : <GameScreen />}
    </SafeAreaProvider>
  );
}
