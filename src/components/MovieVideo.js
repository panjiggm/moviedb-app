import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {YouTubeStandaloneAndroid} from 'react-native-youtube';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {request} from '../utils/api';
import {pink, white} from '../utils/colors';

const MovieVideo = ({movieId}) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const trailer = await request(`movie/${movieId}/videos`);
        const result = await trailer.results[0];

        setVideos(result);
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
    <View style={styles.buttonGroup}>
      {typeof videos === 'object' ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            YouTubeStandaloneAndroid.playVideo({
              apiKey: 'AIzaSyDnbcf6FHKOYMWzcJmSPhqAEtNq2CzZbOE',
              videoId: videos.key,
              autoplay: true,
              lightboxMode: true,
            })
              .then(() => console.log('Android Standalone Player Finished'))
              .catch((errorMessage) => this.setState({error: errorMessage}))
          }>
          <Icon name="youtube" size={22} color={white} />
          <Text style={styles.buttonText}>{videos.name}</Text>
        </TouchableOpacity>
      ) : (
        <View>
          <Text>No Video/Trailer</Text>
        </View>
      )}
    </View>
  );
};

export default MovieVideo;

const styles = StyleSheet.create({
  buttonGroup: {
    marginTop: 15,
    marginBottom: 25,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: pink,
    borderRadius: 5,
    paddingVertical: 5,
  },
  buttonText: {
    marginLeft: 5,
    color: white,
  },
});
