import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Story } from '../types';
export type RootStackParamList = {
  Home: undefined;
  StoryLibrary: undefined;
  GenerateStory: undefined;
  ReadStory: { content: Story };
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
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
