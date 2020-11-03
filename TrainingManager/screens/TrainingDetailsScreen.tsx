import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { Text, View } from '../components/Themed';
import OrangeTheme from '../constants/OrangeTheme';
import { TrainingsParamList } from '../types';

interface Props {
    route: RouteProp<TrainingsParamList, 'TrainingDetailsScreen'>
    navigation: StackNavigationProp<TrainingsParamList, 'TrainingDetailsScreen'>
  }


export default function TrainingDetailsScreen({route, navigation}: Props) {
  return (
    <View >
      <Text style={{color: OrangeTheme.colors.text}} >Training number: {route.params.trainingId}</Text>
    </View>
  );
}