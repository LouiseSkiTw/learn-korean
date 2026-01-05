import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import FlipCard from 'react-native-flip-card';
import { QuizItem } from '@/app/home/queries/fetchWords';

type QuizPageProps = {
  card: QuizItem;
};

const Card = ({ card }: QuizPageProps) => {
  return (
    <FlipCard
      key={card.id}
      flipHorizontal
      flipVertical={false}
      friction={5}
      perspective={1000}
      style={styles.card}>
      {/* Front side */}
      <View style={styles.face}>
        <Text style={styles.question}>{card.word}</Text>
      </View>

      {/* Back side */}
      <View style={[styles.face, styles.back]}>
        <Text style={styles.answer}>{card.english}</Text>
      </View>
    </FlipCard>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
  },
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
