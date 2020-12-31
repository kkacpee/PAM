import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  ImageBackground,
  ListRenderItemInfo,
} from "react-native";
import { Picker } from "@react-native-community/picker";
import { Button, Input } from "react-native-elements";
import OrangeTheme from "../constants/OrangeTheme";
import styles from "../constants/AddScreenStyles";
import { TabBar, TabView } from "react-native-tab-view";
import { FlatList } from "react-native-gesture-handler";
import AddExerciseToTrainingModal from "../components/Modals/AddExerciseToTrainingModal";
import { ExerciseEntryViewModel } from "../src/viewmodel/ViewModelTypes";
import TrainingController from "../src/controllers/TrainingController";
import { Exercise } from "../src/data/models/Exercise";
import useAsyncFn from "react-use/lib/useAsyncFn";
import { StackNavigationProp } from "@react-navigation/stack";
import { AtlasParamList } from "../types";

interface Props {
  navigation: StackNavigationProp<AtlasParamList, "AtlasScreen">;
}

export default function AddTrainingScreen({navigation} : Props) {
  var controller = new TrainingController();

  // MODEL
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string>("weight-pound");
  const [entries, setEntries] = useState<Array<ExerciseEntryViewModel>>([]);
  // END MODEL

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "info", title: "Information" },
    { key: "exercises", title: "Exercises" },
  ]);

  const removeEntryFn = (id: number) => {
    setEntries(entries.filter((value) => value.idExercise === id));
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

  const [] = useAsyncFn(async () => {
    var model = {
      name: name,
      description: description,
      iconName: selectedIcon,
      exerciseEntries: entries
    }
    await controller.AddTrainingAsync(model);
    navigation.navigate("TrainingsScreen");
  })

  const infoRoute = () => {
    return (
      <SafeAreaView style={styles.container}>
        <Input
          label="Name"
          labelStyle={styles.inputLabel}
          value={name}
          onChangeText={(itemValue) => setName(itemValue)}
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
        <Text style={styles.pickerLabel}>Icon</Text>
        <View style={styles.pickerContainer}>
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
        ListEmptyComponent={<Text>Add exercises, please!</Text>}
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
      <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
        <Button
          title="Add"
          type="outline"
          titleStyle={{ color: OrangeTheme.colors.text }}
          buttonStyle={styles.addButton}
        />
      </View>
    </ImageBackground>
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
        {itemInfo.item.executionTime == null
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
        onPress={() => removeEntry(itemInfo.item.idExercise)}
        titleStyle={{
          color: OrangeTheme.colors.background,
        }}
      />
    </View>
  </View>
);
