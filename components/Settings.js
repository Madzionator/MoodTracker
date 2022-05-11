import { StyleSheet, Text,View, ScrollView, TextInput} from 'react-native'
import {useState} from 'react'
import Theme from '../Theme'
import { LinearGradient } from 'expo-linear-gradient'
import Header from './Header'
import Btn from './Btn'
import Checkbox from 'expo-checkbox';
import { TabRouter } from '@react-navigation/native'

const Settings = (props) => {
  const [text, onChangeText] = useState()
  const [hidden, setHidden] = useState(false)
  const [categories, setCategories] = useState({
    'samopoczucie':true,
    'rodzina':true,

  })
  const handleChange = () =>{

  }
  const kategorie = ['samopoczucie', 'rodzina', 'praca', 'szkola', 'hobby']
  const wyborKategori = kategorie.map((item)=>
    <View style={styles.section}>
      <Text style = {{color:'white', fontWeight:'600'}}>{item}</Text>
      <Checkbox style={styles.checkbox} value={true} onValueChange={handleChange} />
    </View>
  )
  return (
    <ScrollView style = {{flex:1,}}>
      <LinearGradient
      colors={[Theme.background, Theme.backgroundGradient]}
      style={styles.container}
      >
        <Header/>
        {/* Część do kategorii*/}
        <View style={styles.section}>
          <Text style = {{color:'white', fontWeight:'600'}}>Ukrycie statystyk</Text>
          <Checkbox style={styles.checkbox} value={hidden} onValueChange={setHidden} />
        </View>

        <View>
          <Text style = {{color:'white', fontWeight:'600'}}>Kategorie do oceny:</Text>
          {wyborKategori}
        </View>
        <TextInput
          onChangeText={onChangeText}
          value={text}
          placeholder = 'Nowe bio'
          style = {styles.bio}
          multiline
        numberOfLines={8}
        />
        <Btn title = 'Zapisz' style = {styles.btn}/>
      </LinearGradient>
    </ScrollView>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop:40,
    marginBottom:0,
    paddingBottom:0
  },
  bio:{
    backgroundColor:'white',
    width:'70%',
    padding:10,
    textAlign:'top'
  },
  btn:{
    backgroundColor:Theme.background,
    marginVertical:20
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    padding:5,
  },
  checkbox:{
    marginLeft:10,
    marginTop:3
  },

})