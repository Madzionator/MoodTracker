import AsyncStorage from '@react-native-async-storage/async-storage';
export default async function readToken(){ 
  try {
        const value = await AsyncStorage.getItem('MoodTrackerToken')
        if(value !== null) {
          return value
        }
        return null
      } catch(e) {
        // error reading value
        alert(e)
        return null
      }
}