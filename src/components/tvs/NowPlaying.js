import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import {Card, Badge} from 'react-native-paper';
import {darkBlue} from '../../utils/colors';

const NowPlaying = ({nowPlaying, loading, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Tv Details', {
          tvId: nowPlaying.id,
          name: nowPlaying.name,
        })
      }>
      <View style={styles.cardView}>
        {loading ? (
          <ActivityIndicator size="small" color={darkBlue} />
        ) : (
          <Card>
            <Card.Cover
              source={{
                uri: `https://image.tmdb.org/t/p/w500${nowPlaying.poster_path}`,
              }}
              style={{borderRadius: 5}}
            />
            <Card.Title
              style={{
                position: 'absolute',
                bottom: -20,
              }}
              right={(props) => (
                <Badge
                  {...props}
                  size={20}
                  style={{
                    marginRight: 10,
                    fontWeight: 'bold',
                  }}>
                  {nowPlaying.vote_average}
                </Badge>
              )}
            />
          </Card>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default NowPlaying;

const styles = StyleSheet.create({
  cardView: {
    // flex: 1,
    width: 120,
    marginRight: 7.5,
  },
});
