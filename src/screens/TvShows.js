import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const TvShows = () => {
  return (
    <View style={styles.container}>
      <Text>TvShows</Text>
    </View>
  );
};

export default TvShows;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
