import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PlayingCard from "./src/components/PlayingCard";
import CurrentHandZone from "./src/components/CurrentHandZone";

export default function App() {
  return (
    <View style={styles.container}>
      <CurrentHandZone />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
