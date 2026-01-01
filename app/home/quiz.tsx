import React, { useState, useCallback, useEffect } from 'react';
import Swiper from 'react-native-deck-swiper';

import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import Card from '../../components/components/Card';
import getWords from '../../utils/data.utils';
import { useSwipeStore, SwipeStore } from '../../utils/store/store';
import { ArrowBigLeft } from 'lucide-react-native';
import { QuizItem } from '@/utils/quizData';

export const SwipeCard = () => {
  const { category, level } = useLocalSearchParams<{ category: string; level: string }>();
  const swipeKnown = useSwipeStore((state: SwipeStore) => state.knownWords);
  const swipeUnknown = useSwipeStore((state: SwipeStore) => state.unknownWords);

  const [finished, setFinished] = useState(false);
  const wordsCards = getWords(category, level);

  return (
    <View style={styles.container}>
      {!finished && wordsCards.length > 0 ? (
        <>
          <Swiper
            cards={wordsCards}
            backgroundColor={'#f0f0f0'}
            disableTopSwipe
            disableBottomSwipe
            verticalSwipe={false}
            onSwipedAll={() => setFinished(true)}
            animateOverlayLabelsOpacity
            showSecondCard={false}
            renderCard={(card, index) => <Card key={card.id || index} card={card} />}
            overlayLabels={{
              left: {
                style: { label: styles.overlayLeft, wrapper: styles.overlayWrapperLeft },
              },
              right: {
                style: { label: styles.overlayRight, wrapper: styles.overlayWrapperRight },
              },
            }}
            onSwipedRight={(index) => {
              const card = wordsCards[index];
              if (card) swipeKnown(card);
            }}
            onSwipedLeft={(index) => {
              const card = wordsCards[index];
              if (card) swipeUnknown(card);
            }}
          />
        </>
      ) : (
        <View style={styles.noCards}>
          <ArrowBigLeft onPress={() => router.back()} />
          <Text>No more Words</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  // Icons bar always visible on top
  containerIcons: {
    position: 'absolute',
    top: 30,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',

    zIndex: 10, // ensures icons are above the swiper
  },
  // Swiper fills the background
  swiper: {
    flex: 1,
    zIndex: 0,
  },
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

  noCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
});

export default SwipeCard;
