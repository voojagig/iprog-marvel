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

  // USERS
  firestoreDB.saveComic = async function(comicTitle) {
    var db = await getDB();
    var user = firebase.auth().currentUser; //gets the current users information from firebase
    var uid = user.uid;
    console.log(user.email);
    console.log(uid);
    //doc should be user.uid, so that every user as a doc with data/fields
    return(db.collection("users").doc(uid).set({
      comic: comicTitle,
    }).then(function() {
    console.log("Document successfully written!");
    }).catch(function(error) {
      console.error("Error writing document: ", error);
    }));
  }

  firestoreDB.getSavedComic = async function() {
    console.log("i get saved comics")
    var db = await getDB();
    var user = firebase.auth().currentUser; //gets the current users information from firebase
    var uid = user.uid;
    console.log(uid)

    db.collection("users").doc(uid).get().then(function(doc) {
      console.log(doc)
      if(doc.exists){
        console.log("doc data ". doc.data());
        return doc.data();

      }
      else{ 
        console.log("no such doc.")
      }
    }).catch(function(error){
        console.log("error: ", error)

    });  
  }

  //  EXAMPLE FUNCTIONS:   TEAMS
  firestoreDB.addTeam = async function(name, logo) {
    var db = await getDB();
    return (db.collection("teams").add({
      name: name,
      logo: logo,
      wins: 0,
      losses: 0
    }));
  }

  firestoreDB.getTeam = async function(teamID) {
    var db = await getDB();
    return db.collection("teams").doc(teamID).get();
  }

  firestoreDB.setTeam = async function(teamID, teamData){
    var db = await getDB();
    return db.collection("teams").doc(teamID).set(teamData);
  }
  // OPPONENTS
  firestoreDB.addOpponent = async function(teamID, opName, logo) {
    var db = await getDB();
    return db.collection("teams").doc(teamID).collection("opponents").add({
      name: opName,
      logo: logo,
      active: true
    });
  }

  firestoreDB.getOpponent = async function(teamID, opID){
    var db = await getDB();
    return db.collection("teams").doc(teamID).collection("opponents").doc(opID).get();
  }

  firestoreDB.getAllOpponents = async function(teamID){
    var db = await getDB();
    return db.collection("teams").doc(teamID).collection("opponents").get();
  }

  firestoreDB.setOpponent = async function(teamID, opID, opponent){
    var db = await getDB();
    return db.collection("teams").doc(teamID).collection("opponents").doc(opID).set(opponent);
  }

  firestoreDB.deleteOpponent = async function(teamID, opID){
    var db = await getDB();
    return db.collection("teams").doc(teamID).collection("opponents").doc(opID).delete();
  }

  firestoreDB.setInactive = async function(teamID, opID){
    var db = await getDB();
    return db.collection("teams").doc(teamID).collection("opponents").doc(opID).set({active: false},{merge: true});
  }




export default firestoreDB;