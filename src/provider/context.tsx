import { createContext } from "react";
import type { Activity, Game } from "../types";

interface GameContextType {
  game: Game | null;
  setGame: (game: Game | null) => void;
  selectedActivity: Activity | null;
  handleActivitySelect: (activity: Activity) => void;
  questionType: "base" | "round" | null;
  handleAnswer: ({ index, answer }: { index: number; answer: string }) => void;
  resetGame: () => void;
}

// Create the context
export const GameContext = createContext<GameContextType | undefined>(
  undefined
);
