import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import OrangeTheme from "../constants/OrangeTheme";

interface Props {
  onPress: (id: number) => void;
  model: { id: number; name: string; icon: string };
  index: number;
}

export default function TrainingGridItem({ model, index, onPress }: Props) {
  return (
    <View style={styles.item} key={index}>
      <TouchableOpacity onPress={() => onPress(model.id)}>
        <View>
          <Text style={styles.text}>{model.name}</Text>
          <MaterialCommunityIcons
            name={model.icon}
            style={styles.icon}
            size={40}
            color={OrangeTheme.colors.text}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    borderColor: OrangeTheme.colors.border,
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
    paddingTop: 5,
    flex: 1,
    flexDirection: "row",
    borderRadius: 20
  },
  text: {
    color: OrangeTheme.colors.text,
    alignSelf: "center",
    fontWeight: "bold",
  },
  icon: {
    alignSelf: "center",
  },
});
