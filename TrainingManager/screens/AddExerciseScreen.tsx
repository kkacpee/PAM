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

export default function AddExerciseScreen() {
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
        /> 
        </View>
        
      </SafeAreaView>
    );
  }