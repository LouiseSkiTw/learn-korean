import { Button } from '@/components/ui/button';
import { QuizItem } from '@/utils/quizData';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

type DisplayListProps = {
  data: QuizItem[];
};

const DisplayList = ({ data }: DisplayListProps) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {data.length > 0 &&
        data.map((word) => (
          <Text key={word.id}>
            {word.word} - {word.english}
          </Text>
        ))}
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
  container: { marginTop: 20, margin: 30, justifyContent: 'center' },
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
