import * as React from "react";
import { TouchableOpacity, ImageBackground } from "react-native";
import { Text, View } from "../components/Themed";
import OrangeTheme from "../constants/OrangeTheme";
import { TrainingsParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { Divider } from "react-native-elements";
import styles from "../constants/TrainingsScreenStyles";
import TrainingGridItem from "../components/TrainingGridItem";
import useAsync from "react-use/lib/useAsync";
import TrainingController from "../src/controllers/TrainingController";
import { useIsFocused } from "@react-navigation/native";
import AsyncStateGuard from "../components/AsyncStateGuard";
import { Training } from "../src/data/models/Training";

interface Props {
  navigation: StackNavigationProp<TrainingsParamList, "TrainingsScreen">;
}

export default function TrainingsScreen({ navigation }: Props) {
  const controller = new TrainingController();
  const state = useAsync(() => controller.GetAllTrainings(), [useIsFocused()]);

  if (state.value) {
    const listToGrid = (totalColumns: Number) => {
      let gridArray: [Training[]] = [[]];

      let countColumns = 1;
      for (var i = 0; i < notFavouritesList.length; i++) {
        gridArray[gridArray.length - 1].push(notFavouritesList[i]);
        if (countColumns <= totalColumns) {
          countColumns++;
        }
        if (countColumns > totalColumns && i !== notFavouritesList.length - 1) {
          countColumns = 1;
          gridArray.push([]);
        }
      }

      return gridArray;
    };

    var favourites = state.value
      .filter((x) => x.isFavourite && x.isActive)
      ?.map((s, i) => {
        return (
          <TrainingGridItem
            onPress={(id) => {navigation.navigate("TrainingDetailsScreen", {trainingId: id})}}
            model={{ name: s.name, id: s.id, icon: s.iconName }}
            index={i}
          />
        );
      });

    var notFavouritesList = state.value.filter(
      (x) => !x.isFavourite && x.isActive
    );

    var notFavouritesGrid = listToGrid(3);

    var notFavourites = notFavouritesGrid.map((row) => (
      <View style={styles.row}>
        {row.map((model, i) => (
          <TrainingGridItem
            onPress={(id) => {navigation.navigate("TrainingDetailsScreen", {trainingId: id})}}
            model={{ name: model.name, icon: model.iconName, id: model.id }}
            index={i}
          />
        ))}
      </View>
    ));
  }

  return (
    <AsyncStateGuard state={state}>
      <>
        <ImageBackground
          source={require("../assets/images/TrainingsBg.png")}
          style={styles.image}
        >
          <View style={styles.container}>
            <Text style={styles.headerText}>Favourites</Text>
            <View style={styles.row}>{favourites!}</View>
            <Divider
              style={{
                backgroundColor: OrangeTheme.colors.text,
                width: "100%",
                height: 2,
                marginTop: 20,
              }}
            />
            {notFavourites!}
          </View>
        </ImageBackground>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddTrainingScreen")}
        >
          <Text style={{ fontSize: 60 }}>+</Text>
        </TouchableOpacity>
      </>
    </AsyncStateGuard>
  );
}
