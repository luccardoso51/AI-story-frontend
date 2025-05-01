import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';
import {
  RouteProp,
  useNavigation,
  useIsFocused
} from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { Audio } from 'expo-av';
import { colors } from '../../theme/colors';

type ReadStoryScreenRouteProp = RouteProp<RootStackParamList, 'ReadStory'>;

interface ReadStoryScreenProps {
  route: ReadStoryScreenRouteProp;
}

const ReadStoryScreen = ({ route }: ReadStoryScreenProps) => {
  const { content } = route.params;
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // Cleanup function to stop and unload sound
  const stopAndUnloadSound = async () => {
    try {
      if (sound) {
        console.log('Stopping and unloading sound');
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error stopping sound:', error);
    }
  };

  // Monitor focus changes - stop sound when screen is not focused
  useEffect(() => {
    if (!isFocused && sound) {
      console.log('Screen lost focus, stopping sound');
      stopAndUnloadSound();
    }
  }, [isFocused]);

  // Monitor navigation state changes
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      if (sound) {
        console.log('Navigation event: beforeRemove, stopping sound');
        stopAndUnloadSound();
      }
    });

    return unsubscribe;
  }, [navigation, sound]);

  // Clean up when content ID changes (different story)
  useEffect(() => {
    return () => {
      console.log('Content changed or component unmounting, cleaning up');
      stopAndUnloadSound();
    };
  }, [content.id]);

  // Handle hardware back button and app state changes
  useEffect(() => {
    const handleAppStateChange = async (nextAppState: string) => {
      if (nextAppState !== 'active' && sound) {
        console.log('App state changed, stopping sound');
        await stopAndUnloadSound();
      }
    };

    // Set up listener for app state
    const subscription = Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false, // Don't play in background
      shouldDuckAndroid: true
    });

    return () => {
      // Clean up on unmount
      stopAndUnloadSound();
    };
  }, []);

  async function playSound() {
    try {
      // If there's already a sound playing, stop it first
      if (sound) {
        await stopAndUnloadSound();
      }

      console.log('Loading Sound from URL:', content.audio?.url);

      if (!content.audio?.url) {
        console.error('Audio URL is undefined or null');
        Alert.alert('Error', 'Audio file not available');
        return;
      }

      // Request audio permissions first
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Audio permissions are required to play the story'
        );
        return;
      }

      // Set audio mode
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false, // Changed to false to stop when app is in background
        shouldDuckAndroid: true
      });

      const { sound: newSound } = await Audio.Sound.createAsync(
        {
          uri: content.audio.url
        },
        { shouldPlay: true },
        status => {
          if ('isLoaded' in status && status.isLoaded) {
            setIsPlaying(status.isPlaying);

            // When sound finishes playing naturally
            if (!status.isPlaying && status.didJustFinish) {
              console.log('Sound finished playing naturally');
              setIsPlaying(false);
            }
          } else {
            setIsPlaying(false);
          }
        }
      );

      setSound(newSound);
      console.log('Playing Sound');

      const playbackStatus = await newSound.playAsync();
      console.log('Playback started with status:', playbackStatus);
    } catch (error) {
      console.error('Error playing sound:', error);
      Alert.alert('Playback Error', 'Could not play the audio file');
    }
  }

  async function stopSound() {
    if (sound) {
      await stopAndUnloadSound();
    }
  }

  // Render content with background image or white background
  const renderContent = () => (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>{content.title}</Text>

        {content.audio && (
          <TouchableOpacity
            onPress={isPlaying ? stopSound : playSound}
            style={styles.audioButton}
          >
            <Text style={styles.audioButtonText}>
              {isPlaying ? 'Stop Audio' : 'Listen to Story'}
            </Text>
          </TouchableOpacity>
        )}
        <Text style={styles.content}>{content.content}</Text>
      </View>
    </ScrollView>
  );

  // Check if there's a cover image available
  const hasCover =
    content.illustrations &&
    Array.isArray(content.illustrations) &&
    content.illustrations.length > 0 &&
    content.illustrations[0]?.url;

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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    textAlign: 'center',
    color: 'white',
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
    textShadowColor: 'rgba(255, 255, 255, 0.9)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1
  },
  audioButton: {
    backgroundColor: colors.iris,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16
  },
  audioButtonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default ReadStoryScreen;
