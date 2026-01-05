import { collection, getCountFromServer, getDocs, query, where } from 'firebase/firestore';
import z from 'zod';
import { db } from './firebase';
import { categories, mapDifficulty } from '@/utils/data.utils';
import { useSwipeStore } from '@/utils/store/store';

export const responseScheme = z.object({
  firebaseId: z.string(),
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

export async function fetchWordsByCategoryAndLevel(category: string, level: string) {
  let q;
  if (category === 'All' && level === 'All') {
    q = query(collection(db, 'words'));
  } else if (category === 'All' && level !== 'All') {
    q = query(collection(db, 'words'), where('complexity', '==', level));
  } else if (category !== 'All' && level === 'All') {
    q = query(collection(db, 'words'), where('classification', '==', category));
  } else {
    q = query(
      collection(db, 'words'),
      where('classification', '==', category),
      where('complexity', '==', level)
    );
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ firebaseId: doc.id, ...doc.data() }) as QuizItem);
}

export async function fetchWords() {
  const q = query(collection(db, 'words'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as QuizItem);
}

export async function countClassificationsByComplexity(level: string) {
  const swipedKnown = useSwipeStore.getState().swipedKnown; // access store outside React

  let q;
  if (level === 'All') {
    q = query(collection(db, 'words'));
  } else {
    q = query(collection(db, 'words'), where('complexity', '==', mapDifficulty(level)));
  }

  // Fetch documents
  const snapshot = await getDocs(q);

  console.log('snapshot', { snapshot });

  // Filter out known words
  const filter: QuizItem[] = snapshot.docs
    .map((doc) => ({ firebaseId: doc.id, ...doc.data() }) as QuizItem)
    .filter((item) => !swipedKnown.includes(item));

  // Count frequencies by classification
  const counts = filter.reduce(
    (acc, item) => {
      const classification = item.classification;
      acc[classification] = (acc[classification] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Map counts to categories list, excluding those with 0 count
  const coutLabel = categories.map((cat) => ({
    label: cat.label,
    value: cat.value,
    count: cat.value === 'all' ? filter.length : counts[cat.value] || 0,
  }));

  return coutLabel;
}
