import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NavigationTabs from './NavigationTabs';

const Navigation = () => {
  return (
    <NavigationContainer>
      <NavigationTabs />
    </NavigationContainer>
  );
};

export default Navigation;
