import 'reflect-metadata';  
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import connectToDatabase from './src/data/Database';
import { Connection, createConnection } from 'typeorm/browser';
import { TrainingEntry } from './src/data/models/TrainingEntry';
import { Exercise } from './src/data/models/Exercise';
import { ExerciseCategory } from './src/data/models/ExerciseCategory';
import { ExerciseType } from './src/data/models/ExerciseType';
import { Training } from './src/data/models/Training';
import { TrainingPlan } from './src/data/models/TrainingPlan';
import { TrainingPlanEntry } from './src/data/models/TrainingPlanEntry';
import { TrainingHistory } from './src/data/models/TrainingHistory';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  connect().then((x) => connection = x, (x) => console.log(x));

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme="dark" />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export let connection : Connection;

function connect() {
  return createConnection({
    type: 'expo',
    database: 'TrainingManager',
    logging: ['error', 'query', 'schema'],
    driver: require('expo-sqlite'),
    synchronize: true, //Drops database every deployxc?
    entities: [TrainingEntry, Exercise, ExerciseCategory, ExerciseType, Training, TrainingPlan, TrainingPlanEntry, TrainingHistory],
});
}