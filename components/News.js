import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import {useState, useEffect} from 'react'
import Theme from '../Theme'
import Kategorie from '../Kategorie'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Chart from './Chart';
import { LinearGradient } from 'expo-linear-gradient';

const News = (props) => {

  const [token,setToken] = useState();
  const [data, setData] = useState();
  const [waiting,setWaing] = useState();
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
      //console.log(result)
      
    })
    .catch(error => {console.error(error)})
  };
  const handlePullRequests =()=>{
    getToken()
  fetch("https://moodtrackerapi.azurewebsites.net/Follow?list=Waiting", {
   method: 'GET',    
   headers: {
     Accept: '*/*',
     AcceptEncoding:'gzip, deflate, br',
     Authorization: `Bearer ${token}` ,
     Connection: 'keep-alive'
},
    }).then((response) => response.status != 200 ? null : response.json())
    .then((result) => {
      setWaing(result)
      //console.log(result)
      
    })
    .catch(error => {console.error(error)})
  };

  useEffect(()=>{handlePull(), handlePullRequests()},[token])
  const FollowersList =()=>
    <ScrollView>
      {data?.map(item =>
        <View style={styles.listItem}>
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 20 }}>{item.followedId}</Text>
          <FlatList
            data={item.followedValues}
            renderItem={
              ({ item }) => <View style={{width:300, justifyContent:'center', marginRight:10}}><Chart title={Kategorie[item.categoryId - 1]} width={280} data={item.values.map(item => item === null ? item = -1 : item = item)} /></View>
            }
            keyExtractor={(item, index) => index.toString()}
            horizontal
          />
        </View>)}
    </ScrollView>
  return (
    <LinearGradient
      colors={[Theme.background, Theme.backgroundGradient]}
      style={styles.container}
      >
        {/*<FlatList
        style={{backgroundColor:'white', marginTop:20}}
        data={data}
        renderItem={(item)=>{
          <View>
          <Text>{item.followedId}</Text>
          <FlatList
            style={{backgroundColor:'white', marginTop:20}}
            data={data?data:null}
            renderItem={(item)=>{<Chart title={Kategorie[item.categoryId-1]} data = {item.values}/>}}
            keyExtractor={(item) => item.id}
            
            horizontal={false}
          />
          </View>}}
        keyExtractor={(item) => item.id}
        
        horizontal={true}
        />*/}
      {console.log(data)}
      <FollowersList/>
      </LinearGradient>
  )
}

export default News

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
  listItem:{
    backgroundColor:Theme.lightBackground, 
    width:'90%', 
    alignSelf:'center', 
    borderRadius:5,
    padding:5,
    marginVertical:10
  }
})