import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  SectionList,
  TouchableOpacity
} from "react-native";
import Constants from "expo-constants";
import Item from "../components/List/Item"
import { StackNavigationProp } from "@react-navigation/stack";
import { ExercisesParamList, RootStackParamList } from "../types";
import OrangeTheme from "../constants/OrangeTheme";
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
    backgroundColor: OrangeTheme.colors.background
  },
  header: {
    fontSize: 32,
    color: OrangeTheme.colors.text,
    backgroundColor: OrangeTheme.colors.background,
    textAlign:'center',
    width: '100%',
    borderTopColor: OrangeTheme.colors.border,
    borderBottomColor: OrangeTheme.colors.border,
    borderBottomWidth: 1,
    borderTopWidth: 1,
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