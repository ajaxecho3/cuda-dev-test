import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { type Activity, type Game, type SimpleQuestion } from "../types";
import { getConfig } from "../api/getGameConfig";
import { GameContext } from "./context";

const gameConfig = await getConfig();

export function GameProvider(props: { children: ReactNode }) {
  const [game, setGame] = useState<Game | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );

  const [questionType, setQuestionType] = useState<"base" | "round" | null>(
    null
  );

  const handleActivitySelect = (activity: Activity) => {
    setSelectedActivity(activity);

    const question = activity.questions[0];
    if ("round_title" in question) {
      setQuestionType("round");
    } else {
      setQuestionType("base");
    }
  };

  const handleAnswer = ({
    index,
    answer,
  }: {
    index: number;
    answer: string;
  }) => {
    const activity = selectedActivity;
    if (activity) {
      const question = activity.questions[index] as SimpleQuestion;
      question.user_answers.push(answer);
    }
  };

  const resetGame = () => {
    setSelectedActivity(null);
    setQuestionType(null);
  };

  useEffect(() => {
    setGame(gameConfig);
  }, []);

  const value = {
    game,
    setGame,
    selectedActivity,
    handleActivitySelect,
    questionType,
    handleAnswer,
    resetGame,
  };

  return (
    <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
  );
}
