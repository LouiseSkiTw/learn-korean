import React, { useState, useCallback } from 'react';
import Swiper from 'react-native-deck-swiper';

import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import Card from '../../components/components/Card';
import getWords from '../../utils/data.utils';
import { useSwipeStore, SwipeStore } from '../../utils/store/store';
import { ArrowBigLeft } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';

export const SwipeCard = () => {
  const { category, level } = useLocalSearchParams<{ category: string; level: string }>();
  const swipeKnown = useSwipeStore((state: SwipeStore) => state.knownWords);
  const swipeUnknown = useSwipeStore((state: SwipeStore) => state.unknownWords);

  const [finished, setFinished] = useState(false);
  const wordsCards = getWords(category, level);
  const [swipedIndices, setSwipedIndices] = useState(new Set<number>());

  const activeIndices = wordsCards.map((_, i) => i).filter((i) => !swipedIndices.has(i));
  const activeCards = activeIndices.map((i) => wordsCards[i]);

  useFocusEffect(
    useCallback(() => {
      setSwipedIndices(new Set<number>());
      setFinished(false);
    }, [])
  );

  return (
    <View style={styles.container}>
      {!finished && activeCards.length > 0 ? (
        <>
          <Swiper
            cards={activeCards}
            backgroundColor={'#f0f0f0'}
            disableTopSwipe
            disableBottomSwipe
            verticalSwipe={false}
            animateOverlayLabelsOpacity
            onSwipedAll={() => setFinished(true)}
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
              const originalIndex = activeIndices[index];
              const card = wordsCards[originalIndex];
              if (card) swipeKnown(card);
              setSwipedIndices((prev) => new Set(prev).add(originalIndex));
            }}
            onSwipedLeft={(index) => {
              const originalIndex = activeIndices[index];
              const card = wordsCards[originalIndex];
              if (card) swipeUnknown(card);
              setSwipedIndices((prev) => new Set(prev).add(originalIndex));
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
