import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import OrangeTheme from '../constants/OrangeTheme';
import { AtlasParamList } from '../types';

interface Props {
    navigation: StackNavigationProp<AtlasParamList, "AtlasScreen">
  }

export default function AtlasScreen({ navigation } : Props) {
  return (
    <View style={styles.view}>
                <View style={styles.container}>
            <ImageBackground
            style={styles.image}
            source={require('../assets/images/Training.png')}
            > 
            <TouchableOpacity onPress={() => navigation.navigate("TrainingsScreen")} style={styles.imageOverlay}>
                <Text style={styles.text}>Trainings</Text>    
            </TouchableOpacity>
            </ImageBackground>
        </View>
        <View style={styles.container}>
            <ImageBackground
            style={styles.image}
            source={require('../assets/images/Exercise.png')}
            > 
            <TouchableOpacity onPress={() => navigation.navigate("ExercisesScreen")} style={styles.imageOverlay}>
                <Text style={styles.text}>Exercises</Text>    
            </TouchableOpacity>
            </ImageBackground>
        </View>
        
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:'50%', 
        backgroundColor: OrangeTheme.colors.background,
        borderColor: OrangeTheme.colors.border,
        justifyContent: 'center',
        alignContent: 'center',
        marginVertical: 2
    },
    view: {
        height: '100%',
        width: '100%',
        backgroundColor: OrangeTheme.colors.background
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
      },
    text: {
        alignSelf:'center',
        position:'absolute',
        fontSize: 40,
        textShadowColor: '#fff',
        textShadowRadius: 2,
        color:OrangeTheme.colors.text
    },
    imageOverlay:{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    }
});
