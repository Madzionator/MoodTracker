import React from 'react'
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
//import Colors from '../views/Colors';

const Btn = (props) => {
    return (
        <TouchableOpacity style = {[styles.button, props.style]} onPress={props.onPress}>
            <Text style = {styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  button: {
    //backgroundColor: Colors.primary,
    backgroundColor:'#4287f5',
    padding: 20,
    borderRadius:5,
    shadowColor: 'gray',
    shadowOffset: {width: 5, height:5},
    shadowRadius: 3,
    width:'70%',
    marginTop: 25,
  },
  text:{
    color: 'black',
    fontWeight: '600',
    textAlign: 'center',
  }
});

export default Btn