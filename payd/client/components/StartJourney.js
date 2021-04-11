import React, { useState } from 'react'
import { StyleSheet, View, Button } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'


const StartJourney = ({ route, navigation }) => {
  
  const GOOGLE_MAPS_API_KEY = 'AIzaSyBJkM5hjGBEOebKjHflIXWh1Y2p6r1QEPw'
  const [coords, setCoords] = useState(route?.params? {latitude: route.params.latitude, longitude: route.params.longitude} : null)
  return (
        <View style={styles.container}>
            
            <GooglePlacesAutocomplete
              placeholder='Search Destination'
              onPress={(data, details = null) => {
                setCoords({latitude: details?.geometry?.location?.lat, longitude: details?.geometry?.location?.lng})
              }}
              query={{  
                key: GOOGLE_MAPS_API_KEY,
                language: 'en',
                components: 'country:in',
              }}
              enablePoweredByContainer={false}
              fetchDetails={true}
            />
           <Button title={!route?.params? "Start" : "Change"} onPress={() => navigation.navigate('Map', coords)} />
                              
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        backgroundColor: '#ecf0f1',
    },
  });
  
export default StartJourney