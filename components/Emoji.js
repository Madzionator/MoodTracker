import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import Theme from '../Theme'

const Emoji = (props) => {
    const chandlePress = () =>{
        props.onPress(prevState=>({
            ...prevState,
            [props.id]:props.value
        }))
        props.setPressed(props.value)
    }
  return (
    <TouchableOpacity style = {styles.emoji} onPress={chandlePress}>
      <Text style = {[styles.emojiText, props.pressed != props.value ? styles.emojiTextBlank:null]}>{props.code}</Text>
    </TouchableOpacity>
  )
}

export default Emoji

const styles = StyleSheet.create({
    emoji:{
        padding:5
    },
    emoji:{
      padding:5,
      borderRadius:10,
    },
    emojiText:{
        fontSize:50,
        textAlign:'center'
    },
    emojiTextBlank:{
      opacity:.4,
      fontSize:40,
  }
})