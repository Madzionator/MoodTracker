import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home';

import Login from './components/Login';
export default function App() {


  return (
    <View style={styles.container}>
      <Home/>
       {/*<Login/>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5bd970',
  }
});

