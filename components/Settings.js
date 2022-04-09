import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Menu from './Menu'

const Settings = (props) => {
  return (
    <View>
      <Text>Settings</Text>
      <Menu setScene={props.setScene} scene = {props.scene}/>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({})