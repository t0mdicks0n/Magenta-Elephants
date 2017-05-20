import * as firebase from 'firebase';

const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
}

module.exports.firebaseApp = firebase.initializeApp(config);
module.exports.taskRef = firebase.database().ref('tasks');