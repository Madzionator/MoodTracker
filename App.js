import { useState } from 'react';
import Home from './components/Home';

import Login from './components/Login';
import Register from './components/Register';
import Rating from './components/Rating';
import Error from './components/Error';

export default function App() {
  const [scene, setScene] = useState('Rating')
  return ( 
    scene == 'Home' ? <Home setScene = {setScene}/> :
    scene == 'Login' ? <Login setScene = {setScene}/> : 
    scene == 'Register' ? <Register setScene = {setScene}/> :
    scene == 'Rating' ? <Rating setScene = {setScene}/> : 
    <Error setScene = {setScene}/>
  );
}

