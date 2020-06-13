import { StyleSheet, Dimensions } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

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
    backgroundColor: '#f4f4f4',
  },
  animatedCard: {
    height: SCREEN_HEIGHT - 120,
    width: SCREEN_WIDTH,
    padding: 10,
    position: 'absolute',
  },
  nextCard: {
    height: SCREEN_HEIGHT - 120,
    width: SCREEN_WIDTH,
    padding: 10,
    position: 'absolute',
  },
  avatar: {
    flex: 1,
    height: 300,
    resizeMode: 'cover',
  },
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  bio: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    lineHeight: 18,
  },
  action: {
    position: 'absolute',
    top: 50,
    zIndex: 1000,
  },
  likeText: {
    borderWidth: 2,
    borderColor: 'green',
    color: 'green',
    fontSize: 32,
    fontWeight: '900',
    padding: 10,
    paddingHorizontal: 30,
    letterSpacing: 2,
  },
  nopeText: {
    borderWidth: 2,
    borderColor: 'red',
    color: 'red',
    fontSize: 32,
    fontWeight: '900',
    padding: 10,
    paddingHorizontal: 30,
    letterSpacing: 2,
  },
});

export default styles;
