import React from 'react';
import {createStackNavigator, Header} from '@react-navigation/stack';

import Movies from '../screens/movie/Movies';
import MovieDetails from '../screens/movie/MovieDetails';
import {white, pink, black} from '../utils/colors';

const Stack = createStackNavigator();

const MovieStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Movies"
        component={Movies}
        options={{headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="Movie Details"
        component={MovieDetails}
        options={({route}) => ({
          title: route.params.title,
          headerTransparent: true,
          headerTintColor: '#fff',
        })}
      />
    </Stack.Navigator>
  );
};

export default MovieStack;
