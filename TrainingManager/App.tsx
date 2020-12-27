import 'reflect-metadata';  
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import { createConnection } from 'typeorm/browser';
import { dbConfig } from './src/data/Database';
import useAsync from 'react-use/lib/useAsync';
import OrangeTheme from './constants/OrangeTheme';

export default function App() {
  const isLoadingComplete = useCachedResources();

  var state = useAsync(async () => await createConnection(dbConfig));

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
}