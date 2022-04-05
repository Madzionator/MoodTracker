import { StyleSheet, Text, View, TextInput } from 'react-native';
import Btn from './Btn';

export default function Login(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Mood Tracker</Text>
      <TextInput
        style={styles.input}
       // onChangeText={onChangeText}
        //value={text}
      />
      <TextInput
        style={styles.input}
        placeholder="useless placeholder"
        autoComplete = 'password'
      />
        <Btn title = 'Zaloguj' style={styles.btn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5bd970',
    alignItems: 'center',
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
