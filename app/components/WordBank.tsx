import { Text } from '@/components/ui/text';
import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useSwipeStore from '../store/store';

export default function WordBank() {
  const [value, setValue] = React.useState<string>('known');
  const swipeLeft = useSwipeStore((state) => state.swipedLeft);
  const swipeRight = useSwipeStore((state) => state.swipedRight);
  return (
    <Tabs value={value} onValueChange={setValue} className="w-[400px]">
      <TabsList>
        <TabsTrigger value="known">
          <Text>Known</Text>
        </TabsTrigger>
        <TabsTrigger value="unknown">
          <Text>Unknown</Text>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="known">
        {swipeRight.map((word) => (
          <Text>
            {word.word} - {word.english}
          </Text>
        ))}
      </TabsContent>
      <TabsContent value="unknown">
        {swipeLeft.map((word) => (
          <Text>
            {word.word} - {word.english}
          </Text>
        ))}
      </TabsContent>
    </Tabs>
  );
}
