import Firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAM-H9cwdrH3vn4RsuVOQmuU2X9svmhOLs",
  authDomain: "newtinder-4bfb6.firebaseapp.com",
  databaseURL: "https://newtinder-4bfb6.firebaseio.com",
  projectId: "newtinder-4bfb6",
  storageBucket: "newtinder-4bfb6.appspot.com",
  messagingSenderId: "250216606867"
};

let app = Firebase.initializeApp(config);

export const db = app.database(); 