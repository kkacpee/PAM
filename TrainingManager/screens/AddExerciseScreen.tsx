import React, { useState } from "react";
import { Text, SafeAreaView, View, Alert, ImageBackground } from "react-native";
import { Picker } from "@react-native-community/picker";
import { Button, Input } from "react-native-elements";
import OrangeTheme from "../constants/OrangeTheme";
import styles from "../constants/AddScreenStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import { AtlasParamList, ExercisesParamList } from "../types";
import ExerciseController from "../src/controllers/ExerciseController";
import useAsync from "react-use/lib/useAsync";
import { ExerciseViewModel } from "../src/viewmodel/ViewModelTypes";
import AsyncStateGuard from "../components/AsyncStateGuard";
import AddMiscModal from "../components/Modals/AddMiscModal";
import useAsyncFn, { AsyncState } from "react-use/lib/useAsyncFn";
import { RouteProp } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

interface Props {
  navigation: StackNavigationProp<AtlasParamList, "AtlasScreen">;
  route: RouteProp<ExercisesParamList, "AddExerciseScreen">;
}

export default function AddExerciseScreen({ navigation, route }: Props) {
  const controller = new ExerciseController();
  const [types, setTypes] = useState<string[]>();
  const [categories, setCategories] = useState<string[]>([]);
  const [model, setModel] = useState({
    name: "",
    description: "",
    type: "",
    category: "",
  } as ExerciseViewModel);

  const modelState = useAsync(async () => {
    var model = await controller.createDefault();
    var types = await controller.getTypes();
    var categories = await controller.getCategories();
    console.log(types);
    setTypes(types);
    setCategories(categories);
    setModel(model);
  });

  const addCat = (name: string) => {
    route.params?.addCategory(name);
    setCategories([...categories, name]);
  };

  const updateModel = (m: ExerciseViewModel, fieldName: string, value: any) => {
    var copy = Object.assign({}, m); // Copying because dont want to play around with reducers. this will be changed
    copy[fieldName] = value;
    setModel(copy);
  };

  const typePickerItems = types?.map((s, i) => {
    return <Picker.Item key={i} value={s} label={s} />;
  });

  const categoryPickerItems = categories?.map((s, i) => {
    return <Picker.Item key={i} value={s} label={s} />;
  });

  return (
    <AsyncStateGuard state={[modelState]}>
      <ImageBackground
        source={require("../assets/images/AddBg.png")}
        style={styles.image}
      >
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
              value={model.name}
              onChangeText={(itemValue) =>
                updateModel(model, "name", itemValue)
              }
              inputStyle={styles.input}
              inputContainerStyle={{ borderColor: OrangeTheme.colors.border }}
            />
            <Input
              label="Description"
              labelStyle={styles.inputLabel}
              value={model.description}
              onChangeText={(itemValue) =>
                updateModel(model, "description", itemValue)
              }
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
              <AddMiscModal title="Category" fnc={(name) => addCat(name)} />
            </View>
            <View style={{ marginTop: 50 }}>
              <Button
                title="Add"
                type="outline"
                titleStyle={{ color: OrangeTheme.colors.text }}
                buttonStyle={styles.addButton}
                containerStyle={{ marginBottom: 40}}
                onPress={() =>
                  addAndNavigateBack(controller, model, navigation)
                }
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </AsyncStateGuard>
  );
}

function addAndNavigateBack(
  controller: ExerciseController,
  p_model: ExerciseViewModel,
  navigation: StackNavigationProp<AtlasParamList, "AtlasScreen">
) {
  console.log("saving");
  controller.AddExercise(p_model).then(
    () => navigation.navigate("ExercisesScreen"),
    () =>
      Alert.alert("Error", "Unable to save exercise.", [
        {
          text: "OK",
        },
      ])
  );
}
