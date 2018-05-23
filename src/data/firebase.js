import firebase from 'firebase';

try {
	firebase.initializeApp({
		apiKey: "AIzaSyDHxI4YcyHtv1EwrETXTOV3DuTigBbvceY",
	    authDomain: "quiz-marvel.firebaseapp.com",
	    databaseURL: "https://quiz-marvel.firebaseio.com",
	    projectId: "quiz-marvel",
	    storageBucket: "quiz-marvel.appspot.com",
	    messagingSenderId: "868436133066"})
} catch (err) {
	// we skip the "already exists" message which is
	// not an actual error when we're hot-reloading
	if (!/already exists/.test(err.message)) {
		console.error('Firebase initialization error', err.stack)
	}
}

export default firebase;