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
    <Tabs value={value} onValueChange={setValue} className="w-[400px]">
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
          <Button onPress={() => router.push('/select')}>Learn</Button>
        </View>
      </TabsContent>
      <TabsContent value="words">
        <WordBank />
      </TabsContent>
    </Tabs>
  );
}

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Button
      onPressIn={toggleColorScheme}
      size="icon"
      variant="ghost"
      className="ios:size-9 rounded-full web:mx-4">
      <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
    </Button>
  );
}
