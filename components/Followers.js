import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Menu from './Menu'

const Followers = (props) => {
  return (
    <View>
      <Text>Followers</Text>
      <Menu setScene={props.setScene} scene = {props.scene}/>
    </View>
  )
}

export default Followers

const styles = StyleSheet.create({})