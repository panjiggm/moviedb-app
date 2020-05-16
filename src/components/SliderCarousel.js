import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {darkGray} from '../utils/colors';
import {request} from '../utils/api';
import BackgroundCarousel from './BackgroundCarousel';

const SliderCarousel = () => {
  const [carousel, setCarousel] = useState([]);

  useEffect(() => {
    const getImageCarousel = async () => {
      try {
        const carousel = await request('movie/top_rated', {page: 1});
        const result = await carousel.results.slice(13, 20);

        setCarousel(result);
      } catch (error) {
        console.log(error);
      }
    };

    getImageCarousel();

    return () => {
      console.log('clear carousel');
    };
  }, []);

  //   console.log(carousel);

  return (
    <View style={styles.container}>
      <BackgroundCarousel images={carousel} />
    </View>
  );
};

export default SliderCarousel;

const styles = StyleSheet.create({
  container: {},
});
