import React from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import {white, black} from '../utils/colors';

const {width, height} = Dimensions.get('window');

const CarouselItem = ({item}) => {
  return (
    <View style={styles.cardView}>
      <Image style={styles.cardImg} source={{uri: item.url}} />
      <View style={styles.cardTitle}>
        <Text style={styles.cardText}>{item.title}</Text>
      </View>
    </View>
  );
};

export default CarouselItem;

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    width: width - 20,
    height: height / 3,
    backgroundColor: white,
    margin: 10,
    borderRadius: 10,
    shadowColor: black,
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  cardTitle: {
    position: 'absolute',
    bottom: 10,
    margin: 10,
    left: 5,
  },
  cardImg: {
    width: width - 20,
    height: height / 3,
    borderRadius: 10,
  },
  cardText: {
    color: white,
    shadowColor: black,
    fontSize: 22,
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    marginBottom: 5,
    fontWeight: 'bold',
    elevation: 5,
  },
});
