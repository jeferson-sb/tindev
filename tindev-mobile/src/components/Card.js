import React, { useMemo } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
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
  handleDislike
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
              toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
            }).start(() => {
              handleLike();
              setCurrentIndex(currentIndex + 1);
              position.setValue({ x: 0, y: 0 });
            });
          } else if (gestureState.dx < -120) {
            Animated.spring(position, {
              toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
            }).start(() => {
              setCurrentIndex(currentIndex + 1);
              handleDislike();
              position.setValue({ x: 0, y: 0 });
            });
          } else {
            Animated.spring(position, {
              toValue: { x: 0, y: 0 },
              friction: 4
            }).start();
          }
        }
      }),
    [currentIndex]
  );
  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp'
  });
  const rotateAndTranslate = {
    transform: [
      {
        rotate
      },
      ...position.getTranslateTransform()
    ]
  };
  const likeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp'
  });
  const nopeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp'
  });

  if (parseInt(i) < parseInt(currentIndex)) {
    return null;
  } else if (parseInt(i) === parseInt(currentIndex)) {
    return (
      <Animated.View
        {...panResponder.panHandlers}
        key={_id}
        style={[rotateAndTranslate, styles.animatedCard]}
      >
        <Animated.View
          style={[
            styles.action,
            {
              opacity: likeOpacity,
              left: 40,
              transform: [{ rotate: '-30deg' }]
            }
          ]}
        >
          <Text style={styles.likeText}>LIKE</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.action,
            {
              opacity: nopeOpacity,
              right: 40,
              transform: [{ rotate: '30deg' }]
            }
          ]}
        >
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
          { transform: position.getTranslateTransform() }
        ]}
      >
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

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderColor: '#e9e9e9',
    borderRadius: 20,
    margin: 30,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f4f4f4'
  },
  animatedCard: {
    height: SCREEN_HEIGHT - 120,
    width: SCREEN_WIDTH,
    padding: 10,
    position: 'absolute'
  },
  nextCard: {
    height: SCREEN_HEIGHT - 120,
    width: SCREEN_WIDTH,
    padding: 10,
    position: 'absolute'
  },
  avatar: {
    flex: 1,
    height: 300,
    resizeMode: 'cover'
  },
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  bio: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    lineHeight: 18
  },
  action: {
    position: 'absolute',
    top: 50,
    zIndex: 1000
  },
  likeText: {
    borderWidth: 2,
    borderColor: 'green',
    color: 'green',
    fontSize: 32,
    fontWeight: '900',
    padding: 10,
    paddingHorizontal: 30,
    letterSpacing: 2
  },
  nopeText: {
    borderWidth: 2,
    borderColor: 'red',
    color: 'red',
    fontSize: 32,
    fontWeight: '900',
    padding: 10,
    paddingHorizontal: 30,
    letterSpacing: 2
  }
});
