import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Btn from './Btn';
import Theme from '../Theme'
import { LinearGradient } from 'expo-linear-gradient'
import { 
  ChelaOne_400Regular 
} from '@expo-google-fonts/chela-one'
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import Header from './Header';

export default function Home(props) {
  let [fontsLoaded] = useFonts({
    ChelaOne_400Regular
  });

  if (!fontsLoaded){
    return <AppLoading />
  }

  return (
    <LinearGradient
    colors={[Theme.background, Theme.backgroundGradient]}
    style={styles.container}
    >
      <Header/>
      <Btn title = 'Zaloguj' style={styles.btn} onPress = {()=>props.setScene('Login')}/>
      <Btn title = 'Zarejestruj' style={[styles.btn, Theme.shadow]} onPress = {()=>props.setScene('Register')}/>
      <TouchableOpacity 
        style={styles.footer}
        onPress={()=>props.setScene('About')}>
        <Text>About</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  btn:{
    fontFamily:'cursive',
    backgroundColor:Theme.background
  },
  footer:{
    marginTop: 'auto',
    marginBottom: 15,
    color:'white'
  },
});
