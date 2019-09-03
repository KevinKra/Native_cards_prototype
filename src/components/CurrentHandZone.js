import React, { Component } from "react";
import { Text, View, Dimensions, StyleSheet } from "react-native";
import PlayingCard from "./PlayingCard";

export default class CurrentHandZone extends Component {
  state = {
    height: 0,
    width: 0
  };

  async componentDidMount() {
    await this.determineDimensions();
    console.log(this.state.height, this.state.width);
  }

  determineDimensions = () => {
    const { height: deviceHeight, width: deviceWidth } = Dimensions.get("window");
    const validHeight = deviceHeight * (1 / 2);
    const validWidth = deviceWidth;
    this.setState({ height: validHeight, width: validWidth });
  };

  render() {
    return (
      <View
        style={[styles.handZone, { height: this.state.height, width: this.state.width }]}
      >
        <PlayingCard />
        <PlayingCard />
        <PlayingCard />
        <PlayingCard />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  handZone: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "red"
  }
});
