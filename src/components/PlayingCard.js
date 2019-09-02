import React, { Component } from "react";
import { Text, View, Animated, PanResponder, StyleSheet, Dimensions } from "react-native";

export default class PlayingCard extends Component {
  _animatedValue = new Animated.ValueXY();
  _coords = { x: 0, y: 0 };

  //sets sync between when card is released and default _coords
  componentDidMount() {
    this._animatedValue.addListener(coords => (this._coords = coords));
  }

  _panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true, // ios allows movement
    onMoveShouldSetPanResponderCapture: () => true, // ios allows dragging
    onStartShouldSetPanResponder: () => true,
    //callback sets the Animated objects dx and dy values
    onPanResponderMove: Animated.event([
      null,
      { dx: this._animatedValue.x, dy: this._animatedValue.y }
    ]),
    //updates the values of _animatedValue
    onPanResponderGrant: () => {
      //setOffset?
      this._animatedValue.setOffset({ x: this._coords.x, y: this._coords.y });
      this._animatedValue.setValue({ x: 0, y: 0 });
    },
    //updates the coords / offset so its updated on release
    onPanResponderRelease: () => {
      this._animatedValue.flattenOffset();
    }
  });

  render() {
    const { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");
    const interpolatedRotation = this._animatedValue.x.interpolate({
      inputRange: [0, deviceWidth / 2, deviceWidth],
      outputRange: ["0deg", "30deg", "-30deg"]
    });
    return (
      <Animated.View
        style={[
          styles.card,
          {
            transform: [
              { translateX: this._animatedValue.x },
              { translateY: this._animatedValue.y },
              { rotate: interpolatedRotation }
            ]
          }
        ]}
        {...this._panResponder.panHandlers}
      ></Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 5,
    height: 220,
    width: 140,
    backgroundColor: "#555"
  }
});
