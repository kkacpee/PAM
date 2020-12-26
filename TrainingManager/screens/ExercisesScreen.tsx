import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  SectionList,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import Constants from "expo-constants";
import Item from "../components/List/Item"
import { StackNavigationProp } from "@react-navigation/stack";
import { ExercisesParamList } from "../types";
import OrangeTheme from "../constants/OrangeTheme";
import { connection } from '../App';
import { Exercise } from "../src/data/models/Exercise";
let dataInitial = [
  {
    title: "Chest",
    data: ["Bench press", "Flys"]
  },
  {
    title: "Back",
    data: ["Pull ups", "Bent-over rows"]
  },
  {
    title: "Shoulders",
    data: ["Military press", "Lateral raises"]
  },
  {
    title: "Legs",
    data: ["Back squat", "Deadlift"]
  }
];

interface Props {
  navigation: StackNavigationProp<ExercisesParamList, "ExercisesScreen">
}

export default function ExercisesScreen({ navigation } : Props) {
  const [DATA, setDATA] = useState(dataInitial);

  const callback = useCallback(() => loadData(), []);
  
  useEffect(() =>{
    callback()
      .then(res => {
        res.forEach((v, i, all) => {
          var item = DATA.find((v1, i1, all1) => v1.title == v.title);
          if (item == null){
            DATA.push(v);
            console.log("Dodano całość");
          }
          else{
            (v1, i1, all1) => item.data.push(...v.data);
            console.log("Dodano do istniejącego");
          }
        })
        setDATA(DATA);
      }, 
            err => console.log(err));
  });

  return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={require('../assets/images/ExerciseBg.png')} style={styles.image}>
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
        </ImageBackground> 
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: OrangeTheme.colors.background,
  },
  header: {
    fontSize: 32,
    color: OrangeTheme.colors.text,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  }
});



async function loadData() {
  var exerciseRepository = connection.getRepository(Exercise);

  var exercises = await exerciseRepository.find(); //GETALL WITH A WEIRD NAME

  var result = new Array<{title: string, data : Array<string>}>();

  exercises.forEach(x => {
    var item = result.find((v, i, all) => v.title == x.category.name);
    if (item == null){
      item = {title: x.category.name, data: new Array<string>()};
      result.push(item);
    }

    item.data.push(x.name);
  });

  console.log(result);

  return result;
}