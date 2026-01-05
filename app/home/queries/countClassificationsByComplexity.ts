import { mapDifficulty, categories } from '@/utils/data.utils';
import { useSwipeStore } from '@/utils/store/store';
import { query, collection, where, getDocs } from 'firebase/firestore';
import db from './firebase';
import { Count, QuizItem } from './queries.interface';

export const countClassificationsByComplexity = async (level: string): Promise<Count[]> => {
  const swipedKnown = useSwipeStore.getState().swipedKnown;

  // Build base query
  const baseQuery =
    level === 'All'
      ? collection(db, 'words')
      : query(collection(db, 'words'), where('complkm,exity', '==', mapDifficulty(level)));

  // Fetch all docs once
  const snapshot = await getDocs(baseQuery);

  // Convert to items and filter out known words
  const items: QuizItem[] = snapshot.docs
    .map((doc) => ({ firebaseId: doc.id, ...doc.data() }) as QuizItem)
    .filter((item) => !swipedKnown.includes(item.firebaseId));

  // Count frequencies by classification
  const counts = items.reduce(
    (acc, item) => {
      acc[item.classification] = (acc[item.classification] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Map counts to categories
  return categories
    .map((cat) => ({
      label: cat.label,
      value: cat.value,
      count: cat.value === 'all' ? items.length : counts[cat.value] || 0,
    }))
    .filter((item) => item.count > 0);
};
