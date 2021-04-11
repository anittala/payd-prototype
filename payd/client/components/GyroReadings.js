import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Gyroscope } from 'expo-sensors'

const GyroReadings = () => {

    const [gyroData, setGyroData] = useState({ x: 0, y: 0, z: 0 })
    const [subscription, setSubscription] = useState(null)

    const _slow = () => Gyroscope.setUpdateInterval(1000)
    const _fast = () => Gyroscope.setUpdateInterval(16)

    const _subscribe = () => {
        setSubscription(
            Gyroscope.addListener(gyroData => {
                setGyroData(gyroData)
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
    
  const { x, y, z } = gyroData

    return (
        <View style={styles.container}>
            <Text >Gyrofuckingscope</Text>
            <Text >
                gx: {x.toFixed(3)} gy: {y.toFixed(3)} gz: {z.toFixed(3)}
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

export default GyroReadings