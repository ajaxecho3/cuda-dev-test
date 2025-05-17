import React, { Fragment, useTransition } from "react";
import type { SimpleQuestion } from "../../types";
import { useGame } from "../../provider/hook";

type Props = {
  questions: SimpleQuestion[];
};

function wrapAsterisks(text: string, className: string = "text-blue-500") {
  const parts = text.split(/(\*[^*]+\*)/); // Split by asterisks

  return parts.map((part, index) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      const content = part.slice(1, -1); // Remove asterisks
      return (
        <span key={index} className={className}>
          {content}
        </span>
      );
    }
    return part;
  });
}

const Simple = ({ questions }: Props) => {
  console.log(questions);
  const { handleAnswer, resetGame } = useGame();
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [isPending, startTransition] = useTransition();

  const handleClick = (index: number, answer: string) => {
    startTransition(() => {
      setActiveIndex(() => index + 1);
      handleAnswer({ index, answer });
    });
  };

  if (activeIndex >= questions.length) {
    return (
      <div className="px-8 pb-16">
        <h2 className="text-4xl font-bold text-blue-500">Results</h2>

        <div className="mt-4">
          {questions.map((question, index) => {
            const rightAnswer = question.is_correct ? "CORRECT" : "INCORRECT";
            const isRight = question.user_answers.join("") === rightAnswer;

            return (
              <div key={index} className="border-b border-blue-100 py-4">
                <h3 className="text-lg font-bold">
                  Q{index + 1}: {wrapAsterisks(question.stimulus)}
                </h3>
                <p className="text-gray-700">
                  Your answer is{" "}
                  {isRight ? (
                    <span className="text-green-500">CORRECT</span>
                  ) : (
                    <span className="text-red-500">INCORRECT</span>
                  )}
                </p>
                {!isRight && (
                  <p className="text-gray-700">
                    Feedback: {wrapAsterisks(question.feedback)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => {
              resetGame();
              setActiveIndex(0);
            }}
            className="mt-4 text-blue-500  py-2 px-4 rounded cursor-pointer font-bold"
          >
            Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      {questions.map((question, index) => {
        return (
          <Fragment key={index}>
            {activeIndex === index && (
              <div key={index}>
                <div className="px-8 pb-16">
                  <h2 className="text-4xl font-bold text-blue-500">
                    Q{index + 1}.
                  </h2>
                </div>

                <div className="border-t border-blue-100 py-6 text-center">
                  <p className="text-gray-700 text-lg">
                    {wrapAsterisks(
                      question.stimulus,
                      "text-blue-500 font-bold"
                    )}
                  </p>
                </div>

                <div className="border-t border-blue-100 py-4 flex">
                  <button
                    disabled={isPending}
                    onClick={() => handleClick(index, "CORRECT")}
                    className="w-1/2 text-blue-500 py-2 text-center"
                  >
                    CORRECT
                  </button>
                  <button
                    disabled={isPending}
                    onClick={() => handleClick(index, "INCORRECT")}
                    className="w-1/2 text-blue-500 py-2 text-center disabled:cursor-not-allowed disabled:text-gray-400 disabled:bg-gray-100 "
                  >
                    INCORRECT
                  </button>
                </div>
              </div>
            )}
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default Simple;
