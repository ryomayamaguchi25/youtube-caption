import React, { useState, Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import './Style.css';
import * as firebase from "firebase/app";
import * as firebaseui from 'firebaseui'
// import "firebase/auth";
import "firebase/firestore";

import axios from 'axios'

//モジュールに対して require を実行
// var firebaseui = require('firebaseui');
// var firebase = require('firebase');


//つなぐfirebaseの設定
const firebaseConfig = {
    apiKey: "AIzaSyDl8px9qGYosh8JB8EWj4QsT7OJnRzBaTo",
    authDomain: "caption-e3579.firebaseapp.com",
    databaseURL: "https://caption-e3579.firebaseio.com",
    projectId: "caption-e3579",
    storageBucket: "caption-e3579.appspot.com"
};
//Auth UI を初期化します。
firebase.initializeApp(firebaseConfig);


//Auth UI を初期化します。
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var db = firebase.firestore();


//サポートするログイン方法を事前に有効にして設定
ui.start('#firebaseui-auth-container', {
    signInOptions: [
        // List of OAuth providers supported.
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    // Other config options...
});




//FirebaseUI の設定を指定します（サポートするプロバイダ、UI のカスタマイズ、成功時のコールバックなど）。
var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            // document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'index',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '',
    // Privacy policy url.
    privacyPolicyUrl: '',
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
};
ui.start('#firebaseui-auth-container', uiConfig);


const Auth = () => {
    const logout = () => {
        console.log("clicked");
        firebase.auth().signOut().then(() => {
            console.log("ログアウトしました");
        })
            .catch((error) => {
                console.log(`ログアウト時にエラーが発生しました (${error})`);
            });
    }

    console.log('auth');
    return (
        <div>
            <h1>Welcome to My Awesome App</h1>
            <div id="firebaseui-auth-container"></div>
            <div id="loader">Loading...</div>
            <div id="userID"></div>
            <button onClick={logout}>logout</button>
        </div >
    )
}



const connectDB = (uid) => {
    var docRef = db.collection("users").doc(uid);
    docRef.get().then(function (doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());

            for (var data in doc.data()) {
                console.log(data);
                console.log(doc.data()[data]);
            }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            console.log(uid);
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}



firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log('user:' + user.uid);

        connectDB(user.uid);

        document.getElementById('userID').innerHTML = user.uid
    } else {
        console.log('not login');
        // No user is signed in.
        ui.start('#firebaseui-auth-container', uiConfig);
        document.getElementById('userID').innerHTML = "---";
    }
});



export default Auth;
