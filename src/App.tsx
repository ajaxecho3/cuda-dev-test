import Questions from "./components/Questions";
import Result from "./components/Result";
import { useGame } from "./provider/hook";

function App() {
  const {
    game,
    handleActivitySelect,
    selectedActivity,
    questionType,
    activeRound,
    isShowResults,
  } = useGame();

  if (isShowResults) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="w-full max-w-2xl mx-auto">
          <div className="overflow-hidden">
            <div className="flex items-center justify-center min-h-screen bg-blue-50">
              <div className="w-full max-w-2xl">
                <div className="bg-white border border-blue-100">
                  <div className="px-8 py-8">
                    <p className="text-blue-500 text-xl font-bold">
                      {selectedActivity?.activity_name}{" "}
                      {questionType === "round" &&
                        `/ ${activeRound && activeRound.round_title}`}
                    </p>
                  </div>
                  <Result />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="w-full max-w-2xl mx-auto">
        {selectedActivity ? (
          <div className="overflow-hidden">
            <div className="flex items-center justify-center min-h-screen bg-blue-50">
              <div className="w-full max-w-2xl">
                <div className="bg-white border border-blue-100">
                  <div className="px-8 py-8">
                    <p className="text-blue-500 text-xl font-bold">
                      {selectedActivity.activity_name}{" "}
                      {questionType === "round" &&
                        `/ ${activeRound && activeRound.round_title}`}
                    </p>
                  </div>
                  <Questions questions={selectedActivity.questions} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden bg-white border border-blue-100  shadow-sm">
            <div className="p-6 text-center">
              <p className="text-blue-500 text-sm font-medium mb-4">
                {game?.heading}
              </p>
              <h1 className="text-3xl font-bold text-blue-500 mb-6">
                {game?.name}
              </h1>
            </div>

            {game?.activities.map((activity) => (
              <button
                key={activity.order}
                onClick={() => handleActivitySelect(activity)}
                className="w-full text-blue-500  border-t border-blue-100 p-4 text-center hover:bg-blue-50 transition-colors cursor-pointer"
              >
                {activity.activity_name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
