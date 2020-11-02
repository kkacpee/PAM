import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import AddExerciseScreen from "../../screens/AddExerciseScreen";
import ExercisesScreen from "../../screens/ExercisesScreen";
import { ExercisesParamList } from "../../types";

const ExerciseStack = createStackNavigator<ExercisesParamList>();

export default function ExerciseNavigator() {
  return (
    <ExerciseStack.Navigator>
      <ExerciseStack.Screen
        name="ExercisesScreen"
        component={ExercisesScreen}
        options={{ headerTitle: 'Exercises' }}
      />
      <ExerciseStack.Screen
        name="AddExerciseScreen"
        component={AddExerciseScreen}
        options={{ headerTitle: 'Add exercises' }}
      />
    </ExerciseStack.Navigator>
  );
}