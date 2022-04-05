import { StyleSheet, Text, View } from 'react-native'
import Emoji from './Emoji'
import Theme from '../Theme'

const RatingComp = (props) => {
  return (
    <View style={[styles.container, Theme.shadow]}>
        <Text style = {styles.title}>{props.title}</Text>
        <View style={styles.EmojiContainer}>
            <Emoji code = '&#128557;' onPress = {props.onPress} id = {props.id} value = {0}/>
            <Emoji code = '&#128533;' onPress = {props.onPress} id = {props.id} value = {1}/>
            <Emoji code = '&#128528;' onPress = {props.onPress} id = {props.id} value = {2}/>
            <Emoji code = '&#128522;' onPress = {props.onPress} id = {props.id} value = {3}/>
            <Emoji code = '&#128525;' onPress = {props.onPress} id = {props.id} value = {4}/>
        </View>
    </View>
  )
}

export default RatingComp

const styles = StyleSheet.create({
    container:{
        backgroundColor:Theme.lightBackground,
        borderRadius:10,
        padding:5
    },
    EmojiContainer: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title:{
        textAlign:'center',
        fontSize:24,
        fontWeight:"700",
        color:'white'
    }
})