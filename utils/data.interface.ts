export type QuizItem = {
  id: number;
  hiddenNumbering: number;
  frequencyRank: string;
  complexity: string;
  word: string;
  romanised: string;
  classification: string;
  english: string;
};

export type Count = {
  label: string;
  value: string;
  counts: number;
};
