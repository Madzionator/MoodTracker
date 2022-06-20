import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useState, useEffect } from 'react'
import RatingComp from './RatingComp'
import RNPickerSelect from 'react-native-picker-select'
import Btn from './Btn'
import Theme from '../Theme'
import Kategorie from '../Kategorie'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Accept from './Accept';

const Rating = (props) => {
  
  const[userName, setUserName] = useState()
  const [userId, setUserId] = useState()
  const [modalVisible, setModalVisible] = useState(false)
  const now = new Date();
  const yesterday = new Date(now-86400000);
  const twoDays = new Date(now - 172800000);
  const [token,setToken] = useState();
  const [value,setValue] = useState('1')
  const [date,setDate] = useState(now)
  const [selected, setSelected] = useState(null)
  const [bio,setBio] = useState()
  const [reset,setReset] = useState(false)
  const [code, setCode] = useState()

  
  const [answer, setAnswer] = useState({
    1:null,
    2:null,
    3:null,
    4:null,
    5:null,
    6: null,
    7:null
})
  let data = [];
  const createData = () =>
  {
    data = [];
    for(let i=1; i<=7; i++){
      answer[i] != null ?
      data.push(
        {"categoryId":i,
        "value":answer[i]
      }) : null
    }
    //console.log(data);
  }
  const chandleChange = (value) =>{
    value == '1' ? setDate(now) : value == '2' ? setDate(yesterday) : setDate(twoDays)
    setValue(value)
  }
  const ratingList =selected?.map((item)=>
    <RatingComp title = {Kategorie[item-1]} id = {item} onPress = {setAnswer} reset={reset}/>
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
  const handlePost = (e)=>{
    e.preventDefault();
    createData();
    fetch("https://moodtrackerapi.azurewebsites.net/Mood", {
      method: 'POST',    
      headers: {
        Authorization: `Bearer ${token}` ,
        Accept: '*/*',
        AcceptEncoding: 'gzip, deflate, br',
        Connection: 'keep-alive',
        'Content-Type': 'application/json'
   },
     body: JSON.stringify({"dateTime":date,  "values":data}),
      })/*.then((response) => {if( response.status != 200){setCode (response.status); return null} else{setCode(response.status) ; return response.json()}} )
      .then((result) => {
        if(code ==204){
          alert("Pomyślnie przesłano!")
          setReset(!reset)
        }
        else if(code ==200){
         alert(result.advice)
         
        }
        if(code !=200 && code != 204){
          alert("Wystąpił nieznany błąd")
        }
      })
      */
      .then((response) => {
        if( response.status == 204){alert("Pomyślnie przesłano!");
          setReset(!reset); return null} if(response.status ===200){return response.json(); setReset(!reset)} else{alert("Wystąpił nieznany błąd"); return null; }} )
      .then((result) => {
        if(result!=null){
         alert(result.advice)
         
        }
      })
      .catch(error => {console.error(error)})
    };


    const handlePull = ()=>{
      getToken()
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
          //console.log(result)
          setSelected(result);
          //setEdit(!edit)
        })
        .catch(error => {console.error(error)})
      };

    const getWaiting =()=>{
      getToken();
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
          console.log("Oczekujace:")
          console.log(result)
          if (result != null) {
            setUserName(result[0].userName)
            setUserId(result[0].id)
            console.log(result[0].id)
            fetch(`https://moodtrackerapi.azurewebsites.net/Follow/info/${result[0].id}`, {
              method: 'GET',
              headers: {
                Accept: '*/*',
                AcceptEncoding: 'gzip, deflate, br',
                Authorization: `Bearer ${token}`,
                Connection: 'keep-alive'
              },
            }).then((response) => response.status != 200 ? null : response.json())
              .then((result) => {
                setBio(result.bio)
              })
              .catch(error => { console.error(error) })
            
            setModalVisible(true)
          }
        })
        .catch(error => {console.error(error)})
    };

  const sendAsnwers=(e)=>{
    setAnswer((prevState)=>{setAnswer({...prevState, date:date})});
    getToken()
    handlePost(e)
  }
  //
 // useEffect(()=>{getWaiting()},[])
  useEffect(()=>{if(selected===null){handlePull(), getWaiting()}})
  return (
    
      <LinearGradient
      colors={[Theme.background, Theme.backgroundGradient]}
      style={styles.container}
      >
        <ScrollView style = {{ }}>
        <View style = {{width:'80%',height:'100%', marginHorizontal:'10%'}}>
        {ratingList}
        <RNPickerSelect
              value={value}
              onValueChange={(value) =>chandleChange(value)}
              placeholder = {{}}
              style={pickerStyles}
              items={[
                  { label: 'Dziś', value: '1' },
                  { label: 'Wczoraj', value: '2' },
                  { label: 'Dwa dni temu', value: '3' },
              ]}
          />
        <Btn style = {[styles.btn, Theme.shadow]} title = 'Prześlij Odpowiedzi' onPress={sendAsnwers}/>
        </View>
        </ScrollView>
        <Accept modalVisible={modalVisible} setModalVisible={setModalVisible} userName={userName} userId={userId} bio = {bio}/>
      </LinearGradient>
    

  )
}

export default Rating
const pickerStyles = StyleSheet.create({
  
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    backgroundColor:Theme.background,
    borderColor: Theme.lightBackground,
    borderRadius: 10,
    color: 'white',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginHorizontal:'15%',
    marginTop:10
  },
});
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
  btn:{
   // marginBottom:20,
    backgroundColor:Theme.background,
    marginVertical:10,
    marginBottom:20,
    alignSelf:'center'
  },
  select:{
    width:'90%'
  }
})