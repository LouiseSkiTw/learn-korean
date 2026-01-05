import { fetchWordsByCategoryAndLevel } from '@/app/home/queries/fetchWordsByCategoryAndLevel';
import { useQuery } from '@tanstack/react-query';

export const categories = [
  { label: 'All', value: 'all' },
  { label: 'Noun', value: 'noun' },
  { label: 'Verb', value: 'verb' },
  { label: 'Adjective', value: 'adjective' },
  { label: 'Adverb', value: 'adverb' },
  { label: 'Pronoun', value: 'pronoun' },
  { label: 'Place name', value: 'place name' },
  { label: 'Numeral', value: 'numeral' },
  { label: 'Interjection', value: 'interjection' },
  { label: 'Attributive', value: 'attributive' },
  { label: 'Auxiliary Verb', value: 'auxiliary verb' },
  { label: 'Expression', value: 'expression' },
];

export const levelCategories = [
  { label: 'All', value: 'all' },
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
];

export const mapLevel = (level: string) => {
  switch (level) {
    case 'beginner':
      return 'A';
    case 'intermediate':
      return 'B';
    case 'advanced':
      return 'C';
    default:
      return '';
  }
};

export const mapDifficulty = (level: string) => {
  switch (level) {
    case 'beginner':
      return 'A';
    case 'intermediate':
      return 'B';
    case 'advanced':
      return 'C';
    default:
      return '';
  }
};

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
