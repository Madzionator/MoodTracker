import { StyleSheet, Text, View, FlatList } from 'react-native'
import {useState, useEffect} from 'react'
import Theme from '../Theme'
import Kategorie from '../Kategorie'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Chart from './Chart';

const News = (props) => {

  const [token,setToken] = useState();
  const [data, setData] = useState();
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
  fetch("https://moodtrackerapi.azurewebsites.net/Mood/followmoods", {
   method: 'GET',    
   headers: {
     Accept: '*/*',
     AcceptEncoding:'gzip, deflate, br',
     Authorization: `Bearer ${token}` ,
     Connection: 'keep-alive'
},
    }).then((response) => response.status != 200 ? null : response.json())
    .then((result) => {
      setData(result)
      console.log(result)
      
    })
    .catch(error => {console.error(error)})
  };
  useEffect(()=>{handlePull()},[])
  return (
    <View style = {styles.container}>
      <FlatList
        data={data?data:null}
        renderItem={(item)=>{<Chart title={Kategorie[item.categoryId-1]} data = {item.values}/>}}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        horizontal={true}
      />
    </View>
  )
}

export default News

const styles = StyleSheet.create({})