import * as React from 'react';
import { StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Text, View } from '../components/Themed';
import OrangeTheme from '../constants/OrangeTheme';
import { TrainingsParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { Badge, Divider } from 'react-native-elements';

interface Props {
    navigation: StackNavigationProp<TrainingsParamList, "TrainingsScreen">
  }

export default function TrainingsScreen({ navigation } : Props) {
  return (
      <>
    <ImageBackground source={require('../assets/images/TrainingsBg.png')} style={styles.image}>
     <View style={styles.container}>
     <Text style={{color:OrangeTheme.colors.text, alignSelf: "center"}}>Favourites</Text>
        <View style={styles.row} >
            <View style={styles.column} >
                <TouchableOpacity 
                    onPress={() => navigation.navigate('TrainingDetailsScreen', {trainingId: 1})}>
                    <Text style={{color:OrangeTheme.colors.text, alignSelf:'center', fontWeight: "bold"}}>Cardio</Text>
                    <MaterialCommunityIcons name="run-fast" style={styles.icon} size={70} color={OrangeTheme.colors.text} />
                </TouchableOpacity>
            </View>
            <View style={styles.column} >
                <TouchableOpacity 
                    onPress={() => navigation.navigate('TrainingDetailsScreen', {trainingId: 2})}>
                <Text style={{color:OrangeTheme.colors.text, alignSelf:'center'}}>Bieg</Text>
                <MaterialCommunityIcons name="run-fast" style={styles.icon} size={70} color={OrangeTheme.colors.text} />
                </TouchableOpacity>
            </View>
            <View style={styles.column} >
                <Text style={{color:OrangeTheme.colors.text, alignSelf:'center'}}>Trucht</Text>
                <MaterialCommunityIcons name="run-fast" style={styles.icon} size={70} color={OrangeTheme.colors.text} />
            </View>
        </View>
        <Divider style={{backgroundColor:OrangeTheme.colors.text, width:'100%', height: 2, marginTop:10}} />
        <View style={styles.row} >
            <View style={styles.column} >
                <Text style={{color:OrangeTheme.colors.text, alignSelf:'center'}}>Cardio</Text>
                <MaterialCommunityIcons name="run-fast" style={styles.icon} size={70} color={OrangeTheme.colors.text} />
            </View>
            <View style={styles.column} >
                <Text style={{color:OrangeTheme.colors.text, alignSelf:'center'}}>Bieg</Text>
                <MaterialCommunityIcons name="run-fast" style={styles.icon} size={70} color={OrangeTheme.colors.text} />
            </View>
            <View style={styles.column} >
                <Text style={{color:OrangeTheme.colors.text, alignSelf:'center'}}>Trucht</Text>
                <MaterialCommunityIcons name="run-fast" style={styles.icon} size={70} color={OrangeTheme.colors.text} />
            </View>
        </View>
    </View>
    </ImageBackground>
        <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate("AddTrainingScreen")}>
          <Text style={{fontSize: 60}}>+</Text>
        </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
        height:'100%', 
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        padding: 5,
        justifyContent: 'flex-start',
        alignContent: 'flex-start'
    },
    row: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        flex: 0.25, 
        flexDirection: 'row',
        marginVertical: 10
    },
    column: {
        height: '100%',
        width: '30%',
        backgroundColor: 'rgba(0, 0, 0, 1)',
        paddingBottom: 40,
        justifyContent:'center',
        borderColor: OrangeTheme.colors.border,
        borderWidth: 1,
        marginBottom: 10,
        marginHorizontal: 10,
        padding: 5,
        flex: 1, 
        flexDirection: 'column'
    },
    icon: {
        alignSelf:'center'
    },
    button: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:70,
        position: 'absolute',
        bottom: 10,
        right: 10,
        height:70,
        backgroundColor:'#ffa500',
        borderRadius:100,
      },
      image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center'
      },
      overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.2)'
      }
});