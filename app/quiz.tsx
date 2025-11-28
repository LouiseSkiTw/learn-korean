import React, { useState } from 'react';
import Swiper from 'react-native-deck-swiper';

import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import Card from './components/Card';
import useSwipeStore, { SwipeStore } from './store/store';
import { getWords } from './utils/data.utils';
import { Home, List } from 'lucide-react-native';

export const SwipeCard = () => {
  const { category, level } = useLocalSearchParams<{ category: string; level: string }>();
  const swipeRight = useSwipeStore((state: SwipeStore) => state.swipeRight);
  const swipeLeft = useSwipeStore((state: SwipeStore) => state.swipeLeft);

  const [finished, setFinished] = useState(false);
  const router = useRouter();

  const wordsCards = getWords(category, level);

  return (
    <View style={styles.container}>
      <View style={styles.containerIcons}>
        <Home
          size={25}
          onPress={() =>
            router.push({
              pathname: '/home',
              params: { route: 'home' },
            })
          }
        />
        <List
          size={25}
          onPress={() =>
            router.push({
              pathname: '/home',
              params: { route: 'words' },
            })
          }
        />
      </View>

      {!finished || wordsCards.length > 0 ? (
        <>
          <Swiper
            cards={wordsCards}
            backgroundColor={'#f0f0f0'}
            disableTopSwipe
            disableBottomSwipe
            verticalSwipe={false}
            animateOverlayLabelsOpacity
            onSwipedAll={() => setFinished(true)}
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
              const card = wordsCards.at(index);
              if (card) swipeRight(card);
            }}
            onSwipedLeft={(index) => {
              const card = wordsCards.at(index);
              if (card) swipeLeft(card);
            }}
          />
        </>
      ) : (
        <View>
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
});

export default SwipeCard;
