import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Firebase configuration object from Firebase Console
const firebaseConfig = {
  apiKey: 'AIzaSyDFeGmPh9QYn4ZdE5ZLYvpGAzXgAnkNBrc',
  authDomain: 'myfirstproject-2a79d.firebaseapp.com',
  projectId: 'myfirstproject-2a79d',
  storageBucket: 'myfirstproject-2a79d.appspot.com',
  messagingSenderId: '190509679479',
  appId: '1:190509679479:ios:283333e64cd1f001bb5772',
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
