import { StyleSheet, Text, View } from 'react-native';
import Btn from './Btn';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Mood Tracker</Text>
      <Btn title = 'Zaloguj' style={styles.btn} />
      <Btn title = 'Zarejestruj' style={styles.btn}/>
      <Text style={styles.footer}>About</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#279db7',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  btn:{
    marginTop:10
  },
  titleText:{
    fontSize:28,
    fontWeight:900,
    marginTop:80
  },
  footer:{
    marginTop:580,
  },
});
