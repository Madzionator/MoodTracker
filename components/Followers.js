import { StyleSheet, Text, View } from 'react-native'
import {useState, useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Theme from '../Theme'

const Followers = () => {
  const [token, setToken] = useState()
  const [search, setSearch] = useState()
  const [text, setText] = useState('')
  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('MoodTrackerToken')
      if(value !== null) {
        setToken(value)
      }
    } catch(e) {
      // error reading value
    }
  }
  const handlePull = ()=>{
    getToken()
    fetch(`https://moodtrackerapi.azurewebsites.net/User/search?name=${text}`, {
     method: 'GET',    
     headers: {
       Accept: '*/*',
       AcceptEncoding:'gzip, deflate, br',
       Authorization: `Bearer ${token}` ,
       Connection: 'keep-alive'
      },
      }).then((response) => response.status != 200 ? null : response.json())
      .then((result) => {
        console.log(result)
        setSearch(result);
      })
      .catch(error => {console.error(error)})
    };
    useEffect(()=>{handlePull()})
  return (
    <LinearGradient
      colors={[Theme.background, Theme.backgroundGradient]}
      style={styles.container}
      >

      </LinearGradient>
  )
}

export default Followers

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop:40,
    marginBottom:0,
    paddingBottom:0,
    width:'100%',
    height:'100%'
  },
})