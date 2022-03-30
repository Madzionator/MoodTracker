import { StyleSheet, Text, View } from 'react-native'
import Btn from './Btn'
const Error = (props) => {
  return (
    <View>
      <Text>Error</Text>
      <Btn title = 'Powrót' style={styles.btn} onPress = {()=>props.setScene('Rating')}/>
    </View>
  )
}

export default Error

const styles = StyleSheet.create({})