import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const MovieVideo = ({movieId}) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const trailer = await request(`movie/${movieId}/videos`);
        const result = await trailer.results;

        await setVideos(result);
      } catch (error) {
        console.log(error);
      }
    };

    getVideos();

    return () => {
      console.log('clean up videos/trailer');
    };
  }, []);

  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default MovieVideo;

const styles = StyleSheet.create({});
