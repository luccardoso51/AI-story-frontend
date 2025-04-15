import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

// Define props type for HomeScreen
type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text>AI Story Generator</Text>

      {/* Navigation buttons */}
      <TouchableOpacity onPress={() => navigation.navigate('GenerateStory')}>
        <Text>Create New Story</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('StoryLibrary')}>
        <Text>Story Library</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  }
  // ... other styles
});
