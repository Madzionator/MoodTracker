import { StyleSheet, Text, View, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import Header from './Header';
import { LinearGradient } from 'expo-linear-gradient'
import Btn from './Btn';
import Theme from '../Theme'


export default function Register() {

  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')

  const valPass = () => {
    if (password != confPassword) {
      alert("Podane hasła nie są identyczne")
    }
    else {
    }
  }

  return (
    <LinearGradient
    colors={[Theme.background, Theme.backgroundGradient]}
    style={styles.container}
    >
      <View style={{marginBottom:'40%'}}>
        <Header style = {{marginBottom:20}}/>
        <TextInput
        style={styles.input}
        title="login"
        placeholder='Login'
        />
        <TextInput
        style={styles.input}
        title="email"
        placeholder="E-mail"
        />
        <TextInput
        style={styles.input}
        title="haslo"
        placeholder='Hasło'
        type="password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        />
        <TextInput
        style={styles.input}
        title="powtorzHaslo"
        placeholder='Powtórz hasło'
        type="password"
        secureTextEntry={true}
        onChangeText={(confPassword) => setConfPassword(confPassword)}
        />
        <TextInput
        style={styles.input}
        title="bio"
        placeholder='Bio'
        multiline = {true}
        numberOfLines = {8}/>
        <Btn title='Zatwierdź' style={styles.btn} onPress={() => valPass()}/>
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
    fontWeight:"700",
    marginBottom:50,
    color:'white',
    textAlign:'center'
  },
  btn:{
    marginHorizontal:'auto',
    //alignItems: 'center',
    marginVertical:'auto',
    marginLeft:'15%',
    textAlign: 'center',
    fontSize: 20,
    backgroundColor:Theme.background,
  }
});