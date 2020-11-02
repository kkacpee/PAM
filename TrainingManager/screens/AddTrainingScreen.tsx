import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  SectionList,
  TouchableOpacity,
  View
} from "react-native";
import {  Picker } from "@react-native-community/picker"
import { Button, Input } from 'react-native-elements';
import OrangeTheme from "../constants/OrangeTheme";


export default function AddTrainingScreen() {
  const [selectedValue, setSelectedValue] = useState("Reps");
  
    return (
      <SafeAreaView style={styles.container}>
        <Input
          placeholder='Name'
          
          inputStyle={styles.input}
          inputContainerStyle={{borderColor: OrangeTheme.colors.border}}
        />
        <Input
          placeholder='Description'
          inputStyle={styles.input}
          inputContainerStyle={{borderColor: OrangeTheme.colors.border}}
          multiline = {true}
          numberOfLines = {4}
        />
        <Text style={{color: OrangeTheme.colors.text, alignSelf:'center'}}>Icon</Text>
        <View style={{ borderWidth: 1, borderColor: OrangeTheme.colors.border, borderRadius: 4}}>
        <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue.toString())}
        itemStyle={styles.item}
        prompt='Choose icon'
        >
          <Picker.Item label="Reps" value="reps" />
          <Picker.Item label="Time" value="time" />
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
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      marginVertical: 30,
      width: '80%',
      alignSelf: 'center'
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    input: {
      color: OrangeTheme.colors.text
    },
    picker: {
      height: 50, 
      width: 150,
      color: OrangeTheme.colors.text,
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: OrangeTheme.colors.text
    },
    item:{
      backgroundColor: OrangeTheme.colors.background,
      color: OrangeTheme.colors.text
    }
  });