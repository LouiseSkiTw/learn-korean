import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import FlipCard from 'react-native-flip-card';
import { QuizItem } from '../quizData';

type QuizPageProps = {
  card: QuizItem;
};

const Card = ({ card }: QuizPageProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [card]);

  return (
    <FlipCard
      flipHorizontal
      flipVertical={false}
      flip={isFlipped}
      clickable={false}
      friction={5}
      perspective={1000}
      style={styles.card}>
      {/* Front side */}
      <View style={styles.face}>
        <Text style={styles.question} onPress={() => setIsFlipped(true)}>
          {card.word}
        </Text>
      </View>
      {/* Back side */}
      <View style={[styles.face, styles.back]}>
        <Text style={styles.answer} onPress={() => setIsFlipped(false)}>
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
  },
  answer: {
    //english
    fontSize: 32,
    color: '#333',
    textAlign: 'center',
  },
});

export default Card;
