import { useState } from 'react';
import Home from './components/Home';

import Login from './components/Login';
import Register from './components/Register';
import Rating from './components/Rating';
import Error from './components/Error';
import About from './components/About';

export default function App() {
  const [scene, setScene] = useState('Home')
  return ( 
    scene == 'Home' ? <Home setScene = {setScene}/> :
    scene == 'Login' ? <Login setScene = {setScene}/> : 
    scene == 'Register' ? <Register setScene = {setScene}/> :
    scene == 'Rating' ? <Rating setScene = {setScene}/> : 
    scene == 'About' ? <About setScene = {setScene}/> : 
    <Error setScene = {setScene}/>
  );
}

