import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { Text, View } from '../components/Themed';
import OrangeTheme from '../constants/OrangeTheme';
import { AtlasParamList } from '../types';

interface Props {
    navigation: StackNavigationProp<AtlasParamList, "AtlasScreen">
  }

export default function AtlasScreen({ navigation } : Props) {
  return (
    <View style={styles.view}>
      <Card containerStyle={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("TrainingsScreen")}>
            <Text style={{alignSelf:'center', color:OrangeTheme.colors.text}}>Trainings</Text>
            <Image
            style={{width:'100%', height:'95%', resizeMode: 'contain'}}
            source={require('../assets/images/Training.png')}
            />
        </TouchableOpacity>
      </Card>
      <Card containerStyle={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("ExercisesScreen")}>
            <Text style={{alignSelf:'center', color:OrangeTheme.colors.text}}>Exercises</Text>
            <Image
            style={{width:'100%', height:'95%', resizeMode: 'contain'}}
            source={require('../assets/images/Excersise.png')}
            />
        </TouchableOpacity>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        height:'50%', 
        backgroundColor: OrangeTheme.colors.background,
        borderColor: OrangeTheme.colors.border,
        padding: 5,
    },
    view: {
        height: '100%',
        backgroundColor: OrangeTheme.colors.background,
        paddingBottom: 40
    }
});
