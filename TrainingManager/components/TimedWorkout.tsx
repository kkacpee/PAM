import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { StyleSheet, TouchableOpacity, Text} from 'react-native';
import OrangeTheme from "../constants/OrangeTheme";


function TimedWorkout({ minutes, seconds}: { minutes: number, seconds: number }) {
    return (
        <View>
        <Text style={styles.timer}>{minutes}:{seconds}</Text>

        <View style={styles.row}>
            <TouchableOpacity style={styles.button}>
            <MaterialCommunityIcons name="pause" style={styles.icon} size={70} color={OrangeTheme.colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons name="play" style={styles.icon} size={70} color={OrangeTheme.colors.text} />
        </TouchableOpacity>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    timer : {
      fontSize: 80,
      color: OrangeTheme.colors.text,
      borderTopColor: OrangeTheme.colors.border,
      borderBottomColor: OrangeTheme.colors.border,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      borderBottomWidth: 1,
      borderTopWidth: 1,
      textAlign:'center',
      alignSelf: "center",
      width: '100%',
      marginVertical: 120
    },
    button: {
        borderWidth: 1, 
        borderColor: OrangeTheme.colors.border, 
        borderRadius: 4, 
        marginTop: 40, 
        width:'30%', 
        backgroundColor:'rgba(0, 0, 0, 0.6)', 
        alignSelf: 'center',
    },
    icon: {
        alignSelf:'center'
    },
    row: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        flex: 0.25, 
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent:'space-around'
    }
    });

    export default TimedWorkout;