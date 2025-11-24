import React, { useState } from 'react';
import { View, Platform, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Button } from '@/components/ui/button';

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Noun', value: 'noun' },
  { label: 'Verb', value: 'verb' },
  { label: 'Adjective', value: 'adjective' },
  { label: 'Adverb', value: 'adverb' },
  { label: 'Pronoun', value: 'pronoun' },
  { label: 'Place name', value: 'place_name' },
  { label: 'Numeral', value: 'numeral' },
  { label: 'Interjection', value: 'interjection' },
  { label: 'Attributive', value: 'attributive' },
  { label: 'Auxiliary Verb', value: 'auxiliary_verb' },
  { label: 'Expression', value: 'expression' },
  { label: 'Name', value: 'name' },
];

export default function WordSelectionPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const router = useRouter();

  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: Platform.select({ ios: insets.bottom, android: insets.bottom + 24 }),
    left: 12,
    right: 12,
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(value) => setSelectedCategory(value)}>
        {categories.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>

      {/* Button is separated from Select so it always renders */}
      <View style={{ marginTop: 30 }}>
        <Button
          onPress={() =>
            router.push({
              pathname: './quiz',
              params: { category: selectedCategory },
            })
          }>
          <Text>Go to Quiz</Text>
        </Button>
      </View>
    </View>
  );
}
