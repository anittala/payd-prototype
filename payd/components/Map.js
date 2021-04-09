import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Dimensions, Button } from 'react-native'
import  MapView, { Marker, Polyline }  from 'react-native-maps'
import * as Location from 'expo-location'
import MapViewDirections from 'react-native-maps-directions'

const Map = ({ navigation }) => {

  const [location, setLocation] = useState(null)
  const [polyArr, setPolyArr] = useState([])
  const origin = {latitude: 19.015, longitude: 73.035}
  const destination = {latitude: 19.015, longitude: 73.05}
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
        <View>
            <Text>latitude is {location?.coords?.latitude}</Text> 
            <Text>longitude is {location?.coords?.longitude}</Text> 
            <Text>speed is {location?.coords?.speed}</Text> 
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
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });
  
export default Map