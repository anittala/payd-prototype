import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AccReadings from './components/AccReadings'
import GyroReadings from './components/GyroReadings'
import Map from './components/Map'
import Home from './components/Home'
import StartJourney from './components/StartJourney'

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

