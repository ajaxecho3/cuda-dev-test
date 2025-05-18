import { createContext } from "react";
import type { Activity, Game, Round } from "../types";

interface GameContextType {
  game: Game | null;
  setGame: (game: Game | null) => void;
  selectedActivity: Activity | null;
  handleActivitySelect: (activity: Activity) => void;
  questionType: "base" | "round" | null;
  handleAnswer: ({
    index,
    answer,
    roundOrder,
  }: {
    index: number;
    answer: string;
    roundOrder?: number;
  }) => void;
  resetGame: () => void;
  activeRound: Round | null;
  setActiveRound: (round: Round) => void;
  isShowResults: boolean;
  setIsShowResults: (isShowResults: boolean) => void;
}

// Create the context
export const GameContext = createContext<GameContextType | undefined>(
  undefined
);
