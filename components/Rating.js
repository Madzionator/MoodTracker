import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import RatingComp from './RatingComp'
//tmp
import Btn from './Btn'

const Rating = (props) => {
  const [answer, setAnswer] = useState({
    1:null,
    2:null,
    3: null
})
  return (
    <View style={styles.container}>
      <RatingComp title = 'Rodzina' id = {1} onPress = {setAnswer}/>
      <RatingComp title = 'Studia' id = {2} onPress = {setAnswer}/>
      <RatingComp title = 'Hobby' id = {3} onPress = {setAnswer}/>
      <Btn style = {styles.btn} title = 'Prześlij Odpowiedzi' onPress={()=>console.log(answer)}/>
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