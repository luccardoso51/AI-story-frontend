import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { storyService } from '../services/storyService';
import { Story, StoryInput } from '../types/story';

export function useStories(sortOrder: 'newest' | 'oldest' = 'newest') {
  return useQuery({
    queryKey: ['stories', sortOrder],
    queryFn: async () => {
      const stories = await storyService.listStories();

      // Sort by createdAt date based on sortOrder parameter
      return stories.sort((a, b) => {
        // For oldest first, swap a and b in the comparison
        if (sortOrder === 'oldest') {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        }
        // For newest first (default)
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    }
  });
}

export function useStory(id: string) {
  return useQuery({
    queryKey: ['story', id],
    queryFn: () => storyService.getStory(id)
  });
}

export function useGenerateStory(input: StoryInput) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (input: StoryInput) => storyService.generateStory(input),
    onSuccess: newStory => {
      // Update stories lists in cache for both sort orders
      queryClient.setQueryData<Story[]>(
        ['stories', 'newest'],
        (oldStories = []) => {
          // Add new story at the beginning for newest first
          return [newStory, ...oldStories];
        }
      );

      queryClient.setQueryData<Story[]>(
        ['stories', 'oldest'],
        (oldStories = []) => {
          // Add new story at the end for oldest first
          return [...oldStories, newStory];
        }
      );
    }
  });

  // mutation object includes several loading states:
  const {
    isPending, // same as isLoading
    isSuccess, // true if mutation succeeded
    isError, // true if mutation failed
    error // error object if mutation failed
  } = mutation;

  return mutation;
}
