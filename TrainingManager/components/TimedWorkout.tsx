import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { TouchableOpacity, Text} from 'react-native';
import OrangeTheme from "../constants/OrangeTheme";
import styles from '../constants/OngoingTrainingScreenStyles'

function TimedWorkout({ minutes, seconds, handleStop, setIsActive, isActive}: { minutes: string, seconds: string, handleStop: () => void, setIsActive:any, isActive:boolean}) {

    return (
        <>
        <Text style={styles.timer}>{minutes.length === 1? `0${minutes}` : minutes}:{seconds.length === 1? `0${seconds}` : seconds}</Text>

        <View style={styles.row}>
        <TouchableOpacity style={styles.button}
         onPress={() => {handleStop}}>
        <MaterialCommunityIcons name="stop" style={styles.icon} size={70} color={OrangeTheme.colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
         onPress={() => {setIsActive(!isActive)}}>
             {!isActive ?
                <MaterialCommunityIcons name="play" style={styles.icon} size={70} color={OrangeTheme.colors.text} />
                :
                <MaterialCommunityIcons name="pause" style={styles.icon} size={70} color={OrangeTheme.colors.text} />
             }
        </TouchableOpacity>
        </View>
    </>
    )
}
    export default TimedWorkout;