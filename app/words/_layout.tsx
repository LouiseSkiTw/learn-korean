import { TabsList, TabsTrigger, TabsContent, Tabs } from '@/components/ui/tabs';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSwipeStore } from '../../utils/store/store';
import { Check, X } from 'lucide-react-native';
import DisplayList from './DisplayList';

export default function WordsPage() {
  const [value, setValue] = React.useState<string>('known');
  const swipeLeft = useSwipeStore((state) => state.swipedLeft);
  const swipeRight = useSwipeStore((state) => state.swipedRight);
  return (
    <View style={styles.container}>
      <Tabs value={value} onValueChange={setValue} className="w-[400px]">
        <TabsList style={styles.tabsList}>
          <TabsTrigger value="known" style={styles.tabText}>
            <Check style={{ height: 20, width: 20 }} />
            <Text>Known Words</Text>
          </TabsTrigger>
          <TabsTrigger value="unknown" style={styles.tabText}>
            <X style={{ height: 20, width: 20 }} />
            <Text>Unknown Words</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="known">
          <DisplayList data={swipeRight} />
        </TabsContent>
        <TabsContent value="unknown">
          <DisplayList data={swipeLeft} />
        </TabsContent>
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  tabsList: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tabText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
});
