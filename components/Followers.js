import { StyleSheet, Text, View } from 'react-native'
import { useState } from "react"
import React from 'react'
import Accept from './Accept';
const Followers = () => {
  const[modalVisible, setModalVisible] = useState(true);
  return (
    <View>
      <Accept modalVisible = {modalVisible} setModalVisible = {setModalVisible} username="Piotr"/>
      <Text>Followers</Text>
    </View>
  )
}

export default Followers

const styles = StyleSheet.create({})