import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Movies from '../screens/Movies';
import Search from '../screens/Search';
import TvShows from '../screens/TvShows';
import {white, darkBlue, blue} from '../utils/colors';

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
      <Tabs.Screen name="Movies" component={Movies}></Tabs.Screen>
      <Tabs.Screen name="TV Shows" component={TvShows}></Tabs.Screen>
      <Tabs.Screen name="Search" component={Search}></Tabs.Screen>
    </Tabs.Navigator>
  );
};

export default NavigationTabs;
