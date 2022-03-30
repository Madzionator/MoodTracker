import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

const Emoji = (props) => {
    const chandlePress = () =>{
        props.onPress(prevState=>({
            ...prevState,
            [props.id]:props.value
        }))
    }
  return (
    <TouchableOpacity style = {styles.emoji} onPress={chandlePress}>
      <Text style = {styles.emojiText}>{props.code}</Text>
    </TouchableOpacity>
  )
}

export default Emoji

const styles = StyleSheet.create({
    emoji:{
        padding:5
    },
    emojiText:{
        fontSize:40,
        textAlign:'center'
    }
})