import * as firebase from 'firebase';

import getEnvVars from '../../environment';
const { firebaseAuthDomain, firebaseDatabaseURL, firebaseStorageBucket } = getEnvVars();

export async function initializeFirebase() {
  const firebaseConfig = {
    authDomain: `${firebaseAuthDomain}`,
    databaseURL: `${firebaseDatabaseURL}`,
    storageBucket: `${firebaseStorageBucket}`
  };

  await firebase.initializeApp(firebaseConfig);
}
