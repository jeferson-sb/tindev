import React from 'react';
import { YellowBox } from 'react-native';
import Routes from './routes';

YellowBox.ignoreWarnings(['Unrecognized WebSocket']);

const App = () => {
  return <Routes />;
};

export default App;
