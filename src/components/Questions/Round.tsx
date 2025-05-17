import { Fragment } from "react";
import type { Round } from "../../types";

type Props = {
  questions: Round[];
};

const RoundComponent = ({ questions }: Props) => {
  return (
    <Fragment>
      {questions.map((round, index) => {
        return (
          <div key={index}>
            <div className="px-8 pb-16">
              <h2 className="text-4xl font-bold text-blue-500">
                {round.round_title}
              </h2>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default RoundComponent;
