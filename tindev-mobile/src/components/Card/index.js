import React, { useMemo } from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';

import styles from './styles';
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function Card({
  _id,
  avatar,
  name,
  bio,
  users,
  i,
  currentIndex,
  setCurrentIndex,
  handleLike,
  handleDislike,
}) {
  const position = new Animated.ValueXY();
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove(evt, gestureState) {
          position.setValue({ x: gestureState.dx, y: gestureState.dy });
        },
        onPanResponderRelease: (evt, gestureState) => {
          if (gestureState.dx > 120) {
            Animated.spring(position, {
              toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
            }).start(() => {
              setCurrentIndex(currentIndex + 1);
              handleLike();
              position.setValue({ x: 0, y: 0 });
            });
          } else if (gestureState.dx < -120) {
            Animated.spring(position, {
              toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
            }).start(() => {
              setCurrentIndex(currentIndex + 1);
              handleDislike();
              position.setValue({ x: 0, y: 0 });
            });
          } else {
            Animated.spring(position, {
              toValue: { x: 0, y: 0 },
              friction: 4,
            }).start();
          }
        },
      }),
    [currentIndex, handleLike, handleDislike, position, setCurrentIndex],
  );
  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });
  const rotateAndTranslate = {
    transform: [
      {
        rotate,
      },
      ...position.getTranslateTransform(),
    ],
  };
  const likeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });
  const nopeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });

  if (parseInt(i) < parseInt(currentIndex)) {
    return null;
  } else if (parseInt(i) === parseInt(currentIndex)) {
    return (
      <Animated.View
        {...panResponder.panHandlers}
        key={_id}
        style={[rotateAndTranslate, styles.animatedCard]}>
        <Animated.View
          style={[
            styles.action,
            {
              opacity: likeOpacity,
              left: 40,
              transform: [{ rotate: '-30deg' }],
            },
          ]}>
          <Text style={styles.likeText}>LIKE</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.action,
            {
              opacity: nopeOpacity,
              right: 40,
              transform: [{ rotate: '30deg' }],
            },
          ]}>
          <Text style={styles.nopeText}>NOPE</Text>
        </Animated.View>

        <View key={_id} style={[styles.card, { zIndex: users.length - i }]}>
          <Image style={styles.avatar} source={{ uri: avatar }} />
          <View style={styles.footer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.bio} numberOfLines={3}>
              {' '}
              {bio}
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  } else {
    return (
      <Animated.View
        key={_id}
        style={[
          styles.nextCard,
          { transform: position.getTranslateTransform() },
        ]}>
        <View key={_id} style={[styles.card, { zIndex: users.length - i }]}>
          <Image style={styles.avatar} source={{ uri: avatar }} />
          <View style={styles.footer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.bio} numberOfLines={3}>
              {' '}
              {bio}
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  }
}
