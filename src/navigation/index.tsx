import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import GenerateStoryScreen from '../screens/GenerateStoryScreen';
import StoryLibraryScreen from '../screens/StoryLibraryScreen';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="GenerateStory"
        component={GenerateStoryScreen}
        options={{ title: 'Create New Story' }}
      />
      <Stack.Screen
        name="StoryLibrary"
        component={StoryLibraryScreen}
        options={{ title: 'My Stories' }}
      />
    </Stack.Navigator>
  );
}
