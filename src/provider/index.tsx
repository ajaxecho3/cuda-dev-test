import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  type Activity,
  type Game,
  type Round,
  type SimpleQuestion,
} from "../types";
import { getConfig } from "../api/getGameConfig";
import { GameContext } from "./context";

const gameConfig = await getConfig();

export function GameProvider(props: { children: ReactNode }) {
  const [game, setGame] = useState<Game | null>(null);
  const [isShowResults, setIsShowResults] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null,
  );

  const [questionType, setQuestionType] = useState<"base" | "round" | null>(
    null,
  );

  const [activeRound, setActiveRound] = useState<Round>({} as Round);

  const handleActivitySelect = (activity: Activity) => {
    setSelectedActivity(activity);

    const question = activity.questions[0];
    if ("round_title" in question) {
      setQuestionType("round");
      setActiveRound(question as Round);
    } else {
      setQuestionType("base");
    }
  };

  const handleAnswer = ({
    index,
    answer,
    roundOrder,
  }: {
    index: number;
    answer: string;
    roundOrder?: number;
  }) => {
    const activity = selectedActivity;
    if (roundOrder) {
      const round = activity?.questions.find(
        (question) => question.order === roundOrder,
      ) as Round;
      const question = round.questions[index];
      question.user_answers.push(answer);
    } else {
      if (activity) {
        const question = activity.questions[index] as SimpleQuestion;
        question.user_answers.push(answer);
      }
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
    activeRound,
    setActiveRound,
    isShowResults,
    setIsShowResults,
  };

  return (
    <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
  );
}
