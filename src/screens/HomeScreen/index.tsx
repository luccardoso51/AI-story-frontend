import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useTheme, ThemeProps } from '../../context/theme';
import { colors } from '../../theme/colors';
import { useStories } from '../../hooks/useStories';
import { FontAwesome, AntDesign, Feather } from '@expo/vector-icons';

// Define props type for HomeScreen
type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const theme = useTheme();
  const style = styles(theme);
  const { data: stories } = useStories();

  return (
    <SafeAreaView style={style.container}>
      <ScrollView style={style.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header with decorative elements */}

        <View style={style.welcomeView}>
          <Image
            source={require('../../assets/images/logo-story-craft.png')}
            style={{ width: 125, height: 125, alignSelf: 'center' }}
          />
          <Text style={style.welcomeText}>Hello, Lucas Cardoso</Text>
          <View style={style.welcomeBanner}>
            <Text style={style.welcomeBannerText}>
              ✨ Unleash your imagination with magical stories! ✨
            </Text>
          </View>
        </View>

        <View style={style.latestStoriesContainer}>
          <Text style={style.sectionTitle}>Your latest stories</Text>
          <FlatList
            data={stories?.slice(0, 6)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              <View style={style.emptyListContainer}>
                <Text style={style.emptyListText}>No stories yet</Text>
                <Text style={style.emptyListSubtext}>
                  Create your first magical story!
                </Text>
              </View>
            }
            maxToRenderPerBatch={2}
            style={style.storiesList}
            renderItem={({ item }) => {
              // Check if illustrations exist and have valid data
              const hasValidImage =
                item.illustrations &&
                Array.isArray(item.illustrations) &&
                item.illustrations.length > 0 &&
                item.illustrations[0]?.url;

              return (
                <TouchableOpacity
                  style={style.storyCard}
                  onPress={() =>
                    navigation.navigate('ReadStory', { content: item })
                  }
                >
                  {hasValidImage ? (
                    <Image
                      source={{ uri: item.illustrations[0].url }}
                      style={style.storyImage}
                    />
                  ) : (
                    <View style={style.placeholderImage}>
                      <Text style={style.placeholderText}>No image</Text>
                    </View>
                  )}
                  <Text style={style.storyTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <View style={style.buttonContainer}>
          <TouchableOpacity
            style={[style.button, style.createButton]}
            onPress={() => navigation.navigate('GenerateStory')}
          >
            <AntDesign
              name="plus"
              size={24}
              color={theme.colors.almond}
              style={style.buttonIcon}
            />
            <Text style={style.buttonText}>Create New Story</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[style.button, style.libraryButton]}
            onPress={() => navigation.navigate('StoryLibrary')}
          >
            <FontAwesome
              name="book"
              size={22}
              color={theme.colors.espresso}
              style={style.buttonIcon}
            />
            <Text style={[style.buttonText, style.libraryButtonText]}>
              Story Library
            </Text>
          </TouchableOpacity>
        </View>

        <View style={style.footer}>
          <Text style={style.footerText}>
            Made with <Feather name="heart" size={12} color="#ff6b6b" /> for
            young dreamers
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles for the component
const styles = (theme: ThemeProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.pistachio
    },
    scrollView: {
      flex: 1
    },
    headerDecoration: {
      width: '100%',
      overflow: 'hidden',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30
    },
    headerImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover'
    },
    welcomeView: {
      width: '100%',
      backgroundColor: colors.pistachio,
      padding: 20,
      marginTop: -20
    },
    welcomeText: {
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fonts.body,
      color: theme.colors.espresso,
      fontWeight: 'bold',
      marginBottom: 5
    },
    latestStoriesContainer: {
      width: '100%',
      backgroundColor: colors.almond,
      paddingVertical: 20,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      marginTop: 10
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
      color: theme.colors.espresso,
      paddingHorizontal: 20
    },
    storiesList: {
      paddingHorizontal: 10
    },
    storyCard: {
      padding: 10,
      alignItems: 'center',
      width: 160
    },
    storyImage: {
      width: 150,
      height: 150,
      borderRadius: 16,
      resizeMode: 'cover',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3
    },
    placeholderImage: {
      width: 150,
      height: 150,
      borderRadius: 16,
      backgroundColor: '#f0f0f0',
      justifyContent: 'center',
      alignItems: 'center'
    },
    placeholderText: {
      color: '#666'
    },
    storyTitle: {
      fontSize: 14,
      maxWidth: 150,
      color: theme.colors.espresso,
      paddingTop: 8,
      fontWeight: '600'
    },
    emptyListContainer: {
      padding: 20,
      alignItems: 'center'
    },
    emptyListText: {
      color: theme.colors.espresso,
      fontSize: 16,
      fontWeight: 'bold'
    },
    emptyListSubtext: {
      color: theme.colors.cotton,
      opacity: 0.7,
      marginTop: 5
    },
    welcomeBanner: {
      width: '100%',
      alignItems: 'center',
      marginVertical: 10,
      justifyContent: 'center',
      backgroundColor: colors.almond,
      borderRadius: 16,
      paddingVertical: 15,
      paddingHorizontal: 20,
      shadowColor: theme.colors.espresso,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 6
    },
    welcomeBannerText: {
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fonts.body,
      color: theme.colors.bogota,
      textAlign: 'center'
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
      paddingHorizontal: 20,
      paddingVertical: 25,
      backgroundColor: colors.almond
    },
    button: {
      width: '100%',
      backgroundColor: theme.colors.espresso,
      padding: 15,
      shadowColor: theme.colors.espresso,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderRadius: 16,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center'
    },
    createButton: {
      backgroundColor: colors.bogota
    },
    libraryButton: {
      backgroundColor: theme.colors.almond
    },
    buttonText: {
      fontSize: theme.fontSizes.md,
      fontFamily: theme.fonts.body,
      color: theme.colors.almond,
      fontWeight: 'bold'
    },
    buttonIcon: {
      width: 24,
      height: 24,
      marginRight: 10
    },
    libraryButtonText: {
      color: theme.colors.espresso
    },
    footer: {
      width: '100%',
      padding: 15,
      alignItems: 'center',
      backgroundColor: colors.espresso
    },
    footerText: {
      color: theme.colors.cotton,
      opacity: 0.7,
      fontSize: 12
    }
  });
