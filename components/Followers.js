import { StyleSheet, TextInput, Text, View } from 'react-native'
import Btn from './Btn';
import Theme from '../Theme'
import React from 'react'
const Followers = () => {
  const [text, onChangeText] = React.useState(null);
  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.textInputStyle} 
        onChangeText={onChangeText}
        value={text} 
        placeholder="Szukaj"> 
      </TextInput>
      <Btn title = 'Szukaj' style={styles.btn}>
        <Text style = {styles.text}></Text>
      </Btn>
    </View>
  )
}

export default Followers


const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop:'10%',
    flexDirection: 'row',
    alignContent:'center',
    width: '70%',
  },
  textInputStyle:{
    height:66,
    margin: 5,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius:5,
    fontSize:20,
    paddingLeft: 5,
  },
  btn:{
    backgroundColor:Theme.background,
    textAlign: 'center',
    marginTop: 5,
    height: 66,
    width: '55%',
  },
})