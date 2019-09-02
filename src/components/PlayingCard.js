import React, { Component } from "react";
import { Text, View, Animated, PanResponder, StyleSheet } from "react-native";

export default class PlayingCard extends Component {
  render() {
    return <View style={styles.card}></View>;
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
