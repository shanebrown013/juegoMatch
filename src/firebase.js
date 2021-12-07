
import firebase from "firebase";
import React, { useState, useEffect } from "react";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBn591RDvmVD0sBJ_I_4_BqIlYSqKGgw6U",
  authDomain: "csce315juego.firebaseapp.com",
  databaseURL: "https://csce315juego-default-rtdb.firebaseio.com",
  projectId: "csce315juego",
  storageBucket: "csce315juego.appspot.com",
  messagingSenderId: "625662849250",
  appId: "1:625662849250:web:2475dc0170fe297f9daebb",
  measurementId: "G-WS2K8BP3B5"
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