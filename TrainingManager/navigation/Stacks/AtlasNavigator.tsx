import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { AtlasParamList, ExercisesParamList } from "../../types";
import ExerciseNavigator from './ExerciseNavigator';
import TrainingsScreen from '../../screens/TrainingsScreen';
import AtlasScreen from '../../screens/AtlasScreen';
import TrainingNavigator from './TrainingNavigator';

const AtlasStack = createStackNavigator<AtlasParamList>();

export default function AtlasNavigator() {
  return (
    <AtlasStack.Navigator>
        <AtlasStack.Screen
        name="AtlasScreen"
        component={AtlasScreen}
        options={{ headerTitle: 'Atlas', headerTitleAlign:'center' }}
      />
      <AtlasStack.Screen
        name="ExercisesScreen"
        component={ExerciseNavigator}
        options={{ headerTitle: 'Exercises', headerTitleAlign:'center' }}
      />
      <AtlasStack.Screen
        name="TrainingsScreen"
        component={TrainingNavigator}
        options={{ headerTitle: 'Trainings', headerTitleAlign:'center' }}
      />
    </AtlasStack.Navigator>
  );
}