import React, { useState } from "react";
import { Text, SafeAreaView, View, Alert } from "react-native";
import { Picker } from "@react-native-community/picker";
import { Button, Input } from "react-native-elements";
import OrangeTheme from "../constants/OrangeTheme";
import styles from "../constants/AddScreenStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import { AtlasParamList } from "../types";
import ExerciseController from "../src/controllers/ExerciseController";
import useAsync from "react-use/lib/useAsync";
import { ExerciseViewModel } from "../src/viewmodel/ViewModelTypes";
import AsyncStateGuard from "../components/AsyncStateGuard";

interface Props {
  navigation: StackNavigationProp<AtlasParamList, "AtlasScreen">;
}

export default function AddExerciseScreen({ navigation }: Props) {
  const controller = new ExerciseController();

  const [types, setTypes] = useState<string[]>();
  const [categories, setCategories] = useState<string[]>();
  const [model, setModel] = useState({
    name: "",
    description: "",
    type: "",
    category: "",
  } as ExerciseViewModel);

  const state = useAsync(async () => {
    var model = await controller.createDefault();
    var types = await controller.getTypes();
    var categories = await controller.getCategories();
    console.log(types);
    setTypes(types);
    setCategories(categories);
    setModel(model);
  });

  let updateModel = (m : ExerciseViewModel, fieldName : string, value : any) => {
    var copy = Object.assign({}, m); // Copying because dont want to play around with reducers. this will be changed
    copy[fieldName] = value;
    console.log(fieldName + "  " + copy[fieldName] + "  " + value)
    setModel(copy);
  }

  let typePickerItems = types?.map((s, i) => {
    return <Picker.Item key={i} value={s} label={s} />;
  });

  let categoryPickerItems = categories?.map((s, i) => {
    return <Picker.Item key={i} value={s} label={s} />;
  });

  return (
    <AsyncStateGuard asyncState={state}>
      <SafeAreaView style={styles.container}>
        <Input
          label="Name"
          labelStyle={styles.inputLabel}
          value={model.name}
          onChangeText={(itemValue) => 
            updateModel(model, "name", itemValue)}
          inputStyle={styles.input}
          inputContainerStyle={{ borderColor: OrangeTheme.colors.border }}
        />
        <Input
          label="Description"
          labelStyle={styles.inputLabel}
          value={model.description}
          onChangeText={(itemValue) => 
            updateModel(model, "description", itemValue)}
          inputStyle={styles.input}
          inputContainerStyle={{ borderColor: OrangeTheme.colors.border }}
          multiline={true}
          numberOfLines={2}
        />
        <Text style={styles.pickerLabel}>Type</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={model.type}
            style={styles.picker}
            onValueChange={(itemValue) =>
              updateModel(model, "type", itemValue)
            }
            itemStyle={styles.item}
          >
            {typePickerItems}
          </Picker>
        </View>
        <Text style={styles.pickerLabel}>Category</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={model.category}
            style={styles.picker}
            onValueChange={(itemValue) =>
              updateModel(model, "category", itemValue)
            }
            itemStyle={styles.item}
          >
            {categoryPickerItems}
          </Picker>
        </View>
        <View style={{ marginTop: 50 }}>
          <Button
            title="Add"
            type="outline"
            titleStyle={{ color: OrangeTheme.colors.text }}
            buttonStyle={{
              borderWidth: 1,
              borderColor: OrangeTheme.colors.border,
              borderRadius: 4,
            }}
            onPress={() =>
              addAndNavigateBack(controller, model, navigation)
            }
          />
        </View>
      </SafeAreaView>
    </AsyncStateGuard>
  );
}

function addAndNavigateBack(
  controller : ExerciseController,
  p_model : ExerciseViewModel,
  navigation: StackNavigationProp<AtlasParamList, "AtlasScreen">
) {
  controller
    .AddExercise(p_model)
    .then(
      () => navigation.navigate("ExercisesScreen"),
      () =>
        Alert.alert("Error", "Unable to save exercise.", [
          {
            text: "OK",
          },
        ])
    );
}