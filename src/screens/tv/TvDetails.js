import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {request} from '../../utils/api';
import {Card, Divider} from 'react-native-paper';
import {darkGray, pink, darkBlue} from '../../utils/colors';
import isoLoanguage from '../../data/iso.json';
import TvCasts from '../../components/tvs/TvCasts';
import TvVideo from '../../components/tvs/TvVideo';

const TvDetails = ({route}) => {
  const [tv, setTv] = useState([]);
  const [genres, setGenres] = useState('');
  const [loading, setLoading] = useState(false);

  const {tvId} = route.params;

  useEffect(() => {
    const getTvs = async () => {
      setLoading(true);
      try {
        const tvData = await request(`tv/${tvId}`);
        const genres = await tvData.genres
          .map((genre) => genre.name)
          .join(', ');

        setTv(tvData);
        setGenres(genres);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getTvs();

    return () => {
      console.log('clean up tv details');
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" translucent={true} />
      <View>
        <Card>
          <Card.Cover
            source={{
              uri: `https://image.tmdb.org/t/p/w500${tv.backdrop_path}`,
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
                uri: `https://image.tmdb.org/t/p/w500${tv.poster_path}`,
              }}
              style={{width: 80, height: 120}}
            />
          </Card>
        </View>
        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <View style={{marginLeft: 25}}>
            <Text style={styles.movieTitle}>{tv.name}</Text>
            <Text style={styles.movieYear}>
              {new Date(tv.first_air_date).getFullYear()}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 7}}>
              <View style={{marginRight: 25}}>
                <Text style={styles.movieText}>Genre</Text>
                <Text style={styles.movieText}>Seasons</Text>
                <Text style={styles.movieText}>Language</Text>
                <Text style={styles.movieText}>Rating</Text>
              </View>
              <View>
                <Text style={styles.movieVal}>{genres}</Text>
                <Text style={styles.movieVal}>{tv.number_of_seasons}</Text>
                <Text style={styles.movieVal}>
                  {isoLoanguage[tv.original_language]}
                </Text>
                <Text
                  style={[styles.movieVal, {fontWeight: 'bold', color: pink}]}>
                  {tv.vote_average}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
      <Divider style={{marginVertical: 20}} />
      <View style={{marginHorizontal: 10}}>
        <Text style={styles.movieTitle}>Synopsis</Text>
        <Text style={{textAlign: 'justify', color: darkBlue, marginTop: 7}}>
          {tv.overview}
        </Text>
      </View>
      <Divider style={{marginVertical: 20}} />
      <View style={{marginHorizontal: 10}}>
        <Text style={styles.movieTitle}>Casts</Text>
        <TvCasts tvId={tvId} />
      </View>
      <Divider style={{marginVertical: 20}} />
      <View style={{marginHorizontal: 10}}>
        <Text style={styles.movieTitle}>Video</Text>
        <TvVideo tvId={tvId} />
      </View>
    </ScrollView>
  );
};

export default TvDetails;

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
  movieYear: {
    fontSize: 15,
    color: darkBlue,
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
