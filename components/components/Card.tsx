import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import FlipCard from 'react-native-flip-card';
import { QuizItem } from '../../utils/quizData';
import { useFlippedStore } from '@/utils/store/store';

type QuizPageProps = {
  card: QuizItem;
};

const Card = ({ card }: QuizPageProps) => {
  const isFlipped = useFlippedStore((state) => state.isFlipped);
  const setIsFlipped = useFlippedStore((state) => state.setIsFlipped);
  const [flip, setFlip] = useState(false);

  const onClickFlip = (flip: boolean) => {
    setFlip(flip);
    setIsFlipped(flip);
  };

  return (
    <FlipCard
      flip={flip || isFlipped}
      flipHorizontal
      flipVertical={false}
      friction={5}
      perspective={1000}
      style={styles.card}>
      {/* Front side */}
      <View style={styles.face}>
        <Text style={styles.question} onPress={() => onClickFlip(true)}>
          {card.word}
        </Text>
      </View>
      {/* Back side */}
      <View style={[styles.face, styles.back]}>
        <Text style={styles.answer} onPress={() => onClickFlip(false)}>
          {card.english}
        </Text>
      </View>
    </FlipCard>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5, // Android shadow
    bottom: 30,
  },
  face: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  back: {
    backgroundColor: '#fafafa',
  },
  question: {
    //word
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 40,
  },
  answer: {
    //english
    fontSize: 32,
    color: '#333',
    textAlign: 'center',
    padding: 30,
    flexWrap: 'wrap',
  },
});

export default Card;
