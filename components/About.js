import { StyleSheet, Text, View, ScrollView } from 'react-native'
import Btn from './Btn'
import Theme from '../Theme'
import { LinearGradient } from 'expo-linear-gradient'
import Header from './Header';
const About = (props) => {
  return (
    <LinearGradient
    colors={[Theme.background, Theme.backgroundGradient]}
    style={styles.container}
    >
      <Header style = {{marginBottom:'15%'}}/>
      <ScrollView>
        <Text style={styles.text}>Copyright YEAR COPYRIGHT HOLDER
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</Text>
        <Btn title = 'Powrót' style={styles.btn} onPress = {()=>props.setScene('Home')}/>
      </ScrollView>
    </LinearGradient>
  )
}

export default About

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  btn:{
    marginHorizontal:'auto',
    alignSelf: 'center',
    backgroundColor:Theme.background,
    marginBottom:'10%',
  },
  text:{
    marginLeft:'5%',
    marginRight:'5%',
    textAlign: 'center',
    fontSize: 30,
    color:'white',
    fontFamily:'ChelaOne_400Regular',
  },
})
