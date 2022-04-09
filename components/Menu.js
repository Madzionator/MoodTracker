import { StyleSheet, Text, View } from 'react-native'
import Theme from '../Theme'
import { AntDesign } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Menu = (props) => {
  return (
    <View style = {styles.menu}>
      <AntDesign name="question" size={24} color="black" style ={[styles.icon, props.scene != 'Rating' ? styles.unactive : null]} onPress = {()=>props.setScene('Rating')}/>
      <Octicons name="graph" size={24} color="black" style ={[styles.icon, props.scene != 'Statistics' ? styles.unactive : null]} onPress = {()=>props.setScene('Statistics')}/>
      <Ionicons name="person-outline" size={24} color="black" style ={[styles.icon, props.scene != 'Followers' ? styles.unactive : null]} onPress = {()=>props.setScene('Followers')}/>
      <AntDesign name="setting" size={24} color="black" style ={[styles.icon, props.scene != 'Settings' ? styles.unactive : null]} onPress = {()=>props.setScene('Settings')}/>
    </View>
  )
}

export default Menu

const styles = StyleSheet.create({
    menu:{
        width:'100%',
        backgroundColor:Theme.background,
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    icon:{
        padding:10,
        color: '#4a4a4a'
    },
    unactive:{
      color:'white'
    }
})