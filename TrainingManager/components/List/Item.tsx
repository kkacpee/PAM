import React, { useState } from "react";
import Swipeout from "react-native-swipeout";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

interface Props {
  id: number,
  title: string,
  deleteFn: (id: number) => void
}

export default function Item({ id, title, deleteFn }: Props) {
  const [btns] = useState([
    {
      text: "Delete",
      backgroundColor: "rgba(255, 0, 0, 0.7)",
      underlayColor: "rgba(0, 0, 0, 1, 0.6)",
      onPress: () => deleteFn(id)
    },
  ]);

  return (
    <Swipeout right={btns} autoClose={true} backgroundColor="transparent">
      <TouchableHighlight
        underlayColor="rgba(192,192,192,1,0.1)"
      >
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableHighlight>
    </Swipeout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: "#ffa500",
  },
  item: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
  },
});
