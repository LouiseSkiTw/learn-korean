import data, { QuizItem } from '@/utils/quizData';
import { SearchIcon } from 'lucide-react-native';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const SearchPage = () => {
  const [value, setValue] = useState('');
  const [searchWords, setSearchWords] = useState<QuizItem[]>(data);

  const handleSearch = (text: string) => {
    setValue(text);
    const filteredWords = data.filter(
      (word) =>
        word.word.toLowerCase().startsWith(text.toLowerCase()) ||
        word.english.toLowerCase().startsWith(text.toLowerCase())
    );
    setSearchWords(filteredWords);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchIcon />
        <TextInput
          placeholder="Search..."
          style={styles.searchInput}
          onChangeText={handleSearch}
          value={value}
        />
      </View>
      <View style={styles.wordContainer}>
        {value.length > 0 &&
          searchWords.map((word) => (
            <View key={word.id} style={styles.result}>
              <Text>
                {word.word} - {word.english}
              </Text>
            </View>
          ))}
      </View>
    </View>
  );
};
export default SearchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 5,
  },
  searchInput: {
    height: 40,
    width: '90%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    width: '90%',
  },
  wordContainer: {
    padding: 10,
    borderBottomColor: 'gray',
    overflow: 'scroll',
    borderBottomWidth: 1,
    width: '90%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    gap: 5,
  },

  result: {},
});
