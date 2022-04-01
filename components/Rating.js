import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import RatingComp from './RatingComp'
//tmp
import RNPickerSelect from 'react-native-picker-select';
import Btn from './Btn'

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
    <View style={styles.container}>
      <RatingComp title = 'Rodzina' id = {1} onPress = {setAnswer}/>
      <RatingComp title = 'Studia' id = {2} onPress = {setAnswer}/>
      <RatingComp title = 'Hobby' id = {3} onPress = {setAnswer}/>
      <RNPickerSelect
            value={value}
            onValueChange={(value) =>chandleChange(value)}
            placeholder = {{}}
            items={[
                { label: 'Dziś', value: '1' },
                { label: 'Wczoraj', value: '2' },
                { label: 'Dwa dni temu', value: '3' },
            ]}
        />
      <Btn style = {styles.btn} title = 'Prześlij Odpowiedzi' onPress={()=>{setAnswer((prevState)=>{setAnswer({...prevState, date:date})}); console.log(answer)}}/>
    </View>
  )
}

export default Rating

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop:10
  },
  btn:{
    marginBottom:20
  }
})