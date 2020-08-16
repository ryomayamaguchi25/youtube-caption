import React, { useState, Component, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


// const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");

// // Initialize Cloud Firestore through Firebase
// firebase.initializeApp({
//     apiKey: 'AIzaSyDl8px9qGYosh8JB8EWj4QsT7OJnRzBaTo',
//     authDomain: 'caption-e3579.firebaseapp.com',
//     projectId: 'caption-e3579'
// });

// var db = firebase.firestore();




// var docRef = db.collection("cities").doc("SF");
// docRef.get().then(function(doc) {
//     if (doc.exists) {
//         console.log("Document data:", doc.data());
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch(function(error) {
//     console.log("Error getting document:", error);
// });


// db.collection("usersuserID").doc('userID').get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         console.log('-----------------DATABASE------')
//         console.log(doc.data())
//         // setHistory(doc.data().videoID)
//     });
// });

export default function Database() {
    // const [history, setHistory] = useState('')
    // useEffect(() => {
    //     db.collection("users").doc('3Cal8Dzej2gMH2bgtzrE3rqwNZU2').get().then((doc) => {
    //         console.log(doc.data());
    //     });

    // }, [])

    // firebase.auth().onAuthStateChanged(function (user) {
    //     if (user) {
    //         // User is signed in.
    //         console.log(user);

    //     } else {
    //         // No user is signed in.
    //         console.log('NOT LOGGED IN');

    //     }
    // });

    return (
        <div>DATABASE</div>
    )
}
