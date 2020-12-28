import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import CalendarScreen from "../../screens/CalendarScreen";
import { CalendarParamList } from "../../types";
import AddTrainingPlanScreen from '../../screens/AddTrainingPlanScreen';

const CalendarStack = createStackNavigator<CalendarParamList>();

export default function CalendarNavigator() {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{ headerTitle: 'Calendar', headerTitleAlign:'center' }}
      />
      <CalendarStack.Screen
        name="AddTrainingPlanScreen"
        component={AddTrainingPlanScreen}
        options={{ headerTitle: 'Add Training Plan', headerTitleAlign:'center' }}
      />
    </CalendarStack.Navigator>
  );
}