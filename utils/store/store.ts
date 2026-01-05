// store/swipeStore.ts
import { create } from 'zustand';
import { QuizItem } from '@/app/home/queries/fetchWords';

type SwipeStore = {
  swipedUnknown: QuizItem[];
  swipedKnown: QuizItem[];
  unknownWords: (card: QuizItem) => void;
  knownWords: (card: QuizItem) => void;
  resetSwipes: () => void;
};

const useSwipeStore = create<SwipeStore>((set) => ({
  swipedUnknown: [],
  swipedKnown: [],
  unknownWords: (card: QuizItem) =>
    set((state) => ({
      swipedUnknown: [...state.swipedUnknown, card],
    })),
  knownWords: (card) =>
    set((state) => ({
      swipedKnown: [...state.swipedKnown, card],
    })),
  resetSwipes: () => set({ swipedUnknown: [], swipedKnown: [] }),
}));

export type { SwipeStore };
export { useSwipeStore };
