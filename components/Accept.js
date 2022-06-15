import { useState } from "react";
import Btn from "./Btn";
import Theme from "../Theme";
import {Modal, StyleSheet, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from "react-native/Libraries/Utilities/PixelRatio";


const Accept = (props) => {
  const [token,setToken] = useState();
  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('MoodTrackerToken')
      if(value !== null) {
        setToken(value)
      }
    } catch(e) {
      // error reading value
    }
  }
  const handlePush = (action) =>{
    fetch(`https://moodtrackerapi.azurewebsites.net/follow/${props.userId}?action=${action}`, {
     method: 'POST',    
     headers: {
       Accept: '*/*',
       AcceptEncoding:'gzip, deflate, br',
       Authorization: `Bearer ${token}` ,
       Connection: 'keep-alive'
      }}).then((response) => console.log(response.status))
      .catch(error => {console.error(error)})
    };
  const handleAccept = ()=>{
    getToken().then(
      handlePush('Accept')
    )
    props.setModalVisible(!props.modalVisible)
  };
  const handleDeny = ()=>{
    getToken().then(
      handlePush('Reject')
    )
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
            <Text style={styles.modalText}>Użytkownik {props.userName} prosi o zgodę na obserwowanie Cię</Text> 
            <Text>O {props.userName}:</Text>
            <View style = {{
              backgroundColor:'rgba(31, 181, 152,0.3)', 
              width:'90%',  
              minHeight:200,
              borderRadius:5, 
              alignSelf:'center', 
              padding:15
            }}>
              <Text>{props.bio}</Text>
            </View>
            <View style={styles.buttonView}>
                <Btn onPress={handleDeny}
                title="Odrzuć" 
                textStyle={[styles.buttonText, {color:Theme.background}]} 
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
    width: '40%',
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