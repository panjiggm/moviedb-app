import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, StatusBar} from 'react-native';

import {request} from '../../utils/api';
import BackgroundCarousel from '../../components/tvs/BackgroundCarousel';
import MostPopular from '../../components/tvs/MostPopular';
import NowPlaying from '../../components/tvs/NowPlaying';

const TvShows = ({navigation}) => {
  const [popular, setPopular] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [carousel, setCarousel] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    requestTvShows();

    return () => {
      console.log('cleanup request tv show');
    };
  }, []);

  const requestTvShows = async () => {
    try {
      setIsLoading(true);
      const popular = await request('tv/popular', {page: 1});
      const nowPlaying = await request('tv/airing_today', {page: 1});
      const carousel = await request('tv/top_rated', {page: 1});

      const slicedCarousel = await carousel.results.slice(13, 20);

      setPopular(popular.results);
      setNowPlaying(nowPlaying.results);
      setCarousel(slicedCarousel);
      setIsLoading(false);
      setTotalPages(popular.total_pages);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <StatusBar backgroundColor="transparent" />
      <View>
        <BackgroundCarousel images={carousel} navigation={navigation} />
      </View>

      <View style={[styles.container, {marginBottom: 30}]}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Popular TV Show</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {popular.map((item, index) => (
            <MostPopular
              key={index}
              popular={item}
              loading={isLoading}
              navigation={navigation}
            />
          ))}
        </ScrollView>
      </View>

      <View style={[styles.container, {marginBottom: 30}]}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>TV Airing Today</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {nowPlaying.map((item, index) => (
            <NowPlaying
              key={index}
              nowPlaying={item}
              loading={isLoading}
              navigation={navigation}
            />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default TvShows;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  titleContainer: {
    marginVertical: 10,
    marginTop: 40,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
