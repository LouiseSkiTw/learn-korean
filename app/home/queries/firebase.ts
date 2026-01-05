import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAERKEoNXnuWPr6la_hfowy708Y0pJhhYU',
  authDomain: 'learnkorean-ba1d8.firebaseapp.com',
  projectId: 'learnkorean-ba1d8',
  storageBucket: 'learnkorean-ba1d8.firebasestorage.app',
  messagingSenderId: '611967867768',
  appId: '1:611967867768:web:6261672573f0bab59f068d',
  measurementId: 'G-5RF77GVLTJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
