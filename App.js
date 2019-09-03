import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PlayingCard from "./src/components/PlayingCard";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.handSpace}>
        <PlayingCard />
        <PlayingCard />
        <PlayingCard />
        <PlayingCard />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  handSpace: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    height: "50%",
    width: "100%",
    borderWidth: 2,
    borderColor: "red"
  }
});
