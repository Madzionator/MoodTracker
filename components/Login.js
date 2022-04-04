import { StyleSheet, Text, View, TextInput } from 'react-native';
import Btn from './Btn';

export default function Login(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Mood Tracker</Text>
      <TextInput
        style={styles.login}
        //onChangeText={onChangeText}
        title = "login"
        placeholder="Login"
      />
      <TextInput
        style={styles.haslo}
        placeholder = "Hasło"
        autoComplete = 'password'
      />
      <Btn title = 'Zaloguj' style={styles.btn}/>
    </View>
  );
}

const styles = StyleSheet.create({
  login: {
    backgroundColor: 'white',
    alignItems: 'center',
    border: '5px solid orange',
    marginBottom: '4%',
    fontSize: 20
  },
  haslo: {
    backgroundColor: 'white',
    alignItems: 'center',
    border: '5px solid orange',
    marginBottom: '4%',
    fontSize: 20
  },
  titleText:{
    fontSize:25,
    fontWeight:500,
    marginTop:65
  },
  btn:{
    marginTop:'5%',
    marginLeft:'15%',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 20
  }
});
