import firebase from "firebase"
import { Alert } from "react-native"

export async function addDriveData(driveData) {
  try {
    const db = firebase.firestore()
    db.collection('driveData')
    .add(driveData)
    .then(res => console.log('successfully posted to firebase', res))
    .catch((error) => console.log('wtf', error))
      
  } catch (error) {
    Alert.alert("Server fucked up!", error.message)
  }
}
