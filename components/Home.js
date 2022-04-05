import { StyleSheet, Text, View } from 'react-native';
import Btn from './Btn';

export default function Home(props) {
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
    backgroundColor: '#5bd970',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  btn:{
    marginTop:10
  },
  titleText:{
    fontSize:28,
    fontWeight:'900',
    marginTop:80
  }
});
