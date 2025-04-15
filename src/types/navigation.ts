import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  StoryLibrary: undefined;
  GenerateStory: undefined;
  StoryDetails: { storyId: string };
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

export type StoryDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'StoryDetails'
>;
