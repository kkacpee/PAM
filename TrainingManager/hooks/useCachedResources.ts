import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          'AddBg': require('../assets/images/AddBg.png'),
          'Exercise': require('../assets/images/Exercise.png'),
          'ExerciseBg': require('../assets/images/ExerciseBg.png'),
          'HomeBg': require('../assets/images/HomeBg.png'),
          'Training': require('../assets/images/Training.png'),
          'TrainingBg': require('../assets/images/TrainingsBg.png'),
          'WorkoutBg': require('../assets/images/WorkoutBg.png'),
          'DefaultSound': require('../assets/sounds/default.mp3')
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
