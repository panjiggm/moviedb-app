import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import {request} from '../../utils/api';
import {Card, Divider} from 'react-native-paper';
import {darkGray, pink, darkBlue} from '../../utils/colors';
import {convertMinsToHrsMins} from '../../utils/time';
import isoLoanguage from '../../data/iso.json';
import MovieCasts from '../../components/MovieCasts';

const DEVICE_WIDTH = Dimensions.get('window').width;

const MovieDetails = ({route}) => {
  const [movie, setMovie] = useState([]);
  const [genres, setGenres] = useState('');

  const {movieId} = route.params;

  useEffect(() => {
    const getMovie = async () => {
      try {
        const movieData = await request(`movie/${movieId}`);
        const genres = await movieData.genres
          .map((genre) => genre.name)
          .join(', ');

        setMovie(movieData);
        setGenres(genres);
      } catch (error) {
        console.log(error);
      }
    };

    getMovie();

    return () => {
      console.log('clean up movie details');
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" translucent={true} />
      <View>
        <Card>
          <Card.Cover
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
            }}
            style={{}}
          />
        </Card>
      </View>
      <View style={styles.movieInfo}>
        <View>
          <Card>
            <Card.Cover
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              }}
              style={{width: 80, height: 120}}
            />
          </Card>
        </View>
        <View style={{marginLeft: 25}}>
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <View style={{flexDirection: 'row', marginTop: 7}}>
            <View style={{marginRight: 25}}>
              <Text style={styles.movieText}>Genre</Text>
              <Text style={styles.movieText}>Duration</Text>
              <Text style={styles.movieText}>Language</Text>
              <Text style={styles.movieText}>Rating</Text>
            </View>
            <View>
              <Text style={styles.movieVal}>{genres}</Text>
              <Text style={styles.movieVal}>
                {convertMinsToHrsMins(movie.runtime)}
              </Text>
              <Text style={styles.movieVal}>
                {isoLoanguage[movie.original_language]}
              </Text>
              <Text
                style={[styles.movieVal, {fontWeight: 'bold', color: pink}]}>
                {movie.vote_average}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Divider style={{marginVertical: 20}} />
      <View style={{marginHorizontal: 10}}>
        <Text style={styles.movieTitle}>Synopsis</Text>
        <Text style={{textAlign: 'justify', color: darkBlue, marginTop: 7}}>
          {movie.overview}
        </Text>
      </View>
      <Divider style={{marginVertical: 20}} />
      <View style={{marginHorizontal: 10}}>
        <Text style={styles.movieTitle}>Casts</Text>
        <MovieCasts movieId={movieId} />
      </View>
      <Divider style={{marginVertical: 20}} />
    </ScrollView>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: {},
  movieInfo: {
    marginTop: 20,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  movieText: {
    marginVertical: 3,
    color: darkGray,
    fontSize: 13,
  },
  movieVal: {
    marginVertical: 3,
    fontSize: 13,
  },
});
