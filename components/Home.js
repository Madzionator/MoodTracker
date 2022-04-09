import { StyleSheet, Text, View } from 'react-native';
import Btn from './Btn';
import Login from './Login';
import { 
  ChelaOne_400Regular 
} from '@expo-google-fonts/chela-one'
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { TouchableNativeFeedback } from 'react-native-web';

export default function Home() {
  let [fontsLoaded] = useFonts({
    ChelaOne_400Regular
  });

  if (!fontsLoaded){
    return <AppLoading />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Mood Tracker</Text>
      <Btn title = 'Zaloguj' style={styles.btn} onPress = {()=>props.setScene('Login')}/>
      <Btn title = 'Zarejestruj' style={styles.btn} onPress = {()=>props.setScene('Register')}/>
      <Text style={styles.footer}>About</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5ba7f',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  titleText:{
    color: 'orange',
    fontSize:28,
    fontWeight:"900",
    marginTop:80

  },
  btn:{
    marginTop:150,
    fontFamily:'cursive',

  },
  titleText:{
    textAlign: 'center',
    color: '#ffffff',
    fontSize:65,
    fontWeight:'bold',
    marginTop:120,
    fontFamily:'ChelaOne_400Regular',
  },
  footer:{
    marginTop: 'auto',
    marginBottom: 10,
  },
});
