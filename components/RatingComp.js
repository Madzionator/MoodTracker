import { StyleSheet, Text, View } from 'react-native'
import Emoji from './Emoji'

const RatingComp = (props) => {
  return (
    <View style={styles.container}>
        <Text>{props.title}</Text>
        <Emoji code = '&#128557;' onPress = {props.onPress} id = {props.id} value = {0}/>
        <Emoji code = '&#128533;' onPress = {props.onPress} id = {props.id} value = {1}/>
        <Emoji code = '&#128528;' onPress = {props.onPress} id = {props.id} value = {2}/>
        <Emoji code = '&#128522;' onPress = {props.onPress} id = {props.id} value = {3}/>
        <Emoji code = '&#128525;' onPress = {props.onPress} id = {props.id} value = {4}/>
    </View>
  )
}

export default RatingComp

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        backgroundColor: '#5bd970',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
})