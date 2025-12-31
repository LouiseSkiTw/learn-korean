import { Button } from '@/components/ui/button';
import { QuizItem } from '@/utils/quizData';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Search from '../../app/search/_layout';
import SearchPage from '@/components/components/Search';
import { useState } from 'react';
import { SearchIcon } from 'lucide-react-native';

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
    <View style={styles.container}>
      {data.length > 0 && (
        <View>
          <View>
            <SearchIcon />
            <TextInput placeholder="Search..." value={value} onChangeText={handleSearch} />
          </View>
          {displayWords.map((word) => (
            <View key={word.id}>
              <Text>
                {word.word} - {word.english}
              </Text>
            </View>
          ))}
        </View>
      )}
      {data.length === 0 && (
        <View>
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
  btnContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 8,
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
