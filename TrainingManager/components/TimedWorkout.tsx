import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { useState } from "react";
import { View } from "react-native";
import { StyleSheet, TouchableOpacity, Text} from 'react-native';
import OrangeTheme from "../constants/OrangeTheme";
import { useEffect } from "react";

export const delay = (ms:any) => new Promise((res) => setTimeout(res, ms));

function TimedWorkout({ minutes, seconds}: { minutes: number, seconds: number }) {
    const [second, setSecond] = useState(`${seconds}`);
    const [minute, setMinute] = useState(`${minutes}`);
    const [isActive, setIsActive] = useState(false);
    const [counter, setCounter] = useState(minutes * 60 + seconds);

    useEffect(() => {
        let intervalId;
    
        if (isActive) {
          intervalId = setInterval(() => {
            console.log(counter);
            const secondCounter = counter % 60;
            const minuteCounter = Math.floor(counter / 60);
    
         

            const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}`: String(secondCounter);
            const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}`: String(minuteCounter);
    
            setSecond(computedSecond);
            setMinute(computedMinute);
    
            if(counter === 0){
                setIsActive(false);
            }
            else {
                setCounter(counter => counter - 1);
            }
          }, 1000)
        }
    
        return () => clearInterval(intervalId);
      }, [isActive, counter])

    return (
        <>
        <Text style={styles.timer}>{minute.length === 1? `0${minute}` : minute}:{second.length === 1? `0${second}` : second}</Text>

        <View style={styles.row}>
        <TouchableOpacity style={styles.button}
         onPress={() => {setCounter(0), setSecond('00'), setMinute('00'), setIsActive(false)}}>
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