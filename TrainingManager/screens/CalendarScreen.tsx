import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Agenda, Calendar, CalendarList } from 'react-native-calendars';

import { View } from '../components/Themed';

export default function CalendarScreen() {
  return (
    <View style={styles.container}>
      <CalendarList></CalendarList>
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
