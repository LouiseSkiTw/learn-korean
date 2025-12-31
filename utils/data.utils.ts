import { QuizItem } from './quizData';
import data from './quizData';
import { useSwipeStore, SwipeStore } from './store/store';

const categories = [
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

const getWords = (category: string, level: string) => {
  const swipedLeft = useSwipeStore((state: SwipeStore) => state.swipedLeft);

  const filteredData =
    category === 'all'
      ? data
      : data
          .filter((data) => data.classification === category)
          .filter((item) => !swipedLeft.includes(item));

  const getWordsLevel = level === 'all' ? filteredData : mapLevel(level, filteredData);

  return shuffleArray(getWordsLevel ?? []);
};

export const getNumber = (level: string) => {
  // Count frequencies
  const filter =
    level === 'all' ? data : data.filter((item) => item.complexity == mapDifficulty(level));

  const counts = filter.reduce(
    (acc, item) => {
      acc[item.classification] = (acc[item.classification] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Map counts to categories list
  const coutLabel = categories.map((cat) => ({
    label: cat.label,
    value: cat.value,
    count: cat.value === 'all' ? filter.length : counts[cat.value] || 0,
  }));

  return coutLabel;
};

const mapLevel = (level: string, filteredData: QuizItem[] | undefined) => {
  switch (level) {
    case 'beginner':
      return filteredData?.filter((data) => data.complexity === 'A');
    case 'intermediate':
      return filteredData?.filter((data) => data.complexity === 'B');
    case 'advanced':
      return filteredData?.filter((data) => data.complexity === 'C');
    default:
      break;
  }
};

const mapDifficulty = (level: string) => {
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

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
export default getWords;
