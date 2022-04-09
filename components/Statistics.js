import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Menu from './Menu'

const Statistics = (props) => {
  return (
    <View>
      <Text>Statistics</Text>
      <Menu setScene={props.setScene} scene = {props.scene}/>
    </View>
  )
}

export default Statistics

const styles = StyleSheet.create({})