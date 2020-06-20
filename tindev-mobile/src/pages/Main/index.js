import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {
  SafeAreaView,
  Image,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Card from '../../components/Card';
import styles from './styles';
import api from '../../services/api';

import logo from '../../assets/logo.png';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import itsamatch from '../../assets/itsamatch.png';

export default function Main({ navigation, route }) {
  const id = route.params.user;
  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function loadUsers() {
      const res = await api.get('/api/devs', {
        headers: { user_id: id },
      });
      setUsers(res.data);
    }
    loadUsers();
  }, [id]);

  useEffect(() => {
    const socket = io('http://192.168.0.10:3333', {
      query: { user: id },
    });

    socket.on('match', dev => {
      setMatchDev(dev);
    });
  }, [id]);

  const handleLike = async () => {
    const [user, ...rest] = users;

    await api.post(`/api/devs/${user._id}/likes`, null, {
      headers: { user_id: id },
    });
    setUsers(rest);
  };
  const handleDislike = async () => {
    const [user, ...rest] = users;

    await api.post(`/api/devs/${user._id}/dislikes`, null, {
      headers: { user_id: id },
    });
    setUsers(rest);
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity>

      <View style={styles.cardsContainer}>
        {users.length === 0 ? (
          <Text style={styles.empty}>Acabou :( </Text>
        ) : (
          users
            .map((user, index) => (
              <Card
                key={index}
                {...user}
                users={users}
                i={index}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                handleLike={handleLike}
                handleDislike={handleDislike}
              />
            ))
            .reverse()
        )}
      </View>

      {users.length > 0 && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleDislike}>
            <Image source={dislike} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLike}>
            <Image source={like} />
          </TouchableOpacity>
        </View>
      )}

      {matchDev && (
        <View style={styles.matchContainer}>
          <Image style={styles.matchImage} source={itsamatch} />
          <Image style={styles.matchAvatar} source={{ uri: matchDev.avatar }} />
          <Text style={styles.matchName}>{matchDev.name}</Text>
          <Text style={styles.matchBio}>{matchDev.bio}</Text>
          <TouchableOpacity onPress={() => setMatchDev(null)}>
            <Text style={styles.closeMatch}>FECHAR</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
