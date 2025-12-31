import { QuizItem } from '@/utils/quizData';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import SearchBar from './SearchBar';

const SearchPage = ({ data }: { data: QuizItem[] }) => {
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
      <SearchBar handleSearch={handleSearch} value={value} />
      <View style={styles.wordContainer}>
        {value.length > 1 && (
          <FlatList
            data={searchWords}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Text>
                {item.word} - {item.english}
              </Text>
            )}
          />
        )}
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
    borderColor: 'black',
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
