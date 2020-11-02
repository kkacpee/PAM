import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  SectionList,
  TouchableOpacity,
} from "react-native";

export default function AddExerciseScreen() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>TESTSETSGE</Text>
      </SafeAreaView>
    );
  }
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });