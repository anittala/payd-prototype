import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBA2W_5lQwArXHwZtpSt8VaPnWX9SyeUSI",
    authDomain: "payd-97c67.firebaseapp.com",
    databaseURL: "https://payd-97c67-default-rtdb.firebaseio.com",
    projectId: "payd-97c67",
    storageBucket: "payd-97c67.appspot.com",
    messagingSenderId: "211050785424",
    appId: "1:211050785424:web:fc6a857605a36e6ecb8615",
    measurementId: "G-2GZCGE23EF"
  }
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// firebase.analytics();

export default firebaseConfig