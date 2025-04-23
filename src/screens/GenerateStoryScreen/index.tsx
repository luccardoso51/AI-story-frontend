import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { useGenerateStory } from '../../hooks/useStories';
import { useNavigation } from '@react-navigation/native';
import { StoryInput, GenerateStoryScreenNavigationProp } from '../../types';
import { ThemeProps, useTheme } from '../../context/theme';

// Define age range options
const AGE_RANGES = ['3-5 years', '6-8 years', '9-12 years'];

export default function GenerateStoryScreen() {
  const navigation = useNavigation<GenerateStoryScreenNavigationProp>();

  // Form state
  const [form, setForm] = useState<StoryInput>({
    title: '',
    ageRange: '',
    characters: [],
    setting: ''
  });

  // New character input state
  const [newCharacter, setNewCharacter] = useState('');

  // Get mutation and loading state
  const generateStory = useGenerateStory(form);
  const { isPending } = generateStory;

  // Handle form submission
  const handleSubmit = async () => {
    await generateStory.mutateAsync(form);
    navigation.navigate('StoryLibrary');
  };

  // Handle adding a new character
  const handleAddCharacter = () => {
    if (newCharacter.trim()) {
      setForm(prev => ({
        ...prev,
        characters: [...prev.characters, newCharacter.trim()]
      }));
      setNewCharacter('');
    }
  };

  // Handle removing a character
  const handleRemoveCharacter = (index: number) => {
    setForm(prev => ({
      ...prev,
      characters: prev.characters.filter((_, i) => i !== index)
    }));
  };

  const theme = useTheme();
  const style = styles(theme);

  return (
    <ScrollView style={style.container}>
      {/* Title Input */}
      <View style={style.inputContainer}>
        <Text style={style.label}>Story Title</Text>
        <TextInput
          style={style.input}
          value={form.title}
          onChangeText={text => setForm(prev => ({ ...prev, title: text }))}
          placeholder="Enter a title for your story"
          editable={!isPending}
        />
      </View>

      {/* Age Range Selection */}
      <View style={style.inputContainer}>
        <Text style={style.label}>Age Range</Text>
        <View style={style.ageRangeContainer}>
          {AGE_RANGES.map(age => (
            <TouchableOpacity
              key={age}
              style={[
                style.ageRangeButton,
                form.ageRange === age && style.ageRangeButtonSelected
              ]}
              onPress={() => setForm(prev => ({ ...prev, ageRange: age }))}
              disabled={isPending}
            >
              <Text
                style={[
                  style.ageRangeText,
                  form.ageRange === age && style.ageRangeTextSelected
                ]}
              >
                {age}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Characters Input */}
      <View style={style.inputContainer}>
        <Text style={style.label}>Characters</Text>
        <View style={style.characterInputContainer}>
          <TextInput
            style={[style.input, style.characterInput]}
            value={newCharacter}
            onChangeText={setNewCharacter}
            placeholder="Add a character"
            editable={!isPending}
          />
          <TouchableOpacity
            style={style.addButton}
            onPress={handleAddCharacter}
            disabled={isPending || !newCharacter.trim()}
          >
            <Text style={style.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Character List */}
        <View style={style.characterList}>
          {form.characters.map((character, index) => (
            <View key={index} style={style.characterChip}>
              <Text style={style.characterChipText}>{character}</Text>
              <TouchableOpacity
                onPress={() => handleRemoveCharacter(index)}
                disabled={isPending}
              >
                <Text style={style.removeCharacter}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Settings Input */}
      <View style={style.inputContainer}>
        <Text style={style.label}>Story Setting</Text>
        <TextInput
          style={[style.input, style.settingsInput]}
          value={form.setting}
          onChangeText={text => setForm(prev => ({ ...prev, setting: text }))}
          placeholder="Describe the story setting"
          multiline
          numberOfLines={4}
          editable={!isPending}
        />
      </View>

      {/* Generate Button */}
      <TouchableOpacity
        style={[
          style.generateButton,
          isPending && style.generateButtonDisabled
        ]}
        onPress={handleSubmit}
        disabled={isPending}
      >
        <Text style={style.generateButtonText}>
          {isPending ? 'Generating Story...' : 'Generate Story'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = (theme: ThemeProps) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16
    },
    inputContainer: {
      marginBottom: 20
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 8,
      color: '#333'
    },
    input: {
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 12,
      borderWidth: 1,
      borderColor: '#ddd',
      fontSize: 16
    },
    ageRangeContainer: {
      flexDirection: 'row',
      gap: 8
    },
    ageRangeButton: {
      padding: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ddd',
      backgroundColor: 'white'
    },
    ageRangeButtonSelected: {
      backgroundColor: theme.colors.bogota,
      borderColor: 'white'
    },
    ageRangeText: {
      color: '#333'
    },
    ageRangeTextSelected: {
      color: 'white'
    },
    characterInputContainer: {
      flexDirection: 'row',
      gap: 8
    },
    characterInput: {
      flex: 1
    },
    addButton: {
      backgroundColor: theme.colors.bogota,
      padding: 12,
      borderRadius: 8,
      justifyContent: 'center'
    },
    addButtonText: {
      color: 'white',
      fontWeight: '600'
    },
    characterList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 8
    },
    characterChip: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.bogota,
      borderRadius: 16,
      paddingVertical: 4,
      paddingHorizontal: 12,
      gap: 4
    },
    characterChipText: {
      fontSize: 14
    },
    removeCharacter: {
      fontSize: 18,
      color: '#666',
      marginLeft: 4
    },
    settingsInput: {
      height: 100,
      textAlignVertical: 'top'
    },
    generateButton: {
      backgroundColor: theme.colors.bogota,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20
    },
    generateButtonDisabled: {
      backgroundColor: '#99c9ff'
    },
    generateButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600'
    }
  });
