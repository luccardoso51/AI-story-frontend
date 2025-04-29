import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useTheme, ThemeProps } from '../../context/theme';
import { colors } from '../../theme/colors';
import { useStories } from '../../hooks/useStories';

// Define props type for HomeScreen
type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const theme = useTheme();
  const style = styles(theme);
  const { data: stories } = useStories();

  return (
    <View style={style.container}>
      {/* Title at the top */}

      <View style={style.welcomeView}>
        <Text style={style.welcomeText}>Hello, Lucas Cardoso</Text>
      </View>

      <View style={style.latestStoriesContainer}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 10,
            color: theme.colors.cotton,
            paddingHorizontal: 20
          }}
        >
          Your latest stories
        </Text>
        <FlatList
          data={stories?.slice(0, 4)}
          horizontal={true}
          maxToRenderPerBatch={2}
          style={{
            paddingHorizontal: 10
          }}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                  paddingHorizontal: 10
                }}
              >
                <Image
                  source={{ uri: item.illustrations[0].url }}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 16,
                    resizeMode: 'cover'
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    maxWidth: 150,
                    color: theme.colors.cotton,
                    paddingTop: 5
                  }}
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
              </View>
            );
          }}
        />
      </View>

      {/* Navigation buttons in the center */}
      <View style={style.buttonContainer}>
        <TouchableOpacity
          style={style.button}
          onPress={() => navigation.navigate('GenerateStory')}
        >
          <Text style={style.buttonText}>Create New Story</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={style.button}
          onPress={() => navigation.navigate('StoryLibrary')}
        >
          <Text style={style.buttonText}>Story Library</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles for the component
const styles = (theme: ThemeProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.pistachio,
      alignItems: 'center'
    },
    titleContainer: {
      width: '100%',
      alignItems: 'center',
      paddingTop: 60,
      paddingHorizontal: 20,
      marginBottom: 20
    },
    title: {
      fontSize: theme.fontSizes.xl,
      fontFamily: theme.fonts.heading,
      color: theme.colors.bogota,
      textAlign: 'center'
    },
    buttonContainer: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
      paddingHorizontal: 20
    },
    button: {
      width: '70%',
      backgroundColor: theme.colors.bogota,
      borderWidth: 1,
      borderColor: theme.colors.cotton,
      padding: 15,
      borderRadius: 8,
      alignItems: 'center'
    },
    buttonText: {
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fonts.body,
      color: theme.colors.cotton
    },
    welcomeView: {
      width: '100%',
      backgroundColor: colors.pistachio,
      padding: 20
    },
    welcomeText: {
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fonts.body,
      color: theme.colors.espresso
    },
    latestStoriesContainer: {
      width: '100%',
      backgroundColor: colors.iris,
      paddingVertical: 10
    }
  });
