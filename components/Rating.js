import { StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useState } from 'react'
import RatingComp from './RatingComp'
import RNPickerSelect from 'react-native-picker-select'
import Btn from './Btn'
import Theme from '../Theme'

const Rating = (props) => {
  const now = new Date();
  const yesterday = new Date(now-86400000);
  const twoDays = new Date(now - 172800000);
  const [value,setValue] = useState('1')
  const [date,setDate] = useState(now)
  const [answer, setAnswer] = useState({
    1:null,
    2:null,
    3: null,
    date:date
})
  const chandleChange = (value) =>{
    value == '1' ? setDate(now) : value == '2' ? setDate(yesterday) : setDate(twoDays)
    setValue(value)
  }

  return (
    <LinearGradient
    colors={[Theme.background, Theme.backgroundGradient]}
    style={styles.container}
    >
      <RatingComp title = 'Rodzina' id = {1} onPress = {setAnswer}/>
      <RatingComp title = 'Studia' id = {2} onPress = {setAnswer}/>
      <RatingComp title = 'Hobby' id = {3} onPress = {setAnswer}/>
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
      <Btn style = {styles.btn} title = 'Prześlij Odpowiedzi' onPress={()=>{setAnswer((prevState)=>{setAnswer({...prevState, date:date})}); console.log(answer)}}/>
    </LinearGradient>
  )
}

export default Rating
const pickerStyles = StyleSheet.create({
  
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical:'10%',
    borderWidth: 0.5,
    backgroundColor:Theme.background,
    borderColor: Theme.lightBackground,
    borderRadius: 8,
    color: 'white',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop:10
  },
  btn:{
    marginBottom:20,
    backgroundColor:Theme.background,
  },
  select:{
    width:'90%'
  }
})