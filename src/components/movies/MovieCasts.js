import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

import {request} from '../../utils/api';
import {Avatar} from 'react-native-paper';
import {darkGray} from '../../utils/colors';

const MovieCasts = ({movieId}) => {
  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getCasts = async () => {
      try {
        const caster = await request(`movie/${movieId}/credits`);
        const result = await caster.cast;

        await setCasts(result);
      } catch (error) {
        console.log(error);
      }
    };

    getCasts();

    return () => {
      console.log('clean up casts');
    };
  }, []);

  return (
    <View style={{marginTop: 10}}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {casts.map((cast, index) => (
          <View key={index} style={styles.container}>
            <Avatar.Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${cast.profile_path}`,
              }}
              style={{borderRadius: 50}}
            />
            <Text style={styles.name}>{cast.name}</Text>
            <Text style={styles.character}>{cast.character}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MovieCasts;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    alignItems: 'center',
    width: 100,
  },
  name: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  character: {
    fontSize: 13,
    color: darkGray,
  },
});
