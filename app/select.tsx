import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Button } from '@/components/ui/button';
import { useColorScheme } from 'nativewind';
import { getNumber } from './utils/data.utils';

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Noun', value: 'noun' },
  { label: 'Verb', value: 'verb' },
  { label: 'Adjective', value: 'adjective' },
  { label: 'Adverb', value: 'adverb' },
  { label: 'Pronoun', value: 'pronoun' },
  { label: 'Place name', value: 'place name' },
  { label: 'Numeral', value: 'numeral' },
  { label: 'Interjection', value: 'interjection' },
  { label: 'Attributive', value: 'attributive' },
  { label: 'Auxiliary Verb', value: 'auxiliary verb' },
  { label: 'Expression', value: 'expression' },
];
const levelCategories = [
  { label: 'All', value: 'all' },
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
];

export default function WordSelectionPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('beginner');
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const categoriesWithNumbers = getNumber(categories);

  const isDarkTheme = colorScheme === 'dark';

  return (
    <View style={{ flex: 1, padding: 20, marginTop: 20 }}>
      <Picker
        dropdownIconColor={isDarkTheme ? 'white' : ''}
        selectionColor={isDarkTheme ? 'white' : ''}
        style={isDarkTheme ? { color: 'white' } : ''}
        selectedValue={selectedCategory}
        onValueChange={(value) => setSelectedCategory(value)}>
        {categoriesWithNumbers.map((item) => (
          <Picker.Item
            key={item.value}
            label={`${item.label} (${item.count})`}
            value={item.value}
          />
        ))}
      </Picker>
      <Picker
        dropdownIconColor={isDarkTheme ? 'white' : ''}
        selectionColor={isDarkTheme ? 'white' : ''}
        style={isDarkTheme ? { color: 'white' } : ''}
        selectedValue={selectedLevel}
        onValueChange={(value) => setSelectedLevel(value)}>
        {levelCategories.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>

      {/* Button is separated from Select so it always renders */}
      <View style={{ marginTop: 30 }}>
        <Button
          style={!isDarkTheme ? {} : ''}
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
