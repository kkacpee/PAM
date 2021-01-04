import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  ImageBackground,
  ListRenderItemInfo,
} from "react-native";
import { Picker } from "@react-native-community/picker";
import { Button, CheckBox, Input } from "react-native-elements";
import OrangeTheme from "../constants/OrangeTheme";
import styles from "../constants/AddScreenStyles";
import { TabBar, TabView } from "react-native-tab-view";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import AddExerciseToTrainingModal from "../components/Modals/AddExerciseToTrainingModal";
import {
  AddTrainingViewModel,
  ExerciseEntryViewModel,
} from "../src/viewmodel/ViewModelTypes";
import TrainingController from "../src/controllers/TrainingController";
import { Exercise } from "../src/data/models/Exercise";
import useAsyncFn from "react-use/lib/useAsyncFn";
import { StackNavigationProp } from "@react-navigation/stack";
import { AtlasParamList, TrainingsParamList } from "../types";
import AsyncStateGuard from "../components/AsyncStateGuard";
import useAsync from "react-use/lib/useAsync";
import { RouteProp, useIsFocused } from "@react-navigation/native";

interface Props {
  navigation: StackNavigationProp<AtlasParamList, "TrainingsScreen">;
  route: RouteProp<TrainingsParamList, "AddTrainingScreen">;
}

export default function AddTrainingScreen({ navigation, route }: Props) {
  var controller = new TrainingController();

  // MODEL
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string>("weight-pound");
  const [entries, setEntries] = useState<Array<ExerciseEntryViewModel>>([]);
  const [isFavourite, setIsFavourite] = useState(false);
  // END MODEL

  const trainingId = route.params?.trainingId;
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "info", title: "Information" },
    { key: "exercises", title: "Exercises" },
  ]);

  const removeEntryFn = (id: number) => {
    setEntries(entries.filter((value) => value.idExercise !== id));
  };

  const addEntryFn = (
    exercise: Exercise,
    repCount: number,
    setCount: number,
    time: number
  ) => {
    let entry = {
      idExercise: exercise.id,
      name: exercise.name,
      repCount: repCount,
      setCount: setCount,
      executionTime: time,
    };
    setEntries([...entries, entry]);
  };

  const model: AddTrainingViewModel = {
    name: name,
    description: description,
    isFavourite: isFavourite,
    iconName: selectedIcon,
    exerciseEntries: entries,
  };

  const modelState = useAsync(async () => {
    if (!trainingId) {
      // Requested exercise creation form.
      return;
    }

    let model = await controller.GetTrainingById(trainingId);

    setName(model.name);
    setDescription(model.description);
    setIsFavourite(model.isFavourite);
    setSelectedIcon(model.iconName);
    setEntries(model.exerciseEntries);
  }, [useIsFocused()]);

  const [addState, addTrainingAsync] = useAsyncFn(
    async (model: AddTrainingViewModel) => {
      if (trainingId) {
        await controller.UpdateTrainingAsync(trainingId, model);
      } else {
        await controller.AddTrainingAsync(model);
      }
      navigation.navigate("TrainingsScreen");
    }
  );

  const [deleteState, deleteTrainingAsync] = useAsyncFn(async (id: number) => {
    await controller.DeleteTrainingAsync(id);
    navigation.navigate("TrainingsScreen");
  });

  const infoRoute = () => {
    return (
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={{
            marginVertical: 30,
            width: "80%",
            alignSelf: "center",
            backgroundColor: "rgba(0, 0, 0, 0)",
          }}
        >
          <Input
            label="Name"
            labelStyle={styles.inputLabel}
            value={name}
            onChangeText={(itemValue) => {
              setName(itemValue);
              console.log("ITEMVALUE: " + itemValue);
              console.log("NAME:" + name);
            }}
            inputStyle={styles.input}
            inputContainerStyle={{ borderColor: OrangeTheme.colors.border }}
          />
          <Input
            label="Description"
            labelStyle={styles.inputLabel}
            value={description}
            onChangeText={(itemValue) => setDescription(itemValue)}
            inputStyle={styles.input}
            inputContainerStyle={{ borderColor: OrangeTheme.colors.border }}
            multiline={true}
            numberOfLines={4}
          />
          <CheckBox
            checkedColor={OrangeTheme.colors.text}
            uncheckedColor={OrangeTheme.colors.text}
            textStyle={styles.inputLabel}
            containerStyle={styles.checkBoxContainer}
            title={"Favourite"}
            checkedIcon="star"
            uncheckedIcon="star-o"
            checked={isFavourite}
            onPress={() => setIsFavourite(!isFavourite)}
          />
          <Text style={styles.pickerLabel}>Icon</Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: OrangeTheme.colors.border,
              borderRadius: 4,
              marginBottom: 35,
              flexDirection: "row",
            }}
          >
            <Picker
              selectedValue={selectedIcon}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setSelectedIcon(itemValue.toString())
              }
              itemStyle={styles.item}
            >
              <Picker.Item label="Weightlifting" value="weight-pound" />
              <Picker.Item label="Conditioning" value="run-fast" />
            </Picker>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  const exercisesRoute = () => (
    <SafeAreaView style={styles.container}>
      <AddExerciseToTrainingModal title={"Exercise"} fnc={addEntryFn} />
      <FlatList
        data={entries}
        keyExtractor={(value, index) => index.toString()}
        renderItem={(item) => renderExerciseItem(item, removeEntryFn)}
        contentContainerStyle={{
          paddingVertical: 2,
        }}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          borderColor: OrangeTheme.colors.text,
          borderWidth: 1,
          borderRadius: 4,
        }}
        ListEmptyComponent={
          <Text style={{ color: OrangeTheme.colors.text, textAlign: "center"}}>
            Add exercises, please!
          </Text>
        }
      />
    </SafeAreaView>
  );

  const renderScene = ({
    route,
  }: {
    route: { key: string; title: string };
  }) => {
    switch (route.key) {
      case "info":
        return infoRoute();
      case "exercises":
        return exercisesRoute();
      default:
        return <Text>Invalid routing.</Text>;
    }
  };

  return (
    <AsyncStateGuard state={[addState, modelState, deleteState]}>
      <ImageBackground
        source={require("../assets/images/AddBg.png")}
        style={styles.image}
      >
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          style={{ borderColor: OrangeTheme.colors.text, borderBottomWidth: 1 }}
          renderTabBar={renderTabBar}
        />
        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 5,
            flexDirection: "row",
          }}
        >
          <Button
            title={trainingId ? "Save" : "Add"}
            type="outline"
            titleStyle={{ color: OrangeTheme.colors.text }}
            buttonStyle={styles.addButton}
            containerStyle={{ flex: 1 }}
            onPress={() => addTrainingAsync(model)}
          />
          {trainingId && (
            <>
              <View style={{ marginHorizontal: 5 }} />
              <Button
                title="Delete"
                type="outline"
                titleStyle={{ color: OrangeTheme.colors.text }}
                containerStyle={{ flex: 1 }}
                buttonStyle={styles.addButton}
                onPress={() => deleteTrainingAsync(trainingId)}
              />
            </>
          )}
        </View>
      </ImageBackground>
    </AsyncStateGuard>
  );
}

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    style={{
      backgroundColor: OrangeTheme.colors.background,
    }}
    labelStyle={{
      color: OrangeTheme.colors.text,
    }}
    indicatorStyle={{
      backgroundColor: OrangeTheme.colors.text,
    }}
  />
);

const renderExerciseItem = (
  itemInfo: ListRenderItemInfo<ExerciseEntryViewModel>,
  removeEntry: (id: number) => void
) => (
  <View
    style={{
      backgroundColor: OrangeTheme.colors.background,
      borderColor: OrangeTheme.colors.text,
      borderWidth: 1,
      borderRadius: 4,
      marginHorizontal: 5,
      marginVertical: 2,
      padding: 5,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Text
      style={{
        color: OrangeTheme.colors.text,
      }}
    >
      {itemInfo.index + 1 + ". " + itemInfo.item.name}
    </Text>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text
        style={{
          color: OrangeTheme.colors.text,
          marginRight: 5,
        }}
      >
        {itemInfo.item.executionTime === 0
          ? itemInfo.item.setCount + "x" + itemInfo.item.repCount
          : itemInfo.item.executionTime + " s"}
      </Text>
      <Button
        title={"-"}
        buttonStyle={{
          backgroundColor: OrangeTheme.colors.text,
          width: 30,
          height: 30,
        }}
        onPress={() => {
          removeEntry(itemInfo.item.idExercise), console.log(itemInfo);
        }}
        titleStyle={{
          color: OrangeTheme.colors.background,
        }}
      />
    </View>
  </View>
);
