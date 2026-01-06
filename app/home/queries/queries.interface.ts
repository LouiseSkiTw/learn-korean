import z from 'zod';

export type Count = {
  label: string;
  value: string;
  count: number;
};

const responseScheme = z.object({
  id: z.string(),
  hiddenNumbering: z.number(),
  frequencyRank: z.string(),
  complexity: z.string(),
  word: z.string(),
  romanised: z.string(),
  classification: z.string(),
  english: z.string(),
});

export type QuizItem = z.infer<typeof responseScheme>;
