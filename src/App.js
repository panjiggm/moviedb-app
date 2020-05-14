import React from 'react';
import {StatusBar} from 'react-native';
import Navigation from './navigation';
import {Provider} from 'react-native-paper';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Provider>
        <Navigation />
      </Provider>
    </>
  );
};

export default App;
