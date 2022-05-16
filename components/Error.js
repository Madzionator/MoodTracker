import { StyleSheet, Text, View } from 'react-native'
import Btn from './Btn'
import Theme from '../Theme'
import { LinearGradient } from 'expo-linear-gradient'
import Header from './Header';
const Error = (props) => {
  return (
    <LinearGradient
    colors={[Theme.background, Theme.backgroundGradient]}
    style={styles.container}
    >
      <Header style = {{marginBottom:'25%'}}/>
      <View>
        <Text style={styles.text}> Coś poszło nie tak :/</Text>
        <Btn title = 'Powrót' style={styles.btn} onPress = {()=>props.setScene('Home')}/>
      </View>
    </LinearGradient>
  )
}

export default Error

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  btn:{
    marginHorizontal:'auto',
    marginVertical:'auto',
    alignSelf: 'center',
    backgroundColor:Theme.background,
  },
  text:{
    textAlign: 'center',
    fontSize: 30,
    color:'white',
    fontFamily:'ChelaOne_400Regular',
  },
})