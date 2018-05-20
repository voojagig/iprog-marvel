import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDHxI4YcyHtv1EwrETXTOV3DuTigBbvceY",
    authDomain: "quiz-marvel.firebaseapp.com",
    databaseURL: "https://quiz-marvel.firebaseio.com",
    projectId: "quiz-marvel",
    storageBucket: "quiz-marvel.appspot.com",
    messagingSenderId: "868436133066"
  };
  firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;