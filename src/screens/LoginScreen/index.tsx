import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { colors } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenNavigationProp } from '../../types/navigation';
import axios from 'axios';

export function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = () => {
    axios.post('http://localhost:8888/auth/login', form).then(res => {
      const accessToken = res.data.accessToken;
      console.log(accessToken);
    });
  };

  return (
    <View style={styles.container}>
      <Text>Login screen</Text>
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
          />
        </View>
      </View>
      <TouchableOpacity onPress={handleSubmit}>
        <Text>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.almond,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: colors.espresso,
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
  }
});
