import { StyleSheet, Text, View } from 'react-native';
import Btn from './Btn';

export default function Home() {
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
    fontHeight:37,
    fontFamily:'cursive',

  },
  titleText:{
    color: '#ffffff',
    fontSize:60,
    fontWeight:'bold',
    marginTop:120,
    fontFamily:'cursive',
  },
  footer:{
    marginTop:415,
  },
});
