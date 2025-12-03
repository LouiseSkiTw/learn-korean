import { Tabs } from 'expo-router';
import { HomeIcon, NotebookText } from 'lucide-react-native';

const isFocused = (focused: boolean) => (focused ? 'red' : 'black');

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 80 },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, focused }) => <HomeIcon color={isFocused(focused)} size={size} />,
        }}
      />
      <Tabs.Screen
        name="words"
        options={{
          title: 'Words',
          tabBarIcon: ({ focused, size }) => (
            <NotebookText color={isFocused(focused)} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
