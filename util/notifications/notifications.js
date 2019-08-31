import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import firebase from 'firebase';

const exponentTokenRegex = /ExponentPushToken\[(.*?)]/;

export async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // Only ask for permission if permissions have not already been determined,
  // because iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS.
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions.
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device.
  let token = await Notifications.getExpoPushTokenAsync();

  if (exponentTokenRegex.test(token)) {
    var tokenHashOnly = token.match(exponentTokenRegex)[1];
    firebase
    .database()
    .ref('expoNotificationToken')
    .child(tokenHashOnly)
    .set({
      token: token,
    });
  }
}