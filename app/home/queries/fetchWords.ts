import { collection, getDocs, query } from 'firebase/firestore';
import db from './firebase';
import { QuizItem } from './queries.interface';

export const fetchWords = async () => {
  const q = query(collection(db, 'words'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as QuizItem);
};
