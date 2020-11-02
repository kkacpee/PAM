import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import OrangeTheme from '../constants/OrangeTheme';
import { TrainingsParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';

interface Props {
    navigation: StackNavigationProp<TrainingsParamList, "TrainingsScreen">
  }

export default function TrainingsScreen({ navigation } : Props) {
  return (
      <>
     <View style={styles.container}>
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
    <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate("AddTrainingScreen")}>
          <Text style={{fontSize: 60}}>+</Text>
        </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
        height:'50%', 
        backgroundColor: OrangeTheme.colors.background,
        padding: 5,
    },
    row: {
        height: '25%',
        backgroundColor: OrangeTheme.colors.background,
        flex: 1, 
        flexDirection: 'row'
    },
    column: {
        height: '100%',
        width: '30%',
        backgroundColor: OrangeTheme.colors.background,
        paddingBottom: 40,
        justifyContent:'center',
        borderColor: OrangeTheme.colors.border,
        borderWidth: 1,
        margin: 10,
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
      }
});