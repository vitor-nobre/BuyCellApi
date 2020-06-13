const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
    apiKey: "AIzaSyCkJOLySetfjT54EFQGyGSPWkaB5Pnaujw",
    authDomain: "buycell-b75e7.firebaseapp.com",
    databaseURL: "https://buycell-b75e7.firebaseio.com",
    projectId: "buycell-b75e7",
    storageBucket: "buycell-b75e7.appspot.com",
    messagingSenderId: "836685532031",
    appId: "1:836685532031:web:140f3d072c21291410684a"
  }

firebase.initializeApp(firebaseConfig)
  
module.exports = firebase