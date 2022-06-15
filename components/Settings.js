import { StyleSheet, Text,View, ScrollView, TextInput} from 'react-native'
import {useState, useEffect} from 'react'
import Theme from '../Theme'
import { LinearGradient } from 'expo-linear-gradient'
import Header from './Header'
import Btn from './Btn'
import Checkbox from 'expo-checkbox';
import { TabRouter } from '@react-navigation/native'
import Kategorie from '../Kategorie'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = (props) => {
  const [text, onChangeText] = useState()
  const [hidden, setHidden] = useState(false)
  const [selected, setSelected] = useState([true,false,false,true,true,true,true]) //index +1
  const [edit, setEdit] = useState(false)
  const handleChange = (id) =>{
    let tmp = selected
    selected[id] = !selected[id]
    setSelected(tmp)
    console.log(selected)
    setEdit(!edit);
  }



  const [token,setToken] = useState();
  const wyborKategori = Kategorie.map((item, index)=>
    <View style={styles.section} key = {index}>
      <Text style = {{color:'white', fontWeight:'600'}}>{item}</Text>
      <Checkbox style={styles.checkbox} value={selected[index]} onValueChange={()=>handleChange(index)} />
    </View>
  )

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
    fetch("https://moodtrackerapi.azurewebsites.net/UserCategory", {
     method: 'GET',    
     headers: {
       Accept: '*/*',
       AcceptEncoding:'gzip, deflate, br',
       Authorization: `Bearer ${token}` ,
       Connection: 'keep-alive'
  },
      }).then((response) => response.status != 200 ? null : response.json())
      .then((result) => {
        let tmp = [false,false,false,false,false,false,false];
        result === null ? null : result.map(item=>tmp[item-1] = true)
        setSelected(tmp);
        setEdit(!edit)
        console.log(selected)
      })
      .catch(error => {console.error(error)})
    };
    let data = [];
    const createData = () =>{
      data = [];
      for(let i=1; i<=7; i++){
        selected[i-1] ===true ?
        data.push(i) : null
      }
    }
  const handlePush = () =>{
    createData();
    fetch("https://moodtrackerapi.azurewebsites.net/UserCategory", {
     method: 'POST',    
     headers: {
       Accept: '*/*',
       AcceptEncoding:'gzip, deflate, br',
       Authorization: `Bearer ${token}` ,
       Connection: 'keep-alive',
       'Content-Type': 'application/json',
  },body: JSON.stringify(data),
      }).then((response) => console.log(response.status))
      .catch(error => {console.error(error)})
    };
  const handlePrivatePush=()=>{
    fetch("https://moodtrackerapi.azurewebsites.net/User", {
      method: 'PATCH',    
      headers: {
        Accept: '*/*',
        AcceptEncoding:'gzip, deflate, br',
        Authorization: `Bearer ${token}` ,
        Connection: 'keep-alive',
        'Content-Type': 'application/json',
   },body: JSON.stringify({bio:text,
                          isPrivate:hidden}),
       }).then((response) => console.log(response.status))
       .catch(error => {console.error(error)})
  }
  const handlePrivatePull = ()=>{
    fetch("https://moodtrackerapi.azurewebsites.net/User", {
     method: 'GET',    
     headers: {
       Accept: '*/*',
       AcceptEncoding:'gzip, deflate, br',
       Authorization: `Bearer ${token}` ,
       Connection: 'keep-alive'
  },
      }).then((response) => response.status != 200 ? null : response.json())
      .then((result) => {
        console.log(result);
        result!=null? (setHidden(result.isPrivate),
        onChangeText(result.bio)):null
      })
      .catch(error => {console.error(error)})
    };
  useEffect(()=>getToken(),[])
  useEffect(() => {
    handlePull();
    handlePrivatePull();
  },[token]);
  //Wymusza reload
  useEffect(()=>setEdit(true),[edit])
  return (
      <LinearGradient
      colors={[Theme.background, Theme.backgroundGradient]}
      style={styles.container}
      >
        <Header style = {{marginTop:5}}/>
        {/* Część do kategorii*/}
        <View>
          <Text style = {{color:'white', fontWeight:'600', fontSize:24}}>Kategorie do oceny:</Text>
          {wyborKategori}
        </View>
        <View style={[styles.section,{marginTop:10}]}>
          <Text style = {{color:'white', fontWeight:'600'}}>Statystyki prywatne</Text>
          <Checkbox style={styles.checkbox} value={hidden} onValueChange={setHidden} />
        </View>
        <TextInput
          onChangeText={onChangeText}
          value={text}
          placeholder = 'Nowe bio'
          style = {styles.bio}
          multiline
        numberOfLines={8}
        />
        <Btn title = 'Zapisz' style = {styles.btn} onPress = {()=>{createData(), handlePush(), handlePrivatePush()}/**Dodać pusha do api */}/>
      </LinearGradient>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop:40,
    marginBottom:0,
    paddingBottom:0,
    height:'100%'
  },
  bio:{
    backgroundColor:'white',
    width:'70%',
    padding:10,
    marginTop:10
  },
  btn:{
    backgroundColor:Theme.background,
    marginVertical:20
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    padding:5,
  },
  checkbox:{
    marginLeft:10,
    marginTop:3
  },
})