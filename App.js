 import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import firebase from 'firebase';

import { getImage } from './constants/ImageFilepaths';
import AppNavigator from './navigation/AppNavigator';
import { initializeFirebase } from './util/firebase/initFirebase';
import { registerForPushNotificationsAsync } from './util/notifications/notifications';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await initializeFirebase();

  var imageFileNames = [];
  await firebase
    .database()
    .ref('category')
    .once('value')
    .then(function(data) {
      data.forEach(function(childNode) {
        imageFileNames.push(getImage(childNode.val()['fileName']));
      });
    });

  await Promise.all([
    Asset.loadAsync(imageFileNames),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);

  registerForPushNotificationsAsync();
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
