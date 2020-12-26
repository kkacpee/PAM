import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen";
import { HomeParamList } from "../../types";
import OngoingTrainingScreen from '../../screens/OngoingTrainingScreen';

const HomeStack = createStackNavigator<HomeParamList>();

export default function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerTitle: 'Home', headerTitleAlign:'center' }}
      />
      <HomeStack.Screen
        name="OngoingTrainingScreen"
        component={OngoingTrainingScreen}
        options={{ headerTitle: 'Workout!', headerTitleAlign:'center'  }}
      />
    </HomeStack.Navigator>
  );
}