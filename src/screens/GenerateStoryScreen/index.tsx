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

  return (
    <ScrollView style={styles.container}>
      {/* Title Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Story Title</Text>
        <TextInput
          style={styles.input}
          value={form.title}
          onChangeText={text => setForm(prev => ({ ...prev, title: text }))}
          placeholder="Enter a title for your story"
          editable={!isPending}
        />
      </View>

      {/* Age Range Selection */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age Range</Text>
        <View style={styles.ageRangeContainer}>
          {AGE_RANGES.map(age => (
            <TouchableOpacity
              key={age}
              style={[
                styles.ageRangeButton,
                form.ageRange === age && styles.ageRangeButtonSelected
              ]}
              onPress={() => setForm(prev => ({ ...prev, ageRange: age }))}
              disabled={isPending}
            >
              <Text
                style={[
                  styles.ageRangeText,
                  form.ageRange === age && styles.ageRangeTextSelected
                ]}
              >
                {age}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Characters Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Characters</Text>
        <View style={styles.characterInputContainer}>
          <TextInput
            style={[styles.input, styles.characterInput]}
            value={newCharacter}
            onChangeText={setNewCharacter}
            placeholder="Add a character"
            editable={!isPending}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddCharacter}
            disabled={isPending || !newCharacter.trim()}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Character List */}
        <View style={styles.characterList}>
          {form.characters.map((character, index) => (
            <View key={index} style={styles.characterChip}>
              <Text style={styles.characterChipText}>{character}</Text>
              <TouchableOpacity
                onPress={() => handleRemoveCharacter(index)}
                disabled={isPending}
              >
                <Text style={styles.removeCharacter}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Settings Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Story Setting</Text>
        <TextInput
          style={[styles.input, styles.settingsInput]}
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
          styles.generateButton,
          isPending && styles.generateButtonDisabled
        ]}
        onPress={handleSubmit}
        disabled={isPending}
      >
        <Text style={styles.generateButtonText}>
          {isPending ? 'Generating Story...' : 'Generate Story'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5'
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
    backgroundColor: '#007AFF',
    borderColor: '#007AFF'
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
    backgroundColor: '#007AFF',
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
    backgroundColor: '#e1e1e1',
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
    backgroundColor: '#007AFF',
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
