import * as React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import OrangeTheme from '../constants/OrangeTheme';
import { Button } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeParamList } from '../types';

interface Props {
  navigation: StackNavigationProp<HomeParamList, "HomeScreen">
}

export default function HomeScreen({ navigation } : Props) {


  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/images/HomeBg.png')} style={styles.image}>  

        <Text style={styles.header}>Monthly Stats</Text>
        <Text style={styles.content}>Trainings done:</Text>
        <Text style={styles.content}>20</Text>
        <Text style={styles.content}>Trainings skipped:</Text>
        <Text style={styles.content}>3</Text>
        <Text style={styles.content}>Trainings left:</Text>
        <Text style={styles.content}>7</Text>

        <Text style={styles.headerToday}>Training today</Text>
        <Text style={styles.content}>ABS Workout</Text>

        <Button
          title="Start todays training"
          type="outline"
          titleStyle={{color: OrangeTheme.colors.text}}
          onPress={() => navigation.navigate("OngoingTrainingScreen")}
          buttonStyle={styles.button}
        /> 

      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 32,
    color: OrangeTheme.colors.text,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    textAlign:'center',
    width: '100%',
    borderTopColor: OrangeTheme.colors.border,
    borderBottomColor: OrangeTheme.colors.border,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    alignSelf: "center"
  },
  button: {
    borderWidth: 1, 
    borderColor: OrangeTheme.colors.border, 
    borderRadius: 4, 
    marginTop: 40, 
    width:'80%', 
    backgroundColor:'rgba(0, 0, 0, 0.6)', 
    alignSelf: 'center'
  },
  headerToday: {
    fontSize: 32,
    color: OrangeTheme.colors.text,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    textAlign:'center',
    width: '100%',
    borderTopColor: OrangeTheme.colors.border,
    borderBottomColor: OrangeTheme.colors.border,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    alignSelf: "center",
    marginTop: 50
  },
  content: {
    fontSize: 22,
    color: OrangeTheme.colors.text,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    textAlign:'center',
    width: '100%',
    borderTopColor: OrangeTheme.colors.border,
    borderBottomColor: OrangeTheme.colors.border,
    alignSelf: "center"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
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
