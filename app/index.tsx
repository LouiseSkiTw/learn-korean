import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { MoonStarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { View } from 'react-native';
import WordBank from './components/WordBank';

export default function Screen() {
  const [value, setValue] = React.useState('home');
  const router = useRouter();

  return (
    <Tabs value={value} onValueChange={setValue} className="mt-10 w-[400px] pl-4 pr-3">
      <TabsList>
        <TabsTrigger value="home">
          <Text>Home</Text>
        </TabsTrigger>
        <TabsTrigger value="words">
          <Text>Word Bank</Text>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="home">
        <View>
          <Text>Lets Learn!</Text>
          <Button onPress={() => router.push('/select')}>
            <Text>Learn</Text>
          </Button>
        </View>
      </TabsContent>
      <TabsContent value="words">
        <WordBank />
      </TabsContent>
    </Tabs>
  );
}
