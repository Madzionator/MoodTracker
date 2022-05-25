import { StyleSheet, Text,View, ScrollView, TextInput} from 'react-native'
import {useState} from 'react'
import Theme from '../Theme'
import { LinearGradient } from 'expo-linear-gradient'
import Header from './Header'
import Btn from './Btn'
import Checkbox from 'expo-checkbox';
import { TabRouter } from '@react-navigation/native'
import Kategorie from '../Kategorie'
const Settings = (props) => {
  const [text, onChangeText] = useState()
  const [hidden, setHidden] = useState(false)
  const [changed, setChanged] = useState(false)
  const [selected, setSelected] = useState([true,true,true,true,true,true,true]) //index +1
  const handleChange = (id) =>{
    let tmp = selected
    selected[id] = !selected[id]
    setSelected(tmp)
    console.log(selected)
    setChanged(!changed)//Żeby wywołać reload komponentu
  }
  
  const wyborKategori = Kategorie.map((item, index)=>
    <View style={styles.section} key = {index}>
      <Text style = {{color:'white', fontWeight:'600'}}>{item}</Text>
      <Checkbox style={styles.checkbox} value={selected[index]} onValueChange={()=>handleChange(index)} />
    </View>
  )
  return (
    <ScrollView style = {{flex:1,}}>
      <LinearGradient
      colors={[Theme.background, Theme.backgroundGradient]}
      style={styles.container}
      >
        <Header style = {{marginTop:5}}/>
        {/* Część do kategorii*/}
        <View>
          <Text style = {{color:'white', fontWeight:'600', fontSize:24}}>Kategorie do oceny:</Text>
          {wyborKategori}
        </View>
        <View style={[styles.section,{marginTop:10}]}>
          <Text style = {{color:'white', fontWeight:'600'}}>Statystyki prywatne</Text>
          <Checkbox style={styles.checkbox} value={hidden} onValueChange={setHidden} />
        </View>
        <TextInput
          onChangeText={onChangeText}
          value={text}
          placeholder = 'Nowe bio'
          style = {styles.bio}
          multiline
        numberOfLines={8}
        />
        <Btn title = 'Zapisz' style = {styles.btn} onPress = {()=>{}/**Dodać pusha do api */}/>
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
    padding:10
  },
  btn:{
    backgroundColor:Theme.background,
    marginVertical:20
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    padding:5,
  },
  checkbox:{
    marginLeft:10,
    marginTop:3
  },
})