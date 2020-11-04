import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  View
} from "react-native";
import {  Picker } from "@react-native-community/picker"
import { Button, Input } from 'react-native-elements';
import OrangeTheme from "../constants/OrangeTheme";
import styles from '../constants/AddScreenStyles'
import { connection } from '../App';
import { ExerciseType } from "../src/data/models/ExerciseType";
import { ExerciseCategory } from "../src/data/models/ExerciseCategory";
import { Exercise } from "../src/data/models/Exercise";
import { StackNavigationProp } from "@react-navigation/stack";
import { AtlasParamList } from "../types";

interface Props {
  navigation: StackNavigationProp<AtlasParamList, "AtlasScreen">
}

export default function AddExerciseScreen({ navigation } : Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Reps");
  const [category, setCategory] = useState("Klata");

    return (
      <SafeAreaView style={styles.container}>
        <Input
          label="Name"
          labelStyle={styles.inputLabel}
          value={name}
          onChangeText={(itemValue) => setName(itemValue)}
          inputStyle={styles.input}
          inputContainerStyle={{borderColor: OrangeTheme.colors.border}}
        />
        <Input
          label="Description"
          labelStyle={styles.inputLabel}
          value={description}
          onChangeText={(itemValue) => setDescription(itemValue)}
          inputStyle={styles.input}
          inputContainerStyle={{borderColor: OrangeTheme.colors.border}}
          multiline = {true}
          numberOfLines = {4}
        />
        <Text style={styles.pickerLabel}>Type</Text>
        <View style={styles.pickerContainer}>
        <Picker
        selectedValue={type}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setType(itemValue.toString())}
        itemStyle={styles.item}
        >
          <Picker.Item label="Reps" value="reps" />
          <Picker.Item label="Time" value="time" />
        </Picker>
        </View>
        <Text style={styles.pickerLabel}>Category</Text>
        <View style={styles.pickerContainer}>
        <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setCategory(itemValue.toString())}
        itemStyle={styles.item}
        >
          <Picker.Item label="Klata" value="reps" />
          <Picker.Item label="Plery" value="time" />
        </Picker>
        </View>
        <View style={{marginTop: 50}}>
        <Button
          title="Add"
          type="outline"
          titleStyle={{color: OrangeTheme.colors.text}}
          buttonStyle={{borderWidth: 1, borderColor: OrangeTheme.colors.border, borderRadius: 4}}
          onPress={() => addAndNavigateBack(name, description, type, category, navigation)}
        /> 
        </View>
        <Text style={{display: "none"}}>Baza świruje coś.</Text>
      </SafeAreaView>
    );
  }

  function addAndNavigateBack(
    p_name : string, 
    p_desc : string, 
    p_type : string, 
    p_category : string,
    navigation : StackNavigationProp<AtlasParamList, "AtlasScreen">) {

      addToDB(p_name, p_desc, p_type, p_category)
        .then(() => navigation.navigate("ExercisesScreen"), x => console.log(x));
  }

  async function addToDB(
    p_name : string, 
    p_desc : string, 
    p_type : string, 
    p_category : string) {

      var typeRepository = connection.getRepository(ExerciseType);
      var categoryRepository = connection.getRepository(ExerciseCategory);
      var exerciseRepository = connection.getRepository(Exercise);
      console.log("MOMY REPOZYTORIA");

      //OPERATION SHOULD BE WRAPPED IN TRANSACTION
      var type = await typeRepository.findOne({ name : p_name});

      if (!type){
        type = typeRepository.create();
        type.name = p_name;
        type = await typeRepository.save(type);
      }

      var category = await categoryRepository.findOne({ name: p_category});

      if (!category){
        category = categoryRepository.create();
        category.name = p_category;
        category = await categoryRepository.save(category);
      }

      var exercise = await exerciseRepository.create();
      exercise.name = p_name;
      exercise.description = p_desc;
      exercise.category = category;
      exercise.type = type;
      exercise.isActive = true;
      console.log(exercise);
      exerciseRepository.save(exercise);
  }