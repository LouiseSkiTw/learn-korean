import { Button } from '@/components/ui/button';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useState } from 'react';
import SearchBar from './SearchBar';
import { QuizItem } from '@/utils/data.interface';

type DisplayListProps = {
  data: QuizItem[];
};

const DisplayList = ({ data }: DisplayListProps) => {
  const [displayWords, setDisplayWords] = useState<QuizItem[]>(data);
  const [value, setValue] = useState('');
  const router = useRouter();

  const handleSearch = (text: string) => {
    setValue(text);
    const filteredWords = data.filter(
      (word) =>
        word.word.toLowerCase().includes(text.toLowerCase()) ||
        word.english.toLowerCase().includes(text.toLowerCase())
    );
    setDisplayWords(filteredWords);
  };
  return (
    <View>
      {data.length > 0 && (
        <View style={styles.itemContainer}>
          <SearchBar handleSearch={handleSearch} value={value} />
          <FlatList
            style={styles.wordContainer}
            data={displayWords}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Text>
                {item.word} - {item.english}
              </Text>
            )}
          />
        </View>
      )}
      {data.length === 0 && (
        <View style={styles.container}>
          <Text>No words to display.</Text>
          <View style={styles.btnContainer}>
            <Button style={styles.button} onPress={() => router.push('/home/select')}>
              <Text style={styles.textBtn}>Ready to Learn</Text>
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: { marginTop: 20, margin: 30, justifyContent: 'center', gap: 10 },
  itemContainer: {
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 5,
  },
  btnContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 8,
  },
  wordContainer: {
    padding: 10,
    borderBottomColor: 'gray',
    overflow: 'scroll',
    borderBottomWidth: 1,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    width: '90%',
    gap: 5,
  },
  button: {
    padding: 5,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtn: {
    padding: 10,
    fontSize: 20,
    fontWeight: '500',
  },
});
export default DisplayList;
