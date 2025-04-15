export interface Story {
  id: string;
  title: string;
  content: string;
  ageRange: string;
  author: string;
  userId: string;
  characters: string[];
  settings: string;
  createdAt: string;
  illustrations: Illustration[];
}

export interface StoryInput {
  title: string;
  ageRange: string;
  characters: string[];
  setting: string;
}

export interface Illustration {
  id: string;
  url: string;
  type: string;
  sequence: number;
  storyId: string;
  story: Story;
  createdAt: string;
}
