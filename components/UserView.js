import { StyleSheet, Text, Modal, View } from 'react-native'
import {useState, useEffect} from 'react'
import Theme from '../Theme'
import Btn from './Btn'
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserView = (props) => {
  const [token, setToken] = useState()
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

  const [isFollowing, setIsFollowing] = useState(false)
  const [isFollower, setIsFollower] = useState(false)
  const [isAsked, setIsAsked] = useState(true)
  const [bio,setBio] = useState()
  const handleStatus = (param)=>{
    getToken().then
    (fetch(`https://moodtrackerapi.azurewebsites.net/Follow/info/${props.userId}`, {
      method: 'GET',    
      headers: {
        Accept: '*/*',
        AcceptEncoding:'gzip, deflate, br',
        Authorization: `Bearer ${token}` ,
        Connection: 'keep-alive'
   },
       }).then((response) => response.status != 200 ? null : response.json())
       .then((result) => {
         console.log(result)
         setBio(result.bio)
         setIsFollower(result.isFollower)
         setIsAsked(result.isAsked)
         setIsFollowing(result.isFollowing)
       })
       .catch(error => {console.error(error)}))
    };

      const handleFollow = (arg)=> {
        fetch(`https://moodtrackerapi.azurewebsites.net/follow/${props.userId}?action=${arg}`, {
         method: 'POST',    
         headers: {
           Accept: '*/*',
          // AcceptEncoding:'gzip, deflate, br',
           Authorization: `Bearer ${token}` ,
          // Connection: 'keep-alive'
          },
          }).then((response) => response.status != 200 ? null : response.json())
          .then((result) => {
            console.log(result)
          })
          .catch(error => {console.error(error)})
        };
  useEffect(()=>handleStatus(),[props.modalOpen]);


  return (
    <Modal
      animationType = {"fade"}
      transparent={true}
      visible={props.modalOpen}
      >
        <View style={{flex:1, alignItems:'center', justifyContent:'center', width:'100%', minHeight:'100%', backgroundColor:'rgba(0,0,0,0.4)'}}>
          <View style = {styles.container}>
          
              <Text style = {styles.userdata}> {props.userName}</Text>
              <View style = {{
                backgroundColor:'rgba(31, 181, 152,0.3)', 
                minWidth:'90%',  
                minHeight:200,
                borderRadius:5, 
                alignSelf:'center', 
                padding:15
              }}>
                <Text style = {{color:'white'}}>{bio}</Text>
              </View>
            {
              isFollowing === true ? <Btn title = 'Usuń z obserwowanych' style={styles.btn} onPress={()=>{handleFollow('Unfollow'), props.setModalOpen(false)}}/>
              : isAsked === true ? <Btn title = 'Cofnij prośbę' style={styles.btn} onPress={()=>{handleFollow('Unfollow'), props.setModalOpen(false)}}/>:
              <Btn title = 'Obserwuj' style={styles.btn} onPress={()=>{handleFollow('Follow'), props.setModalOpen(false)}}/>
            }
            {isFollower === true ? <Btn title = 'Cofnij zgodę na obserwowanie' style={styles.btn} onPress={()=>{handleFollow('Revoke'), props.setModalOpen(false)}}/> : null}
            <Btn title = 'Powrót' style={styles.btn} onPress = {()=>props.setModalOpen(false)}/>
        </View>
     </View>
    </Modal>
  )
}

export default UserView

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding:20,
    width:'80%',
    alignSelf:'center',
    justifyContent:'center',
    backgroundColor:Theme.lightBackground,
    borderRadius:5
  },
  sContainer:{
    flex: 1,
    marginTop:'15%',
    flexDirection: 'row',
    alignContent:'center',
    width: '80%',
    alignSelf:'center'
  },
  btn:{
    marginRight: 22,
    alignSelf:'center',
    textAlign: 'center',
    fontSize: 20,
    width: '90%',
    backgroundColor:Theme.background,
  },
  userdata:{
    textAlign: 'center',
    color: 'white',
    width:'80%',
    fontSize:24,
    margin: 5,
  }
})