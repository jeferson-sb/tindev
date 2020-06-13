import React, { useState, useEffect } from 'react';
import { View, Image, TextInput, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import api from '../../services/api';
import logo from '../../assets/logo.png';

export default function Login({ navigation }) {
  const [user, setUser] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(loggedUser => {
      if (loggedUser) {
        navigation.navigate('Main', { user: loggedUser });
      }
    });
  }, []);

  async function handleLogin() {
    try {
      const res = await api.post('/api/devs', { username: user });
      const { _id } = res.data;

      await AsyncStorage.setItem('user', _id);

      navigation.navigate('Main', { user: _id });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Image source={logo} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        placeholderTextColor="#999"
        placeholder="Digite seu usuário no github"
        value={user}
        onChangeText={setUser}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}
