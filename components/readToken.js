import AsyncStorage from '@react-native-async-storage/async-storage';
const readToken =async()=>{
      try {
        const value = await AsyncStorage.getItem('MoodTrackerToken')
        if(value !== null) {
          console.log(value)
          return value
        }
        return null
      } catch(e) {
        // error reading value
        alert(e)
        return null
      }
}