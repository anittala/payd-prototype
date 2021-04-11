import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import axios from 'axios'

const url = 'http://192.168.43.17:5000' // LOCALHOST:5000 (FLASK END POINT)

const Home = ({ navigation }) => {
  
  // ================================
  //  CALL THIS FUNC WHEN TRIP OVER
  // ================================

  const callToFlask = () => {
    axios.get(`${url}/tripOver`)
    .then(res => console.log('res', res.data))
    .catch(error => console.log(error))
  }

    return (
        <View style={styles.container}>
           <Text> Hello Beautiful World!</Text>
           <Button title="Accelererorometer" onPress={() => navigation.navigate('Acc')} />
           <Button title="Gyroscope" onPress={() => navigation.navigate('Gyro')} />
           <Button title="Start Journey" onPress={() => navigation.navigate('Start')} />
           <Button title="axios" onPress={callToFlask} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })

export default Home


  
  