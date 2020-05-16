import React, {createRef, Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import {Card} from 'react-native-paper';
import {darkGray} from '../utils/colors';

const DEVICE_WIDTH = Dimensions.get('window').width;

class BackgroundCarousel extends Component {
  scroolRef = createRef();
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(
        (prevState) => ({
          selectedIndex:
            prevState.selectedIndex === this.props.images.length - 1
              ? 0
              : prevState.selectedIndex + 1,
        }),
        () => {
          this.scroolRef.current.scrollTo({
            animated: true,
            y: 0,
            x: DEVICE_WIDTH * this.state.selectedIndex,
          });
        },
      );
    }, 2000);
  }

  indexSelected = (event) => {
    // Dimension width
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    // Get current position of images
    const contentOffset = event.nativeEvent.contentOffset.x;

    const imageIndex = Math.round(contentOffset / viewSize);

    this.setState({selectedIndex: imageIndex});
  };

  render() {
    const {images} = this.props;
    return (
      <View style={styles.container}>
        <ScrollView
          ref={this.scroolRef}
          horizontal
          pagingEnabled
          onMomentumScrollEnd={this.indexSelected}
          showsHorizontalScrollIndicator={false}>
          {images.map((image, i) => (
            <Card key={i}>
              <Card.Cover
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${image.backdrop_path}`,
                }}
                style={styles.backgroundImg}
              />
            </Card>
          ))}
        </ScrollView>
        <View style={styles.dotContainer}>
          {images.map((image, i) => (
            <View
              key={image.id}
              style={[
                styles.dotIndicator,
                {opacity: i === this.state.selectedIndex ? 1 : 0.4},
              ]}
            />
          ))}
        </View>
      </View>
    );
  }
}

export default BackgroundCarousel;

const styles = StyleSheet.create({
  backgroundImg: {
    height: 200,
    width: DEVICE_WIDTH,
  },
  dotContainer: {
    // position: 'absolute',
    // bottom: 15,
    height: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 5,
    marginTop: 20,
    backgroundColor: darkGray,
    zIndex: 1000,
  },
});
