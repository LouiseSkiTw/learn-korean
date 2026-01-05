import { mapDifficulty, categories } from '@/utils/data.utils';
import { useSwipeStore } from '@/utils/store/store';
import { query, collection, where, getDocs } from 'firebase/firestore';
import db from './firebase';
import { Count } from './queries.interface';
import { getCountFromServer } from 'firebase/firestore';

export const countClassificationsByComplexity = async (level: string): Promise<Count[]> => {
  // Build base query depending on level
  console.log(level);
  const baseQuery =
    level === 'all'
      ? query(collection(db, 'words'))
      : query(collection(db, 'words'), where('complexity', '==', mapDifficulty(level)));

  // Build queries for each category
  const queries = categories.map((cat) => {
    if (cat.value === 'all') {
      return { cat, q: baseQuery };
    }
    return { cat, q: query(baseQuery, where('classification', '==', cat.value)) };
  });

  // Run all queries in parallel
  const snapshots = await Promise.all(queries.map(({ q }) => getCountFromServer(q)));

  // Map results back to categories
  const results: Count[] = queries.map(({ cat }, i) => ({
    label: cat.label,
    value: cat.value,
    count: snapshots[i].data().count,
  }));

  return results.filter((item) => item.count > 0);
};
