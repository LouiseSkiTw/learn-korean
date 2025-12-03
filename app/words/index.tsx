import { TabsList, TabsTrigger, TabsContent, Tabs } from '@/components/ui/tabs';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import KoreaFlagBackground from '../../components/components/flag';
import useSwipeStore from '../../utils/store/store';

export default function WordsPage() {
  const [value, setValue] = React.useState<string>('known');
  const swipeLeft = useSwipeStore((state) => state.swipedLeft);
  const swipeRight = useSwipeStore((state) => state.swipedRight);
  return (
    <KoreaFlagBackground>
      <View style={styles.container}>
        <Tabs value={value} onValueChange={setValue} className="w-[400px]">
          <TabsList>
            <TabsTrigger value="known">
              <Text>Known Words</Text>
            </TabsTrigger>
            <TabsTrigger value="unknown">
              <Text>Unknown Words</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="known">
            {swipeRight.map((word) => (
              <Text key={word.id}>
                {word.word} - {word.english}
              </Text>
            ))}
          </TabsContent>
          <TabsContent value="unknown">
            {swipeLeft.map((word) => (
              <Text key={word.id}>
                {word.word} - {word.english}
              </Text>
            ))}
          </TabsContent>
        </Tabs>
      </View>
    </KoreaFlagBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
