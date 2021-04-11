import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AccReadings from './components/AccReadings'
import GyroReadings from './components/GyroReadings'
import Map from './components/Map'
import Home from './components/Home'
import StartJourney from './components/StartJourney'
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

// Routing Page
export default function App() {
  const Stack = createStackNavigator()

  return (
       <NavigationContainer>
         <Stack.Navigator  initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Start" component={StartJourney} />
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen name="Gyro" component={GyroReadings} />
            <Stack.Screen name="Acc" component={AccReadings} />
         </Stack.Navigator>
       </NavigationContainer>
  )
}

