import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useTheme, ThemeProps } from '../../context/theme';
import { colors } from '../../theme/colors';

// Define props type for HomeScreen
type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const theme = useTheme();
  const style = styles(theme);

  return (
    <View style={style.container}>
      {/* Title at the top */}
      <View style={style.titleContainer}>
        <Text style={style.title}>AI Story Generator</Text>
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
      backgroundColor: colors.cotton,
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
      backgroundColor: theme.colors.almond,
      padding: 15,
      borderRadius: 8,
      alignItems: 'center'
    },
    buttonText: {
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fonts.body,
      color: theme.colors.espresso
    }
  });
