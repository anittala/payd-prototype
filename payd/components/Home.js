import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
           <Text> Hello Shitty World!</Text>
           <Button title="Maps" onPress={() => navigation.navigate('Map')} />
           <Button title="Accelererorometer" onPress={() => navigation.navigate('Acc')} />
           <Button title="Gyroscope" onPress={() => navigation.navigate('Gyro')} />
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


  
  