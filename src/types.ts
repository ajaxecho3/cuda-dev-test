export interface BaseQuestion {
  is_correct: boolean;
  stimulus: string;
  order: number;
  user_answers: string[];
  feedback: string;
}

export type SimpleQuestion = BaseQuestion;

export interface Round {
  round_title: string;
  order: number;
  questions: SimpleQuestion[];
}

export type Question = SimpleQuestion | Round;

export interface Activity {
  activity_name: string;
  order: number;
  questions: Question[];
}

export interface Game {
  name: string;
  heading: string;
  activities: Activity[];
}
