import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View } from "react-native";
import { StyleSheet, TouchableOpacity, Text} from 'react-native';
import OrangeTheme from "../constants/OrangeTheme";
import styles from "../constants/OngoingTrainingScreenStyles"

function CountedWorkout({ reps, sets, handleDoneButton}: { reps: number, sets: number, handleDoneButton: () => void}) {

    return (
        < >
        <Text style={styles.timer}>{reps}</Text>
        <Text style={styles.content}>Remaining sets: {sets}</Text>

        <View style={styles.row}>
            <TouchableOpacity style={styles.button}>
            <MaterialIcons name="done" style={styles.icon} size={70} color={OrangeTheme.colors.text} onPress={() => handleDoneButton()}/>
        </TouchableOpacity>
        </View>
    </>
    )
}
    export default CountedWorkout;