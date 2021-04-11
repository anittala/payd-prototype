import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Dimensions, Button } from 'react-native'
import  MapView, { Marker, Polyline }  from 'react-native-maps'
import * as Location from 'expo-location'
import MapViewDirections from 'react-native-maps-directions'
import { Accelerometer, Gyroscope } from 'expo-sensors'

import { addDriveData } from '../API/drivingReadings' //FIREBASE FUNC

const Map = ({ route, navigation }) => {

  // ========================
  //    SETTING ACC, GYRO
  // ========================

  const [isSend, setIsSend] = useState(false)

  const [accData, setAccData] = useState({ ax: 0, ay: 0, az: 0 })
  const [accSubscription, setAccSubscription] = useState(null)

  const [gyroData, setGyroData] = useState({ gx: 0, gy: 0, gz: 0 })
  const [gyroSubscription, setGyroSubscription] = useState(null)

  const _subscribe = () => {

      setAccSubscription( Accelerometer.addListener(accData => setAccData({ ax: (Math.round(accData.x * 1000)/1000), ay: (Math.round(accData.y * 1000)/1000), az: (Math.round(accData.z * 1000)/1000) })) )
      setGyroSubscription( Gyroscope.addListener(gyroData =>  setGyroData({ gx: (Math.round(gyroData.x * 1000)/1000), gy: (Math.round(gyroData.y * 1000)/1000), gz: (Math.round(gyroData.z * 1000)/1000) })) )
  }

  const _unsubscribe = () => {
      accSubscription && accSubscription.remove()
      setAccSubscription(null)

      gyroSubscription && gyroSubscription.remove()
      setGyroSubscription(null)
  }

  useEffect(() => {
    const intervalId = setInterval(() => setIsSend(true), 8000)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    _subscribe()

    return () => _unsubscribe()
  }, [])


  // ========================
  //    SENDING TO FIREBASE,
  //     (1 record per 8s)
  // ========================

  useEffect(() => {
    if(isSend && location?.coords?.latitude){
      addDriveData({ acc: accData, gyro: gyroData, 
                     speed: location?.coords?.speed,
                     latitude: location?.coords?.latitude, 
                     longitude: location?.coords?.longitude 
                    })
      setIsSend(false)
    }
  }, [accData])


  // ========================
  //    SETTING LOCATION
  // ========================
  
  const [location, setLocation] = useState(null)
  const [polyArr, setPolyArr] = useState([])
  const origin = {latitude: 19.015, longitude: 73.035}
  const destination = route?.params? {latitude: route.params.latitude, longitude: route.params.longitude} 
                                     : {latitude: 19.015, longitude: 73.05}
  const GOOGLE_MAPS_API_KEY = 'AIzaSyBJkM5hjGBEOebKjHflIXWh1Y2p6r1QEPw'
  useEffect(() => {

        (async () => {          
            let { status } = await Location.requestPermissionsAsync()
            if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied')
            return
            }
        })()
        
    }, [])

  useEffect(() => {
    (async () => {
            let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest})
            setLocation(location)
            setPolyArr(prev => [...prev, { latitude: location?.coords?.latitude, longitude: location?.coords?.longitude }])        
    })()

    }, [location])

    return (
        <View style={styles.container}>
            <Text>latitude is {location?.coords?.latitude}</Text> 
            <Text>longitude is {location?.coords?.longitude}</Text> 
            <Text>speed is {location?.coords?.speed}</Text> 
            <Button title="Change Destiny" onPress={() => navigation.navigate('Start', destination)}/>
            <MapView  style={styles.map} 
                    region={{
                      latitude: location? location.coords?.latitude : 19.015,
                      longitude: location? location?.coords?.longitude : 73.035,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}     
            > 
                    { location? <Marker coordinate={{ latitude: location?.coords?.latitude, 
                                            longitude: location?.coords?.longitude }}>
                                </Marker> : null
                    }
                    <Polyline coordinates={polyArr} strokeColor="#F7588C" strokeWidth={3} />
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_MAPS_API_KEY}
                        strokeWidth={3}
                        strokeColor="hotpink"
                        />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });
  
export default Map