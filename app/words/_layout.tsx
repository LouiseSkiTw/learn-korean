import { TabsList, TabsTrigger, TabsContent, Tabs } from '@/components/ui/tabs';
import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSwipeStore } from '../../utils/store/store';
import { Check, X } from 'lucide-react-native';
import DisplayList from '../../components/components/DisplayList';
import { useFocusEffect } from 'expo-router';

export default function WordsPage() {
  const [value, setValue] = React.useState<string>('known');
  const swipeUnknown = useSwipeStore.getState().swipedUnknown;
  const swipeKnown = useSwipeStore.getState().swipedKnown;

  useFocusEffect(
    useCallback(() => {
      setValue('known');
    }, [swipeUnknown, swipeKnown])
  );

  return (
    <View style={styles.container}>
      <Tabs value={value} onValueChange={setValue} style={{ width: 400 }}>
        <TabsList style={styles.tabsList}>
          <TabsTrigger
            value="known"
            style={[
              styles.tabText,
              value === 'known' && styles.activeTab, // add active style
            ]}>
            <Check size={20} color="black" />
            <Text>Known Words</Text>
          </TabsTrigger>
          <TabsTrigger
            value="unknown"
            style={[styles.tabText, value === 'unknown' && styles.activeTab]}>
            <X size={20} color="black" />
            <Text>Unknown Words</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="known">
          <DisplayList data={swipeKnown} />
        </TabsContent>
        <TabsContent value="unknown">
          <DisplayList data={swipeUnknown} />
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
  activeTab: {
    backgroundColor: '#e0e0e0', // highlight color
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
