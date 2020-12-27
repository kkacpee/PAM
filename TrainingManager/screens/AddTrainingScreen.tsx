import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  ImageBackground
} from "react-native";
import {  Picker } from "@react-native-community/picker"
import { Button, Input } from 'react-native-elements';
import OrangeTheme from "../constants/OrangeTheme";
import styles from '../constants/AddScreenStyles'

export default function AddTrainingScreen() {
  const [selectedValue, setSelectedValue] = useState("Reps");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

    return (
      <ImageBackground source={require('../assets/images/AddBg.png')} style={styles.image}>
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
          <Text style={styles.pickerLabel}>Icon</Text>
          <View style={styles.pickerContainer}>
          <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue.toString())}
          itemStyle={styles.item}
          >
            <Picker.Item label="Siema" value="reps" />
            <Picker.Item label="Niema" value="time" />
          </Picker>
          </View>
          <View style={{marginTop: 50}}>
          <Button
            title="Add"
            type="outline"
            titleStyle={{color: OrangeTheme.colors.text}}
            buttonStyle={styles.addButton}
          />  
          </View>
          
        
        </SafeAreaView>
      </ImageBackground>
    );
  }
