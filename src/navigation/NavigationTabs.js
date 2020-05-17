import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import MovieStack from './MovieStack';
import TvStack from './TvStack';
import {white, darkBlue, blue, pink} from '../utils/colors';

const Tabs = createBottomTabNavigator();

const NavigationTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let iconName;

          if (route.name === 'Movies') {
            iconName = 'film';
          } else if (route.name === 'TV Shows') {
            iconName = 'television';
          } else if (route.name === 'Search') {
            iconName = 'search';
          }

          return <Icon name={iconName} color={color} size={20} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: darkBlue,
        inactiveTintColor: blue,
        tabStyle: {backgroundColor: white},
      }}>
      <Tabs.Screen name="Movies" component={MovieStack}></Tabs.Screen>
      <Tabs.Screen name="TV Shows" component={TvStack}></Tabs.Screen>
    </Tabs.Navigator>
  );
};

export default NavigationTabs;
