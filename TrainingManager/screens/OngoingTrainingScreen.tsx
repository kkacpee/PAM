import * as React from 'react';
import styles from '../constants/OngoingTrainingScreenStyles';
import { ImageBackground } from 'react-native';
import { Text, View } from '../components/Themed';
import TimedWorkout from '../components/TimedWorkout'

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
            
           <TimedWorkout seconds={10} minutes={0} />
            {/* <CountedWorkout reps={10} /> */}
        </View>


      </ImageBackground>
    </View>
  );
}
