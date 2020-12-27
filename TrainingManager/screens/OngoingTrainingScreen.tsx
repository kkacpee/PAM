import * as React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import navigation from '../navigation';
import OrangeTheme from '../constants/OrangeTheme';
import { Button } from 'react-native-elements';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import TimedWorkout from '../components/TimedWorkout'
import CountedWorkout from '../components/CountedWorkout';

export default function OngoingTrainingScreen() {
    const [timed, setTimed] = React.useState(true);
    const [timerOn, setTimerOn] = React.useState(false);
    const [min, setMin] = React.useState(10);
    const [sec, setSec] = React.useState(0);
    const [reps, setReps] = React.useState(10);
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/images/WorkoutBg.png')} style={styles.image}>  
        <View style={styles.column}>
        
            <Text style={styles.content}>Next: sit-ups</Text>
            <Text style={styles.headerToday}>Push-ups</Text>
            
            {/* {timed ? 
             <>
             <Text style={styles.timer}>{min}:{(sec > 9) ? sec : `0${sec}`}</Text>

            <View style={styles.row}>
                <Button 
                icon={
                    <MaterialCommunityIcons name="pause" style={styles.icon} size={70} color={OrangeTheme.colors.text} />
                }

                onPress={() => console.log("siema")}>
                
            </Button>
            <TouchableOpacity style={styles.button}
             onPress={() => console.log("siema")}>
            <MaterialCommunityIcons name="play" style={styles.icon} size={70} color={OrangeTheme.colors.text} 
            />
            </TouchableOpacity>
            </View>
             </>
             :
             <View >
             <Text style={styles.timer}>{reps}</Text>
     
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button}>
                    <MaterialIcons name="done" style={styles.icon} size={70} color={OrangeTheme.colors.text} />
                    </TouchableOpacity>
                </View>
             </View>
            } */}
           <TimedWorkout seconds={5} minutes={0} />
            {/* <CountedWorkout reps={10} /> */}
        </View>


      </ImageBackground>
    </View>
  );
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
    marginVertical: 100
  },
  column: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingBottom: 40,
    marginBottom: 10,
    padding: 5,
    flex: 1, 
    flexDirection: 'column'
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
    alignSelf: "center"
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
