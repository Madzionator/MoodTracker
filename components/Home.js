import { StyleSheet, Text, View } from 'react-native';
import Btn from './Btn';
import { 
  ChelaOne_400Regular 
} from '@expo-google-fonts/chela-one'
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

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
      <Btn title = 'Zaloguj' style={styles.btn} />
      <Btn title = 'Zarejestruj' style={styles.btn1}/>
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
  btn1:{
    marginTop:20
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
    marginTop:380,
    marginBottom:10,
  },
});
