import { StyleSheet, Text, View } from 'react-native'
import Btn from './Btn'
const About = (props) => {
  return (
    <View>
      <Text>About</Text>
      <Btn title = 'Powrót' style={styles.btn} onPress = {()=>props.setScene('Home')}/>
    </View>
  )
}

export default About

const styles = StyleSheet.create({})