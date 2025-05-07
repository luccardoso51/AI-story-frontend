import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import GenerateStoryScreen from '../screens/GenerateStoryScreen';
import StoryLibraryScreen from '../screens/StoryLibraryScreen';
import { RootStackParamList } from '../types/navigation';
import ReadStoryScreen from '../screens/ReadStoryScreen';
import { Ionicons } from '@expo/vector-icons';
import { LoginScreen } from '../screens/LoginScreen';
const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? 'book' : 'book-outline'}
                size={size}
                color={color}
              />
            );
          }
        }}
      />
      <Tab.Screen
        name="GenerateStory"
        component={GenerateStoryScreen}
        options={{
          title: 'Create New Story',
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? 'create' : 'create-outline'}
                size={size}
                color={color}
              />
            );
          }
        }}
      />
      <Tab.Screen
        name="StoryLibrary"
        component={StoryLibraryScreen}
        options={{
          title: 'My Stories',
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? 'library' : 'library-outline'}
                size={size}
                color={color}
              />
            );
          }
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainStack"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReadStory"
        component={ReadStoryScreen as React.ComponentType<any>}
        options={{ title: 'Read Story' }}
      />
    </Stack.Navigator>
  );
}
