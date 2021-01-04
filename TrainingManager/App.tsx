import 'reflect-metadata';  
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform, Text } from 'react-native';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import { createConnection } from 'typeorm/browser';
import { dbConfig } from './src/data/Database';
import useAsync from 'react-use/lib/useAsync';
import OrangeTheme from './constants/OrangeTheme';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { ExerciseType } from './src/data/models/ExerciseType';

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const isLoadingComplete = useCachedResources();

  var state = useAsync(async () => {
    const conn = await createConnection(dbConfig);
    
    const typeRepo = conn.getRepository(ExerciseType);
    var types = await typeRepo.find();
    if (types.length < 2) {
      const type1 = typeRepo.create({ name: "reps"});
      const type2 = typeRepo.create({name: "time"});
      await typeRepo.save([type1, type2]);
    }
  });

  if (!isLoadingComplete || state.loading) {
    return null;
  } 
  else if (state.error != null){
    return (
      <SafeAreaProvider>
        <Text style={{color: OrangeTheme.colors.text}}>
          {"Critical app error: database connection couldn't be established. \n" + state.error.message}
        </Text>
      </SafeAreaProvider>
    );
  }
  else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme="dark" />
        <StatusBar />
      </SafeAreaProvider>
    );
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }
}