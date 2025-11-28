import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';
import WordBank from './components/WordBank';

export default function Home() {
  const { route } = useLocalSearchParams<{ route: string }>();

  const homeTab = !!route ? route : 'home';
  const [value, setValue] = React.useState(homeTab);

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
        <View className="flex">
          <View className="bg-red h-full items-center justify-evenly">
            <Text className="p-10 text-4xl font-bold">Lets Learn!</Text>
            <Button className="flex w-[100px]" onPress={() => router.push('/select')}>
              <Text className="items-center text-2xl">Learn</Text>
            </Button>
          </View>
        </View>
      </TabsContent>
      <TabsContent value="words">
        <WordBank />
      </TabsContent>
    </Tabs>
  );
}
