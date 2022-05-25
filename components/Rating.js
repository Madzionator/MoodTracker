import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useState } from 'react'
import RatingComp from './RatingComp'
import RNPickerSelect from 'react-native-picker-select'
import Btn from './Btn'
import Theme from '../Theme'
import Kategorie from '../Kategorie'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Rating = (props) => {
  const now = new Date();
  const yesterday = new Date(now-86400000);
  const twoDays = new Date(now - 172800000);
  const [token,setToken] = useState();
  const [value,setValue] = useState('1')
  const [date,setDate] = useState(now)
  const [answer, setAnswer] = useState({
    1:null,
    2:null,
    3:null,
    4:null,
    5:null,
    6: null,
    7:null
})
  const data = [];
  const createData = () =>
  {
    for(let i=1; i<=7; i++){
      answer[i] != null ?
      data.push(
        {"categoryId":i,
        "value":answer[i]
      }) : null
    }
  }
  const chandleChange = (value) =>{
    value == '1' ? setDate(now) : value == '2' ? setDate(yesterday) : setDate(twoDays)
    setValue(value)
  }
  const ratingList = Kategorie.map((item, id)=>
    <RatingComp title = {item} id = {id} onPress = {setAnswer}/>
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
  const handlePost = ()=>{
    createData();
    fetch("https://moodtrackerapi.azurewebsites.net/Mood", {
     method: 'POST',    
     headers: {
       Accept: '*/*',
       AcceptEncoding:'gzip, deflate, br',
       Authorization: `Bearer ${token}` ,
       Connection: 'keep-alive'
  },
     body: JSON.stringify({"dateTime":date,  "values":data}),
      }).then((response) => console.log(response.status))
      .catch(error => {console.error(error)})
    };
  const sendAsnwers=()=>{
    setAnswer((prevState)=>{setAnswer({...prevState, date:date})});
    getToken();
    handlePost();
  }
  return (
    <ScrollView style = {{flex:1}}>
      <LinearGradient
      colors={[Theme.background, Theme.backgroundGradient]}
      style={styles.container}
      >
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
      </LinearGradient>
    </ScrollView>

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
    paddingBottom:0
  },
  btn:{
   // marginBottom:20,
    backgroundColor:Theme.background,
    marginVertical:10,
    marginBottom:20
  },
  select:{
    width:'90%'
  }
})