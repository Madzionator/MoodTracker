import { useState } from 'react';
import Home from './components/Home';
import Statistics from './components/Statistics';
import Followers from './components/Followers';
import Settings from './components/Settings';
import Login from './components/Login';
import Register from './components/Register';
import Rating from './components/Rating';
import Error from './components/Error';
import About from './components/About';

export default function App() {
  const [scene, setScene] = useState('Rating')
  return ( 
    scene == 'Home' ? <Home setScene = {setScene}/> :
    scene == 'Login' ? <Login setScene = {setScene}/> : 
    scene == 'Register' ? <Register setScene = {setScene}/> :
    scene == 'Rating' ? <Rating setScene = {setScene} scene = {'Rating'}/> : 
    scene == 'Statistics' ? <Statistics setScene = {setScene} scene = {'Statistics'}/> :
    scene == 'Followers' ? <Followers setScene = {setScene} scene = {'Followers'}/> :
    scene == 'Settings' ? <Settings setScene = {setScene} scene = {'Settings'}/> :
    scene == 'About' ? <About setScene = {setScene}/> : 
    <Error setScene = {setScene}/>
  );
}

