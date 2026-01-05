import { query, collection, where, getDocs } from 'firebase/firestore';
import db from './firebase';
import { QuizItem } from './queries.interface';
import { shuffleArray } from '@/utils/data.utils';

export const fetchWordsByCategoryAndLevel = async (category: string, level: string) => {
  let q;
  if (category === 'all' && level === 'all') {
    q = query(collection(db, 'words'));
  } else if (category === 'all' && level !== 'all') {
    q = query(collection(db, 'words'), where('complexity', '==', level));
  } else if (category !== 'all' && level === 'all') {
    q = query(collection(db, 'words'), where('classification', '==', category));
  } else {
    q = query(
      collection(db, 'words'),
      where('classification', '==', category),
      where('complexity', '==', level)
    );
  }
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({ firebaseId: doc.id, ...doc.data() }) as QuizItem);

  return shuffleArray(data ?? []);
};
