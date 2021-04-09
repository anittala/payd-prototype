import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Accelerometer } from 'expo-sensors'

const AccReadings = () => {
    const [accData, setAccData] = useState({ x: 0, y: 0, z: 0 })
    const [subscription, setSubscription] = useState(null)

    const _slow = () => Accelerometer.setUpdateInterval(1000)
    const _fast = () => Accelerometer.setUpdateInterval(16)

    const _subscribe = () => {
        setSubscription(
            Accelerometer.addListener(accelerometerData => {
                setAccData(accelerometerData)
            })
        )
    }

    const _unsubscribe = () => {
        subscription && subscription.remove()
        setSubscription(null)
    }

    useEffect(() => {
        _subscribe()
        return () => _unsubscribe()
    }, [])
    
  const { x, y, z } = accData
    return (
        <View style={styles.container}>
             <Text>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
             <Text>
                     x: {Math.round(x)} y: {Math.round(y)} z: {Math.round(z)}
             </Text>
            <View>
                <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} >
                    <Text>{subscription ? 'On' : 'Off'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_slow} >
                    <Text>Slow</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_fast} >
                    <Text>Fast</Text>
                </TouchableOpacity>
            </View> 
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

export default AccReadings