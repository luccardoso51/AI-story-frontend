import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ActivityIndicator
} from 'react-native';
import { colors } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenNavigationProp } from '../../types/navigation';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');

  const handleSubmit = () => {
    try {
      setIsLoading(true);
      axios
        .post('http://localhost:8888/auth/login', form)
        .then(res => {
          const accessToken = res.data.accessToken;
          AsyncStorage.setItem('accessToken', accessToken);
          if (accessToken) {
            setIsLoading(false);

            navigation.navigate('MainStack');
          } else {
            setError('Invalid credentials');
          }
        })
        .catch(error => {
          setError('Invalid credentials');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/logo-story-craft.png')}
          style={styles.logo}
        />
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Text>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={form.email}
              onChangeText={text => setForm({ ...form, email: text })}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={form.password}
              onChangeText={text => {
                setForm({ ...form, password: text });
              }}
              secureTextEntry={true}
            />
          </View>
        </View>
        {error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.loginButtonText}>Enter</Text>
          )}
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cotton,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: colors.bogota,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 5
  },
  inputContainer: {
    width: '100%',
    gap: 10
  },
  inputWrapper: {
    width: '100%'
  },
  error: {
    color: 'red'
  },
  loginButton: {
    width: '100%',
    height: 40,
    backgroundColor: colors.bogota,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  loginButtonText: {
    color: 'white'
  }
});
