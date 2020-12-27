import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from "react";
import { ImageBackground, StyleSheet } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Item from '../components/List/Item';
import { Text, View } from '../components/Themed';
import OrangeTheme from '../constants/OrangeTheme';
import { TrainingsParamList } from '../types';
import styles from '../constants/TrainingDetailsStyles'
import AddExerciseToTrainingModal from '../components/Modals/AddExerciseToTrainingModal';
import AddBreakToTrainingModal from '../components/Modals/AddBreakToTrainingModal';
interface Props {
    route: RouteProp<TrainingsParamList, 'TrainingDetailsScreen'>
    navigation: StackNavigationProp<TrainingsParamList, 'TrainingDetailsScreen'>
  }


export default function TrainingDetailsScreen({route, navigation}: Props) {
    const [name, setName] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [isFavourite, setIsFavourite] = useState(false);

  return (
    <ImageBackground source={require('../assets/images/TrainingsBg.png')} style={styles.image}>
<View style={styles.container}>      
      <CheckBox
        right
        checkedColor={OrangeTheme.colors.text}
        uncheckedColor={OrangeTheme.colors.text}
        checkedIcon='star'
        uncheckedIcon='star-o'
        checked={isFavourite}
        onPress={() => setIsFavourite(!isFavourite)}
        />
        <Text style={styles.name} >Name {route.params.trainingId}</Text>
        <View style={{height: 400, borderWidth: 1, borderColor: OrangeTheme.colors.text, backgroundColor: 'rgba(0, 0, 0, 0)'}}> 
            <ScrollView style={{height: 400, backgroundColor:'rgba(0, 0, 0, 0)'}}>
                <Item title="Siema"></Item>
                <Item title="Siema"></Item>
                <Item title="Siema"></Item>
                <Item title="Siema"></Item>
                <Item title="Siema"></Item>
                <Item title="Siema"></Item>
                <Item title="Siema"></Item>
            </ScrollView>
        </View>
        <View style={{
          backgroundColor: 'rgba(0, 0, 0, 0.1)', 
          flexDirection: 'row', 
          justifyContent: 'space-around', 
          width: '100%',
          height: 40,
          marginTop: 5}}>
        <AddExerciseToTrainingModal title="Pick exercise" fnc={() => {}} />
        <AddBreakToTrainingModal title="Select break length" fnc={() => {}}/>
        </View>  
    </View>
    </ImageBackground>
  );
}