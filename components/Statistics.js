import { StyleSheet, View, ScrollView} from 'react-native'
import { useState, useEffect } from 'react';
import React from 'react'
import Theme from '../Theme';
import Chart from './Chart';
import Btn from './Btn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
import Kategorie from '../Kategorie'
const mockData = [
  {
    title:'Praca',
    data:[
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100
    ]
  },
  {
    title:'Rodzina',
    data:[
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100
    ]
  },
  {
    title:'Hobby',
    data:[
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100
    ]
  },
  {
    title:'Związek',
    data:[
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100,
      Math.random() * 100
    ]
  }
]

const Statistics = (props) => {
  const [token,setToken] = useState();
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
  const [range, setRange] = useState('Weekly')
  const [data,setData] = useState()
  const handlePull = (arg)=>{
    fetch(`https://moodtrackerapi.azurewebsites.net/Mood/${arg}`, {
     method: 'GET',    
     headers: {
       Accept: '*/*',
       AcceptEncoding:'gzip, deflate, br',
       Authorization: `Bearer ${token}` ,
       Connection: 'keep-alive'
  },
      }).then((response) => response.status != 200 ? null : response.json())    //(response) => response.status != 200 ? null : response.json()
      .then((result) => {
        setData(result)
        console.log(result)
      })
      .catch(error => {console.error(error)})
    };
  useEffect(()=>{
    getToken();
    range === 'Weekly' ?  handlePull('week') :  handlePull('month')
    //tutaj pobieranie danych z api w zalezności od opcji miesięcznych albo tygodniowych
  },[range,token])
  const charts = data?.map((item) => <Chart data = {item.values.map(item => item === null ? item = -1: item=item)} title = {Kategorie[item.categoryId-1]} key = {item.categoryId}/>)
  return (
    <View style = {styles.container}>
      <View style= {styles.btnContainer}>
        <Btn title = 'Tygodniowe' style = {[styles.btn, range == 'Weekly'? styles.btnPressed : null]} onPress = {()=>setRange('Weekly')}/>
        <Btn title = 'Miesięczne' style = {[styles.btn, range == 'Monthly'? styles.btnPressed : null]} onPress = {()=>setRange('Monthly')}/>
      </View>
      <ScrollView style = {styles.scroll}>
        {charts}
      </ScrollView>
    </View>
  )
}

export default Statistics

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:Theme.lightBackground
  },
  scroll:{
    flex:1
  },
  btnContainer:{
    flexDirection:'row',
    width:'80%',
    marginHorizontal:'10%',
    marginTop:10,
    borderRadius:5,
    overflow:'hidden',
    padding:5,
    //justifyContent:'space-between'
  },
  btn:{
    backgroundColor:Theme.background,
    padding:3,
    paddingVertical:5,
    margin:0,
    fontSize:20,
    width:'50%',
    borderRadius:0,
  },
  btnPressed:{
    opacity:.5,
  }
})