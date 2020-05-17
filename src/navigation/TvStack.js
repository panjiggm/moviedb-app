import React from 'react';
import {createStackNavigator, Header} from '@react-navigation/stack';

import TvShows from '../screens/tv/TvShows';
import TvDetails from '../screens/tv/TvDetails';

const Stack = createStackNavigator();

const TvStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TV Shows"
        component={TvShows}
        options={{headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="Tv Details"
        component={TvDetails}
        options={({route}) => ({
          title: route.params.name,
          headerTransparent: true,
          headerTintColor: '#fff',
        })}
      />
    </Stack.Navigator>
  );
};

export default TvStack;
