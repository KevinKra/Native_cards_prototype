import React, { Component } from "react";
import { Text, View, Animated, PanResponder, StyleSheet, Dimensions } from "react-native";

export default class PlayingCard extends Component {
  state = {
    active: false
  };

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
      this.setState({ active: true });
    },

    onPanResponderRelease: (evt, { vx, vy, moveY, moveX }) => {
      const { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");
      const validHeight = deviceHeight * (1 / 2);
      const validWidth = deviceWidth;
      // console.log("=== valid X:", validWidth, "valid Y:", validHeight);
      this._animatedValue.flattenOffset();
      // console.log("release X:", moveX, "release Y:", moveY);
      if (moveY < validHeight || moveX > validWidth) {
        console.log("PLAY CARD");
        Animated.stagger(200, [
          Animated.decay(this._animatedValue, {
            velocity: { x: vx, y: vy },
            deceleration: 0.98
          }),
          Animated.spring(this._animatedValue, {
            toValue: { x: 0, y: deviceHeight * -(1 / 2) },
            friction: 4
          })
        ]).start();
        this.props.playCard(this.props.id);
      } else {
        console.log("HOLD CARD");
        Animated.spring(this._animatedValue, {
          toValue: { x: 0, y: 0 },
          friction: 6
        }).start();
      }
      this.setState({ active: false });
    }
  });
  render() {
    const { width: deviceWidth } = Dimensions.get("window");

    const interpolatedRotation = this._animatedValue.x.interpolate({
      inputRange: [0, deviceWidth / 2, deviceWidth],
      outputRange: ["0deg", "30deg", "-30deg"]
    });
    return (
      <Animated.View
        style={[
          styles.card,
          this.state.active ? { zIndex: 2 } : { zIndex: 1 },
          {
            transform: [
              { translateX: this._animatedValue.x },
              { translateY: this._animatedValue.y },
              { rotate: interpolatedRotation }
            ]
          }
        ]}
        {...this._panResponder.panHandlers}
      >
        <Text style={styles.cardNumber}>{this.props.id}</Text>
      </Animated.View>
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
    backgroundColor: "#555",
    justifyContent: "center"
  },
  cardNumber: {
    color: "white",
    alignSelf: "center",
    fontSize: 18
  }
});
