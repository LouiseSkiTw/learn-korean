import { Button } from '@/components/ui/button';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function Page() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Centered text */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>Lets Learn!</Text>
      </View>

      {/* Button at bottom */}
      <View style={styles.btnContainer}>
        <Button style={styles.button} onPress={() => router.push('/home/select')}>
          <Text style={styles.textBtn}>Learn</Text>
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
    flexDirection: 'column',
    alignItems: 'center',
  },

  btnContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 8,
  },

  text: {
    padding: 10,
    fontSize: 32,
    fontWeight: '700',
  },

  textBtn: {
    padding: 10,
    fontSize: 20,
    fontWeight: '600',
  },

  button: {
    padding: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    height: '33%',
  },
});
