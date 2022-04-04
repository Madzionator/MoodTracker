import { StyleSheet, Text, View, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import { useState } from 'react';
import Btn from './Btn';
import Theme from '../Theme'
export default function Login(props) {
  const [login,setLogin] = useState("")
  const [password, setPassword] = useState("")
  const handleLogin = (e)=>{
    e.preventDefault();
  fetch ("https://moodtrackerapi.azurewebsites.net/User/login", {
     method: 'POST',
     body: JSON.stringify({
       login: login,
       password: password
    }),
})
  .then((response) => response.json())
  .then((result) => {
    if(result.message === 'SUCCESS'){
      alert('You are logged in');
      props.setScene('Rating')
     } else {
         alert('Please check your login information.');
     }
  });
  }
  return (
    <LinearGradient
    colors={[Theme.background, Theme.backgroundGradient]}
    style={styles.container}
    >
      <View style={{marginBottom:'40%'}}>
        <Text style={styles.titleText}>Mood Tracker</Text>
        <TextInput
          style={styles.input}
          //onChangeText={onChangeText}
          title = "login"
          placeholder="Login"
          value = {login}
          onChangeText = {setLogin}
          autoComplete = 'username'
        />
        <TextInput
          style={styles.input}
          placeholder = "Hasło"
          value = {password}
          onChangeText = {setPassword}
          autoComplete = 'password'
          secureTextEntry='true'
        />
        <Btn title = 'Zaloguj' style={styles.btn} onPress = {()=>props.setScene('Rating')}/>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    paddingTop:30,
    justifyContent:'space-around'
  },
  input: {
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius:5,
    padding:5,
    borderColor:Theme.background,
    marginBottom: '4%',
    fontSize: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  titleText:{
    fontSize:50,
    fontWeight:'700',
    marginBottom:50,
    color:'white',
    textAlign:'center'
  },
  btn:{
    marginHorizontal:'auto',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 20,
    backgroundColor:Theme.background
  }
});
