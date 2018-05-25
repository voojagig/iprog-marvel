import firebase from './firebase.js';
import '@firebase/firestore'


var enablePersistenceOn = false;

  /*
  Obtains reference to firestore database. On first call, it enables offline
  persistence, and then gets firestore directly on other occasions.
  */
  const firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);

  async function getDB() {
    if (enablePersistenceOn) {
      return firebase.firestore();
    } else {
      var db;
      enablePersistenceOn = true;
      await firebase.firestore().enablePersistence()
        .catch(function(err) {
            if (err.code === 'failed-precondition') {
                // Multiple tabs open, persistence can only be enabled
                // in one tab at a a time.
                enablePersistenceOn= false ;
                // ...
            } else if (err.code === 'unimplemented') {
                // The current browser does not support all of the
                // features required to enable persistence
                // ...
            }
        })
        .then(function() {
          // Initialize Cloud Firestore through firebase
          db = firebase.firestore();

        });
      return db;
    }
  }
  var firestoreDB = {};

  // saves character on the current users "profile" in the database
  firestoreDB.saveCharacter = async function(character) {
    var db = await getDB();
    var user = firebase.auth().currentUser; //gets the current users information from firebase
    var uid = user.uid;
    return(db.collection("users").doc(uid).collection("characters").add({
      character,
    }).then(function() {
    console.log("Document successfully written!");
    }).catch(function(error) {
      console.error("Error writing document: ", error);
    }));
  }


  // gets the saved characters (only the ones that the current user has saved).
  firestoreDB.getSavedCharacter = async function() {
    var db = await getDB();
    var user = firebase.auth().currentUser; //gets the current users information from firebase
    var uid = user.uid;
  
    return db.collection("users").doc(uid).collection("characters").get();
  }


  //removes a character from the database
  firestoreDB.deleteCharacter = async function(character){
    var db = await getDB();
    var user = firebase.auth().currentUser;
    var uid = user.uid;

    //gets all of the characters the active user has saved
    let collectionRef = db.collection("users").doc(uid).collection("characters");
    
    //gets the wanted character by comparing the id. 
    collectionRef.where("character.id", '==', character.id).get()
    .then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete().then(() => {
          console.log("Document successfully deleted!");
        }).catch(function(error) {
          console.error("Error removing document: ", error);
        });
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
    return
  }
  //sets highscore, score is a number
  firestoreDB.setScore = async function(score){
    var db = await getDB();
    var user = firebase.auth().currentUser;
    var uid = user.uid;
    return db.collection("users").doc(uid).collection("highscore").add({
      score,
    }).then(function() {
    console.log("Document successfully written!");
    }).catch(function(error) {
      console.error("Error writing document: ", error);
    });
  }
  
  firestoreDB.updateScore = async function(score){
    var db = await getDB();
    var user = firebase.auth().currentUser;
    var uid = user.uid;
    //deletes the score stored in database
    db.collection("users").doc(uid).collection("highscore").get()
    .then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete().then(() => {
          console.log("Document successfully deleted!");
          //adds the new highscore
            db.collection("users").doc(uid).collection("highscore").add({
              score,
            }).then(function() {
              console.log("Document successfully changed!");
              }).catch(function(error) {
                console.error("Error writing document: ", error);
              });
        }).catch(function(error) {
          console.error("Error removing document: ", error);
        });
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
    
  }

  firestoreDB.getScore = async function(){
    var db = await getDB();
    var user = firebase.auth().currentUser;
    var uid = user.uid;
  
    return db.collection("users").doc(uid).collection("highscore").get();

  }

export default firestoreDB;