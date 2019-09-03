import React, { Component } from "react";
import {
  Text,
  View,
  Animated,
  PanResponder,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";

const CONTAINER_THRESHOLD = 100;

export default class PlayingCard extends Component {
  _animatedValue = new Animated.ValueXY();
  _coords = { x: 0, y: 0 };

  componentDidMount() {
    this._animatedValue.addListener(coords => (this._coords = coords));
  }

  _panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true, // ios allows movement
    onMoveShouldSetPanResponderCapture: () => true, // ios allows dragging
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      { dx: this._animatedValue.x, dy: this._animatedValue.y }
    ]),
    onPanResponderGrant: () => {
      this._animatedValue.setOffset({ x: this._coords.x, y: this._coords.y });
      this._relationalCoords = { x: this._coords.x, y: this._coords.y };
    },
    // divide screen total size (from Dimensions) and get a remainder of 40%, the remainder will be where the cards live
    // get X Y coords of card
    // if card X or Y, depending, leaves the created dimensions, invoke a certain behavior
    // if card remains inside range invoke a different behavior
    onPanResponderRelease: (evt, { vx, vy, moveY, moveX }) => {
      const { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");
      const validHeight = deviceHeight * (1 / 2);
      const validWidth = deviceWidth;
      // console.log("=== valid X:", validWidth, "valid Y:", validHeight);
      this._animatedValue.flattenOffset();
      // console.log("release X:", moveX, "release Y:", moveY);
      if (moveY < validHeight || moveX > validWidth) {
        console.log("PLAY CARD");
        Animated.decay(this._animatedValue, {
          velocity: { x: vx, y: vy },
          deceleration: 0.98
        }).start();
      } else {
        console.log("HOLD CARD");
        Animated.spring(this._animatedValue, {
          toValue: { x: 0, y: 0 },
          friction: 4
        }).start();
      }
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
    alignSelf: "center",
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 5,
    height: 220,
    width: 140,
    margin: 2,
    marginBottom: 4,
    backgroundColor: "#555"
  }
});
