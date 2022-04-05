import { StyleSheet, Text, View } from 'react-native';
import Btn from './Btn';
import Login from './Login';

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
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText:{
    color: 'orange',
    fontSize:28,
    fontWeight:"900",
    marginTop:80
  },
  btn:{
    marginTop:'5%',
    marginBottom: '5%',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 77
  },
  footer:{
    color: 'orange',
    fontSize: 15,
  }
});
