import { useGame } from "../provider/hook";

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

const Result = () => {
  const { selectedActivity, isShowResults, resetGame, questionType } =
    useGame();

  if (!isShowResults) {
    return null;
  }

  if (!selectedActivity) {
    return null;
  }

  const questions = selectedActivity.questions.filter(
    (question) => "is_correct" in question,
  );

  const roundQuestions = selectedActivity.questions.filter(
    (question) => "round_title" in question,
  );

  if (questionType === "round") {
    return (
      <div className="px-8 pb-16">
        <h2 className="text-4xl font-bold text-blue-500 text-center">
          Results
        </h2>

        <div className="mt-4">
          {roundQuestions.map((question, index) => {
            return (
              <div key={index}>
                <h3 className="text-2xl font-bold text-center text-blue-500">
                  {question.round_title}
                </h3>
                <div className="mt-4">
                  {question.questions.map((question, index) => {
                    const rightAnswer = question.is_correct
                      ? "CORRECT"
                      : "INCORRECT";
                    const isRight =
                      question.user_answers.join("") === rightAnswer;

                    return (
                      <div
                        key={index}
                        className="border-b border-blue-100 py-4"
                      >
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
              </div>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => {
              resetGame();
              window.location.reload();
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
    <div className="px-8 pb-16">
      <h2 className="text-4xl font-bold text-blue-500 text-center">Results</h2>

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
            window.location.reload();
          }}
          className="mt-4 text-blue-500  py-2 px-4 rounded cursor-pointer font-bold"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default Result;
