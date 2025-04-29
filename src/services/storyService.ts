import axios from 'axios';
import { Story, StoryInput } from '../types/story';

// It might be better to move the API instance to a separate file for better organization and reusability.
const api = axios.create({
  baseURL: 'http://localhost:8888',
  headers: {
    'Content-Type': 'application/json'
  }
});

// API functions
export const storyService = {
  // Get all stories
  listStories: async (): Promise<Story[]> => {
    const response = await api.get('/stories');
    return response.data;
  },

  // Get single story
  getStory: async (id: string): Promise<Story> => {
    const response = await api.get(`/stories/${id}`);
    return response.data;
  },

  // Generate new story
  generateStory: async (input: StoryInput): Promise<Story> => {
    const response = await api.post('/stories/generate-story', input);
    return response.data;
  },

  generateStoryCover: async (id: string): Promise<Story> => {
    const response = await api.post(`/illustrations/cover/${id}`);
    return response.data;
  },

  createStoryData: async (input: StoryInput): Promise<Story> => {
    const response = await api.post('/stories', input);
    return response.data;
  },

  deleteStory: async (id: string): Promise<void> => {
    const response = await api.delete(`/stories/${id}`);

    return response.data;
  }
};
