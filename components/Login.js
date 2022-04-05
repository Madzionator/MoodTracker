import { StyleSheet, Text, View, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import Btn from './Btn';
import Theme from '../Theme'
import Header from './Header';
export default function Login(props) {
  return (
    <LinearGradient
    colors={[Theme.background, Theme.backgroundGradient]}
    style={styles.container}
    >
      <View style={{marginBottom:'40%'}}>
        <Header style = {{marginBottom:40}}/>
        <TextInput
          style={styles.input}
          //onChangeText={onChangeText}
          title = "login"
          placeholder="Login"
          autoComplete = 'username'
        />
        <TextInput
          style={styles.input}
          placeholder = "Hasło"
          autoComplete = 'password'
          secureTextEntry='true'
          //onSubmitEditing={}
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
  btn:{
    marginHorizontal:'auto',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 20,
    backgroundColor:Theme.background
  }
});
