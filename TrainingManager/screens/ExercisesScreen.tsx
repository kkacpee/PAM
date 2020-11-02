import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  SectionList,
  TouchableOpacity
} from "react-native";
import Constants from "expo-constants";
import Item from "../components/List/Item"
import { Icon } from "expo";
import { NavigationState } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ExercisesParamList, RootStackParamList } from "../types";
const DATA = [
  {
    title: "Main dishes",
    data: ["Pizza", "Burger", "Risotto"]
  },
  {
    title: "Sides",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"]
  },
  {
    title: "Drinks",
    data: ["Water", "Coke", "Beer"]
  },
  {
    title: "Desserts",
    data: ["Cheese Cake", "Ice Cream"]
  }
];

interface Props {
  navigation: StackNavigationProp<ExercisesParamList, "ExercisesScreen">
}

export default function ExercisesScreen({ navigation } : Props) {
  return (
      <SafeAreaView style={styles.container}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item title={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
        <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate("AddExerciseScreen")}>
          <Text style={{fontSize: 60}}>+</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#ffa500",
  },
  header: {
    fontSize: 32,
    backgroundColor: "#ffa500",
    alignSelf: "center"
  },
  button: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:70,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height:70,
    backgroundColor:'#ffa500',
    borderRadius:100,
  }
});