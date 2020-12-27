import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  SectionList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Constants from "expo-constants";
import Item from "../components/List/Item";
import { StackNavigationProp } from "@react-navigation/stack";
import { ExercisesParamList } from "../types";
import OrangeTheme from "../constants/OrangeTheme";
import useAsync from "react-use/lib/useAsync";
import ExerciseController from "../src/controllers/ExerciseController";
import { useIsFocused } from "@react-navigation/native";
import AsyncStateGuard from "../components/AsyncStateGuard";

interface Props {
  navigation: StackNavigationProp<ExercisesParamList, "ExercisesScreen">;
}

export default function ExercisesScreen({ navigation }: Props) {
  let controller = new ExerciseController();
  const state = useAsync(() => controller.GetAllExercisesCategorised(), [
    useIsFocused(),
  ]);

  return (
    <AsyncStateGuard asyncState={state}>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require("../assets/images/ExerciseBg.png")}
          style={styles.image}
        >
          <SectionList
            sections={state.value!}
            renderItem={({ item }) => <Item title={item.name} />}
            renderSectionHeader={({ section: { name } }) => (
              <Text style={styles.header}>{name}</Text>
            )}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AddExerciseScreen")}
          >
            <Text style={{ fontSize: 60 }}>+</Text>
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    </AsyncStateGuard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: OrangeTheme.colors.background,
  },
  header: {
    fontSize: 32,
    color: OrangeTheme.colors.text,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    textAlign: "center",
    width: "100%",
    borderTopColor: OrangeTheme.colors.border,
    borderBottomColor: OrangeTheme.colors.border,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    alignSelf: "center",
  },
  button: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: "#ffa500",
    borderRadius: 100,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
