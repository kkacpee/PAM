import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import AddTrainingScreen from "../../screens/AddTrainingScreen";
import TrainingsScreen from "../../screens/TrainingsScreen";
import { TrainingsParamList } from "../../types";
import TrainingDetailsScreen from '../../screens/TrainingDetailsScreen';

const TrainingStack = createStackNavigator<TrainingsParamList>();

export default function TrainingNavigator() {
  return (
    <TrainingStack.Navigator>
      <TrainingStack.Screen
        name="TrainingsScreen"
        component={TrainingsScreen}
        options={{ headerTitle: 'Trainings' }}
      />
      <TrainingStack.Screen
        name="AddTrainingScreen"
        component={AddTrainingScreen}
        options={{ headerTitle: 'Add Trainings' }}
      />
      <TrainingStack.Screen
        name="TrainingDetailsScreen"
        component={TrainingDetailsScreen}
        options={{ headerTitle: 'Add Trainings' }}
      />
    </TrainingStack.Navigator>
  );
}