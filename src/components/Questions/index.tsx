import type { Question, SimpleQuestion, Round } from "../../types";
import { useGame } from "../../provider/hook";
import Simple from "./Simple";
import RoundComponent from "./Round";

type Props = {
  questions: Question[];
};

export default function Questions({ questions }: Props) {
  const { questionType } = useGame();
  if (!questions) {
    return null;
  }

  if (questionType === "base") {
    return <Simple questions={questions as SimpleQuestion[]} />;
  }

  return <RoundComponent questions={questions as Round[]} />;
}
