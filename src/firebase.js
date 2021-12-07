
import firebase from "firebase";
import React, { useState, useEffect } from "react";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyD0ihYHQCn5zKc6EWL_eLnrhW-iQYnK37I",
    authDomain: "juegomatch.firebaseapp.com",
    databaseURL: "https://juegomatch.firebaseio.com",
    projectId: "juegomatch",
    storageBucket: "juegomatch.appspot.com",
    messagingSenderId: "263342703264",
    appId: "1:263342703264:web:8a5cb0bfa18943f0343fc5"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)

const database = firebaseApp.firestore();

var UUID;
var uservar

    
firebase.auth().onAuthStateChanged(function(user) 
{
  console.log('user', user);
  firebaseApp.user = user;
  if (user != null) 
  {
    UUID = user.uid;
    uservar = user.photoURL
    uservar = uservar.replace("96", "500");
    console.log('uuid:',UUID)
    console.log("uservar", uservar)
    // window.location = "/swipepagemain"
  }
  
    // return;
    //     var label = document.createElement("div");
    //     label.id = "profileIMG";
    //     label.innerHTML = '<img src = "' + user.photoURL + '" style="border-radius: 10px" />';
    //     document.body.appendChild(label);
})
  





export {database, UUID, uservar}