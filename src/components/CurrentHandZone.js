import React, { Component } from "react";
import { Text, View, Dimensions, StyleSheet } from "react-native";
import PlayingCard from "./PlayingCard";

export default class CurrentHandZone extends Component {
  state = {
    height: 0,
    width: 0,
    playedCards: []
  };

  async componentDidMount() {
    await this.determineDimensions();
    console.log(this.state.height, this.state.width);
  }

  playCard = id => {
    const previousPlayedCards = this.state.playedCards.slice();
    console.log(this.state.playedCards);
    this.setState({ playedCards: [...previousPlayedCards, id] });
  };

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
        <PlayingCard id="1" playCard={this.playCard} />
        <PlayingCard id="2" playCard={this.playCard} />
        <PlayingCard id="3" playCard={this.playCard} />
        <PlayingCard id="4" playCard={this.playCard} />
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
