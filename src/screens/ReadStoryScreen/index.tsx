import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  View
} from 'react-native';
import { Story } from '../../types';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';

type ReadStoryScreenRouteProp = RouteProp<RootStackParamList, 'ReadStory'>;

interface ReadStoryScreenProps {
  route: ReadStoryScreenRouteProp;
}

const ReadStoryScreen = ({ route }: ReadStoryScreenProps) => {
  const { content } = route.params;

  // Check if there's a cover image available
  const hasCover =
    content.illustrations &&
    Array.isArray(content.illustrations) &&
    content.illustrations.length > 0 &&
    content.illustrations[0]?.url;

  // Render content with background image or white background
  const renderContent = () => (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>{content.title}</Text>
        <Text style={styles.content}>{content.content}</Text>
      </View>
    </ScrollView>
  );

  return hasCover ? (
    <ImageBackground
      source={{ uri: content.illustrations[0].url }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      {renderContent()}
    </ImageBackground>
  ) : (
    <View style={styles.whiteBackground}>{renderContent()}</View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  whiteBackground: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    flexGrow: 1,
    padding: 16
  },
  contentWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  content: {
    fontSize: 16,
    lineHeight: 24
  }
});

export default ReadStoryScreen;
