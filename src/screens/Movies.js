import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

import {request} from '../utils/api';
import MostPopular from '../components/MostPopular';
import NowPlaying from '../components/NowPlaying';

const Movies = () => {
  const [popular, setPopular] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    requestPopular();

    return () => {
      console.log('cleanup request popular');
    };
  }, []);

  const requestPopular = async () => {
    try {
      setIsLoading(true);
      const popular = await request('movie/popular', {page: 1});
      const nowPlaying = await request('movie/now_playing', {page: 1});

      setPopular(popular.results);
      setNowPlaying(nowPlaying.results);
      setIsLoading(false);
      setTotalPages(popular.total_pages);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Popular Movies</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {popular.map((item, index) => (
            <MostPopular key={index} popular={item} loading={isLoading} />
          ))}
        </ScrollView>
      </View>

      <View style={{marginTop: 20}}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Free To Watch</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {nowPlaying.map((item, index) => (
            <NowPlaying key={index} nowPlaying={item} loading={isLoading} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Movies;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  titleContainer: {
    marginVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
