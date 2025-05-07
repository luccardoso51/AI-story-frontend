import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Story } from '../types';
export type RootStackParamList = {
  MainStack: undefined;
  Home: undefined;
  StoryLibrary: undefined;
  GenerateStory: undefined;
  ReadStory: { content: Story };
  Login: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MainStack'
>;

export type GenerateStoryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'GenerateStory'
>;

export type StoryLibraryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'StoryLibrary'
>;

export type ReadStoryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ReadStory'
>;

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;
