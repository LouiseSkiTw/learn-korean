// store/swipeStore.ts
import { create } from 'zustand';
import { QuizItem } from '../quizData';
export type SwipeStore = {
  swipedLeft: QuizItem[];
  swipedRight: QuizItem[];
  swipeLeft: (card: QuizItem) => void;
  swipeRight: (card: QuizItem) => void;
  resetSwipes: () => void;
};

export const useSwipeStore = create<SwipeStore>((set) => ({
  swipedLeft: [],
  swipedRight: [],
  swipeLeft: (card: QuizItem) =>
    set((state) => ({
      swipedLeft: [...state.swipedLeft, card],
    })),
  swipeRight: (card) =>
    set((state) => ({
      swipedRight: [...state.swipedRight, card],
    })),
  resetSwipes: () => set({ swipedLeft: [], swipedRight: [] }),
}));
