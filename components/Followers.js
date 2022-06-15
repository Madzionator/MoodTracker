import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import {useState, useEffect} from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Theme from '../Theme'
import Btn from './Btn'
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserView from './UserView'

const Followers = () => {
  const [token, setToken] = useState()
  const [search, setSearch] = useState()
  const [text, setText] = useState('')
  const [selected, setSelected] = useState()
  const [selectedName, setSelectedName] = useState()
  const [modalOpen,setModalOpen] = useState(false)
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
    fetch(`https://moodtrackerapi.azurewebsites.net/User/search?name=${text}`, {
     method: 'GET',    
     headers: {
       Accept: '*/*',
      // AcceptEncoding:'gzip, deflate, br',
       Authorization: `Bearer ${token}` ,
      // Connection: 'keep-alive'
      },
      }).then((response) => response.status != 200 ? null : response.json())
      .then((result) => {
        console.log(result)
        setSearch(result);
      })
      .catch(error => {console.error(error)})
    };
    useEffect(()=>{getToken()},[])
  return (
    <LinearGradient
      colors={[Theme.background, Theme.backgroundGradient]}
      style={styles.container}
      >
        <View style={styles.sContainer}>
          <TextInput 
            style={styles.textInputStyle} 
            onChangeText={setText}
            value={text} 
            placeholder="Szukaj"> 
          </TextInput>
          <Btn title = 'Szukaj' style={styles.btn} onPress={handlePull}>
            <Text style = {styles.text}></Text>
          </Btn>
        </View>


        <ScrollView style={{width:'100%', position:'absolute', top:200}}> 
          {search?.map(item=><TouchableOpacity style={styles.userCard} onPress={()=>{setSelected(item.id); setSelectedName(item.userName); setModalOpen(true)}}><Text>{item.userName}</Text></TouchableOpacity>)}
        </ScrollView>
        <UserView userId={selected} userName={selectedName} modalOpen={modalOpen} setModalOpen={setModalOpen}/>
      </LinearGradient>
  )
}

export default Followers

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    paddingTop:40,
    marginBottom:0,
    paddingBottom:0,
    width:'100%',
    height:'100%',
  },
  sContainer:{
    flex: 1,
    marginTop:'10%',
    flexDirection: 'row',
    alignContent:'center',
    width: '80%',
    alignSelf:'center'
  },
  textInputStyle:{
    height:66,
    marginVertical: 5,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius:5,
    fontSize:20,
    paddingLeft: 5,
    width:'60%',
    color:'white'
  },
  btn:{
    backgroundColor:Theme.background,
    textAlign: 'center',
    marginTop: 5,
    height: 66,
    width: '40%',
  },
  userCard:{
    backgroundColor:'white', 
    borderRadius:5,
    width:'80%',
    alignSelf:'center',
    padding:10,
    marginVertical:10
  }
})