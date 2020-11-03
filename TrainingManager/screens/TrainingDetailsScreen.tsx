import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from "react";
import { StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Item from '../components/List/Item';
import { Text, View } from '../components/Themed';
import OrangeTheme from '../constants/OrangeTheme';
import { TrainingsParamList } from '../types';

interface Props {
    route: RouteProp<TrainingsParamList, 'TrainingDetailsScreen'>
    navigation: StackNavigationProp<TrainingsParamList, 'TrainingDetailsScreen'>
  }


export default function TrainingDetailsScreen({route, navigation}: Props) {
    const [name, setName] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [isFavourite, setIsFavourite] = useState(false);

  return (
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
        <View style={{height: 100, borderWidth: 1, borderColor: OrangeTheme.colors.text}}> 
            <ScrollView style={{height: 100, backgroundColor: OrangeTheme.colors.background}}>
                <Item title="Siema"></Item>
                <Item title="Siema"></Item>
                <Item title="Siema"></Item>
                <Item title="Siema"></Item>
                <Item title="Siema"></Item>
                <Item title="Siema"></Item>
                <Item title="Siema"></Item>
            </ScrollView>
        </View>
        
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:'100%', 
        backgroundColor: OrangeTheme.colors.background,
        borderColor: OrangeTheme.colors.border,
        marginVertical: 2
    },
    name: {
        color: OrangeTheme.colors.text,
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    }
});