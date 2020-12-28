import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Card} from 'react-native-elements';
import styles from '../constants/CalendarStyles';
import navigation from '../navigation';
import { CalendarParamList, TrainingsParamList } from '../types';

interface Props {
  navigation: StackNavigationProp<CalendarParamList, 'AddTrainingPlanScreen'>
}

export default function Calendar({navigation}:Props) {

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate("AddTrainingPlanScreen")}>
          <Text style={{fontSize: 60}}>+</Text>
        </TouchableOpacity>
    </View>
  );
};