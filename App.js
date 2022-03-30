import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home';
import Login from './components/Login';
import Rating from './components/Rating';
import Error from './components/Error';

export default function App() {
  const [scene, setScene] = useState('Home')
  return ( 
    scene == 'Home' ? <Home/> :
    scene == 'Login' ? <Login/> : 
    scene == 'Rating' ? <Rating/>: 
    <Error/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5bd970',
    alignItems: 'center',
    //justifyContent: 'center',
  }
});

