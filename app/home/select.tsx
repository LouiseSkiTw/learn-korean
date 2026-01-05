import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Button } from '@/components/ui/button';
import { categories, levelCategories } from '../../utils/data.utils';
import { useQuery } from '@tanstack/react-query';
import { countClassificationsByComplexity } from './queries/countClassificationsByComplexity';
import { Count } from './queries/queries.interface';

export default function WordSelectionPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('beginner');
  const router = useRouter();

  const { data: categoriesWithNumbers, isLoading } = useQuery({
    queryKey: ['categories', selectedLevel],
    queryFn: () => countClassificationsByComplexity(selectedLevel), // async function
  });

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <Picker
          style={styles.dropdown}
          selectedValue={selectedLevel}
          onValueChange={(value) => setSelectedLevel(value)}>
          {levelCategories.map((item) => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>
        <Picker
          style={styles.dropdown}
          selectedValue={selectedCategory}
          onValueChange={(value) => setSelectedCategory(value)}>
          {categoriesWithNumbers &&
            categoriesWithNumbers.map((item: Count) => (
              <Picker.Item
                key={item.value}
                label={`${item.label} (${item.count})`}
                value={item.value}
              />
            ))}
          {isLoading &&
            categories.map((item) => (
              <Picker.Item key={item.value} label={`${item.label} (...)`} value={item.value} />
            ))}
        </Picker>
      </View>
      <View>
        <Button
          style={styles.button}
          onPress={() =>
            router.push({
              pathname: './quiz',
              params: { category: selectedCategory, level: selectedLevel },
            })
          }>
          <Text>Go to Quiz</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    justifyContent: 'space-evenly',
    alignContent: 'space-around',
  },

  dropdownContainer: {
    justifyContent: 'center',
  },

  dropdown: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '700',
    height: 75,
  },

  buttonContainer: {
    flex: 1,
  },

  button: {
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    height: '33%',
  },
});
