import React, { useState } from "react";
import Btn from "./Btn";
import Theme from "../Theme";
import {Modal, StyleSheet, Text, View } from "react-native";

const Accept = (props) => {
  const handleAccept = ()=>{
    props.setModalVisible(!props.modalVisible)
  };
  const handleDeny = ()=>{
      props.setModalVisible(!props.modalVisible)
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          props.setModalVisible(!props.modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Użytkownik {props.username} prosi o zgodę na obserwowanie Cię</Text> 
            <View style={styles.buttonView}>
                <Btn onPress={handleDeny}
                title="Odrzuć" 
                textStyle={[styles.buttonText, {color:'black'}]} 
                style={[styles.cannelBtn, {borderWidth:3, backgroundColor:"white",borderColor:Theme.background}]}/>
                <Btn onPress={handleAccept} title="Potwierdź" textStyle={styles.buttonText} style={styles.cannelBtn}/>
            </View>    
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonText:{
    color: 'white',
    fontSize:20,
    fontWeight: '700',
    textAlign: 'center',
  },
  cannelBtn:{
    padding: 15,
    borderRadius:10,
    backgroundColor:Theme.background,
    width: 125,
    margin:5,
  },
  buttonView:{
    flexDirection:"row",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin:10,
    backgroundColor: "white",
    borderRadius:10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    color:"black",
    fontSize:20,
    marginBottom: 5,
    textAlign: "center"
  }
});

export default Accept;