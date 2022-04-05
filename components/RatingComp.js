import { StyleSheet, Text, View } from 'react-native'
import Emoji from './Emoji'
import Theme from '../Theme'
import {useState} from 'react'

const RatingComp = (props) => {
    const [pressed, setPressed] = useState()
  return (
    <View style={[styles.container, Theme.shadow]}>
        <Text style = {styles.title}>{props.title}</Text>
        <View style={styles.EmojiContainer}>
            <Emoji code = '&#128557;' onPress = {props.onPress} id = {props.id} value = {0} pressed={pressed} setPressed = {setPressed}/>
            <Emoji code = '&#128533;' onPress = {props.onPress} id = {props.id} value = {1} pressed={pressed} setPressed = {setPressed}/>
            <Emoji code = '&#128528;' onPress = {props.onPress} id = {props.id} value = {2} pressed={pressed} setPressed = {setPressed}/>
            <Emoji code = '&#128522;' onPress = {props.onPress} id = {props.id} value = {3} pressed={pressed} setPressed = {setPressed}/>
            <Emoji code = '&#128525;' onPress = {props.onPress} id = {props.id} value = {4} pressed={pressed} setPressed = {setPressed}/>
        </View>
    </View>
  )
}

export default RatingComp

const styles = StyleSheet.create({
    container:{
        backgroundColor:Theme.lightBackground,
        borderRadius:10,
        minHeight:110, //Dla stabilnej zmiany rozmiaru emoji po kliknięciu
        minWidth:340
    },
    EmojiContainer: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title:{
        width:'100%',
        textAlign:'center',
        fontSize:24,
        fontWeight:'700',
        color:'white'
    }
})