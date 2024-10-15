import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Updates from 'expo-updates';

export default function App() {

  const [wasOTAUpdated, setWasOTAUpdated] = useState(false);
  useEffect(() => {
    const update = async () => {
      let timeForUpdatePassed = false;
      console.log('EXPO-UPDATE START');
      setTimeout(() => {
        console.log('EXPO-UPDATE TIMEOUT PASSED');
        timeForUpdatePassed = true;
        setWasOTAUpdated(true);
      }, 10000);
      try {
        console.log('EXPO-UPDATE BEFORE CHECK FOR UPDATE');
        const {isAvailable} = await Updates.checkForUpdateAsync();
        if (isAvailable && !timeForUpdatePassed) {
          console.log('EXPO-UPDATE BEFORE FETCH UPDATE');
          const {isNew} = await Updates.fetchUpdateAsync();
          if (isNew && !timeForUpdatePassed) {
            console.log('EXPO-UPDATE BEFORE RELOAD ASYNC');
            await Updates.reloadAsync();
          }
        } else {
          console.log('EXPO-UPDATE UPDATE NOT AVAILABLE');
        }
      } finally {
        console.log('EXPO-UPDATE FINALLY');
        setWasOTAUpdated(true);
      }
    };
    update();
  }, []);
  useEffect(() => {
    console.log('EXPO-UPDATE WAS OTA UPDATED USEEFFECT', wasOTAUpdated);
  }, [wasOTAUpdated]);

  const onLayout = () => {
    console.log('EXPO-UPDATE ONLAYOUT');
  };
  if (!wasOTAUpdated) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayout}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
