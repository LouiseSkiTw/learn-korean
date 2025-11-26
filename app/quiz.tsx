import React from 'react';
import Swiper from 'react-native-deck-swiper';

import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import Card from './components/Card';
import data from './quizData';
import useSwipeStore, { SwipeStore } from './store/store';

export const SwipeCard = () => {
  const { category } = useLocalSearchParams<{ category: string }>();
  const swipeRight = useSwipeStore((state: SwipeStore) => state.swipeRight);
  const swipeLeft = useSwipeStore((state: SwipeStore) => state.swipeLeft);
  const swipedLeft = useSwipeStore((state: SwipeStore) => state.swipedLeft);
  const filteredData =
    category === 'all'
      ? data
      : data
          .filter((data) => data.classification === category)
          .filter((item) => !swipedLeft.includes(item));

  function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  const randomWords = shuffleArray(filteredData);

  return (
    <Swiper
      cards={randomWords}
      backgroundColor={'#f0f0f0'}
      disableTopSwipe
      disableBottomSwipe
      verticalSwipe={false}
      animateOverlayLabelsOpacity
      onSwipedAll={() => (
        <View>
          <Text>No more cards to display</Text>
        </View>
      )}
      showSecondCard
      renderCard={(card) => <Card card={card} />}
      overlayLabels={{
        left: {
          style: {
            label: styles.overlayLeft,
            wrapper: styles.overlayWrapperLeft,
          },
        },
        right: {
          style: {
            label: styles.overlayRight,
            wrapper: styles.overlayWrapperRight,
          },
        },
      }}
      onSwipedRight={(index) => {
        const card = randomWords.at(index);
        if (card) swipeRight(card);
      }}
      onSwipedLeft={(index) => {
        const card = randomWords.at(index);
        if (card) swipeLeft(card);
      }}
    />
  );
};

const styles = StyleSheet.create({
  overlayLeft: {
    backgroundColor: 'rgba(255,0,0,0.7)',
    borderRadius: 8,
    width: '65%',
    height: '100%',
  },
  overlayRight: {
    backgroundColor: 'rgba(0,255,0,0.5)',
    borderRadius: 8,
    width: '65%',
    height: '100%',
  },
  overlayWrapperLeft: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  overlayWrapperRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});

export default SwipeCard;
