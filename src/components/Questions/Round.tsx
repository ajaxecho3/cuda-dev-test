import { useEffect, useState } from "react";
import type { Round } from "../../types";
import { useGame } from "../../provider/hook";
import Simple from "./Simple";

const RoundItem = ({ round }: { round: Round }) => {
  const [showQuestion, setShowQuestion] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowQuestion(true);
    }, 2000);

    return () => {
      setShowQuestion(false);
    };
  }, [round]);

  if (!showQuestion) {
    return (
      <div className="px-8 pb-16">
        <h2 className="text-4xl font-bold text-blue-500">
          {round.round_title}
        </h2>
      </div>
    );
  }

  return (
    <Simple questions={round.questions} roundOrder={round.order} isRound />
  );
};

const RoundComponent = () => {
  const { activeRound } = useGame();

  if (!activeRound) {
    return null;
  }
  return <RoundItem round={activeRound} />;
};

export default RoundComponent;
