import React, { Component } from "react";
import { Text, View, Animated, PanResponder, StyleSheet, Dimensions } from "react-native";

// How to apply zIndex to animated element, is it even possible?

export default class PlayingCard extends Component {
  state = {
    active: false,
    size: 0
  };

  _animatedValue = new Animated.ValueXY();
  _scaleValue = new Animated.Value(0);
  _coords = { x: 0, y: 0 };

  scale = this._scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2]
  });

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
      this.setState({ active: true });
    },

    onPanResponderRelease: (evt, { vx, vy, moveY, moveX }) => {
      const { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");
      const validHeight = deviceHeight * (1 / 2);
      const validWidth = deviceWidth;
      this._animatedValue.flattenOffset();
      if (moveY < validHeight || moveX > validWidth) {
        console.log("PLAY CARD");
        Animated.stagger(200, [
          Animated.parallel([
            Animated.decay(this._animatedValue, {
              velocity: { x: vx, y: vy },
              deceleration: 0.98
            }),
            Animated.timing(this._scaleValue, {
              toValue: 1
            })
          ]),
          Animated.parallel([
            Animated.spring(this._animatedValue, {
              toValue: { x: 0, y: deviceHeight * -(1 / 2) },
              friction: 4
            }),
            Animated.timing(this._scaleValue, {
              toValue: 0
            })
          ])
        ]).start();
        this.props.playCard(this.props.id);
        this.setState({ active: true });
      } else {
        console.log("HOLD CARD");
        this.setState({ active: true });
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
              { rotate: interpolatedRotation },
              { scaleX: this.scale },
              { scaleY: this.scale }
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
