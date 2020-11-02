import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { TabView } from 'react-native-tab-view';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function CalendarScreen() {
  return (
    <View style={styles.container}>
      <Calendar firstDay={1}></Calendar>
      
    </View>
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
