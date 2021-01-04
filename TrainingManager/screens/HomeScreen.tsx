import * as React from "react";
import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import { Text } from "../components/Themed";
import OrangeTheme from "../constants/OrangeTheme";
import { Button } from "react-native-elements";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeParamList } from "../types";
import useAsync from "react-use/lib/useAsync";
import HomeController from "../src/controllers/HomeController";
import { useIsFocused } from "@react-navigation/native";
import AsyncStateGuard from "../components/AsyncStateGuard";

interface Props {
  navigation: StackNavigationProp<HomeParamList, "HomeScreen">;
}

export default function HomeScreen({ navigation }: Props) {
  const controller = new HomeController();
  const state = useAsync(() => controller.GetHomeViewModelAsync(), [
    useIsFocused(),
  ]);

  const isTrainingToday = state.value?.todaysTrainingId != null;

  const todaysTrainingName = isTrainingToday
    ? state.value?.todaysTrainingName
    : "No training";

  return (
    <AsyncStateGuard state={state}>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require("../assets/images/HomeBg.png")}
          style={styles.image}
        >
          <Text style={styles.header}>Monthly Stats</Text>
          <Text style={styles.content}>Trainings done:</Text>
          <Text style={styles.content}>{state.value?.doneCount}</Text>
          <Text style={styles.content}>Trainings skipped:</Text>
          <Text style={styles.content}>{state.value?.skippedCount}</Text>
          <Text style={styles.content}>Trainings left:</Text>
          <Text style={styles.content}>{state.value?.leftCount}</Text>

          <Text style={styles.headerToday}>Today</Text>
          <Text style={styles.content}>{todaysTrainingName}</Text>

          <Button
            title="Start todays training"
            type="outline"
            disabled={!isTrainingToday}
            titleStyle={{ color: OrangeTheme.colors.text }}
            // Forcing evaluation. Training id should be defined at this point.
            onPress={() =>
              navigation.navigate("OngoingTrainingScreen", {
                trainingId: state.value!.todaysTrainingId!,
                trainingPlanId: state.value!.todaysPlanId!,
              })
            }
            buttonStyle={styles.button}
          />
        </ImageBackground>
      </SafeAreaView>
    </AsyncStateGuard>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  header: {
    fontSize: 32,
    color: OrangeTheme.colors.text,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
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
    borderColor: OrangeTheme.colors.border,
    borderRadius: 4,
    marginTop: 40,
    width: "80%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    alignSelf: "center",
  },
  headerToday: {
    fontSize: 32,
    color: OrangeTheme.colors.text,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    textAlign: "center",
    width: "100%",
    borderTopColor: OrangeTheme.colors.border,
    borderBottomColor: OrangeTheme.colors.border,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    alignSelf: "center",
    marginTop: 50,
  },
  content: {
    fontSize: 22,
    color: OrangeTheme.colors.text,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    textAlign: "center",
    width: "100%",
    borderTopColor: OrangeTheme.colors.border,
    borderBottomColor: OrangeTheme.colors.border,
    alignSelf: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  container: {
    flex: 1,
    height: "50%",
    backgroundColor: OrangeTheme.colors.background,
    borderColor: OrangeTheme.colors.border,
    justifyContent: "center",
    alignContent: "center",
    marginVertical: 2,
  },
  view: {
    height: "100%",
    width: "100%",
    backgroundColor: OrangeTheme.colors.background,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    alignSelf: "center",
    position: "absolute",
    fontSize: 40,
    textShadowColor: "#fff",
    textShadowRadius: 2,
    color: OrangeTheme.colors.text,
  },
  imageOverlay: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
});
