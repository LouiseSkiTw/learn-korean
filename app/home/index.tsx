import { Button } from '@/components/ui/button';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import KoreaFlagBackground from '../../components/components/flag';

export default function Page() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Lets Learn!</Text>
      </View>
      <View style={styles.btnContainer}>
        <Button onPress={() => router.push('/home/select')}>
          <Text style={styles.btnText}>Learn</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  textContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },

  btnContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: 15,
  },

  text: {
    padding: 10,
    fontSize: 24,
    fontWeight: 700,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 700,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
