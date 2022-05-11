import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Home from './components/Home';
import Statistics from './components/Statistics';
import Followers from './components/Followers';
import Settings from './components/Settings';
import Login from './components/Login';
import Register from './components/Register';
import Rating from './components/Rating';
import Error from './components/Error';
import About from './components/About';
import News from './components/News';
import Menu from './components/Menu';

export default function App() {
  const [scene, setScene] = useState('Home')
  return ( 
    scene == 'Home' ? <Home setScene = {setScene}/> :
    scene == 'Login' ? <Login setScene = {setScene}/> : 
    scene == 'Register' ? <Register setScene = {setScene}/> :
    scene == 'About' ? <About setScene = {setScene}/> : 
    <View style = {styles.container}>
      {scene == 'News' ? <News setScene = {setScene} scene = {'News'}/> :
      scene == 'Rating' ? <Rating setScene = {setScene} scene = {'Rating'}/> : 
      scene == 'Statistics' ? <Statistics setScene = {setScene} scene = {'Statistics'}/> :
      scene == 'Followers' ? <Followers setScene = {setScene} scene = {'Followers'}/> :
      scene == 'Settings' ? <Settings setScene = {setScene} scene = {'Settings'}/> :
      <Error setScene = {setScene}/>}
      <Menu setScene={setScene} scene = {scene}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex:1
  },
})

