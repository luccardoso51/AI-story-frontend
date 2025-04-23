import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import { useStories } from '../../hooks/useStories';
import { useState } from 'react';
import { Story } from '../../types';

export default function StoryLibraryScreen() {
  // State for sort order
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // State to track image loading errors
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Use the hook with sort order
  const { data: stories, isLoading, error } = useStories(sortOrder);

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(current => (current === 'newest' ? 'oldest' : 'newest'));
  };

  // Handle image error
  const handleImageError = (id: string, errorMsg: string) => {
    console.error(`Image error for ${id}:`, errorMsg);
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading stories...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error loading stories!</Text>
        <Text>{error.toString()}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Sort toggle button */}
      <TouchableOpacity style={styles.sortButton} onPress={toggleSortOrder}>
        <Text style={styles.sortButtonText}>
          Sort: {sortOrder === 'newest' ? 'Newest first' : 'Oldest first'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={stories}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.storyCard}>
            <Text style={styles.storyTitle}>{item.title}</Text>

            {/* Check if illustrations exist and are in the correct format */}
            {!item.illustrations ||
            !Array.isArray(item.illustrations) ||
            item.illustrations.length === 0 ? (
              <View style={[styles.storyImage, styles.noImage]}>
                <Text>No images available</Text>
              </View>
            ) : (
              item.illustrations.map((illustration, index) => {
                // Skip if URL is missing or invalid
                if (!illustration || !illustration.url) {
                  return (
                    <View
                      key={`missing-${item.id}-${index}`}
                      style={[styles.storyImage, styles.noImage]}
                    >
                      <Text>Invalid image data</Text>
                    </View>
                  );
                }

                const uniqueKey =
                  illustration.id || `${item.id}-illustration-${index}`;

                return (
                  <View key={uniqueKey} style={styles.imageContainer}>
                    {imageErrors[uniqueKey] ? (
                      <View style={[styles.storyImage, styles.noImage]}>
                        <Text>Error loading image</Text>
                        <Text style={styles.imageUrl}>{illustration.url}</Text>
                      </View>
                    ) : (
                      <View>
                        <Image
                          source={{ uri: illustration.url }}
                          style={styles.storyImage}
                          onError={e =>
                            handleImageError(uniqueKey, e.nativeEvent.error)
                          }
                        />
                        <Text style={styles.imageUrl}>{illustration.url}</Text>
                      </View>
                    )}
                  </View>
                );
              })
            )}

            <Text style={styles.storyDetail}>Age Range: {item.ageRange}</Text>
            <Text style={styles.storyContent}>{item.content}</Text>
            <Text style={styles.storyDate}>
              Created: {new Date(item.createdAt).toLocaleString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  sortButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center'
  },
  sortButtonText: {
    color: 'white',
    fontWeight: '600'
  },
  storyCard: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12
  },
  imageContainer: {
    marginVertical: 8
  },
  storyImage: {
    width: '100%',
    height: 500,
    borderRadius: 8,
    backgroundColor: '#f0f0f0'
  },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },
  imageUrl: {
    fontSize: 10,
    color: '#666',
    marginTop: 4
  },
  storyDetail: {
    fontSize: 14,
    color: '#666',
    marginTop: 8
  },
  storyContent: {
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20
  },
  storyDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'right'
  }
});
