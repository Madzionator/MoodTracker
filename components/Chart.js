import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { LineChart } from "react-native-chart-kit";
import Theme from '../Theme';

const Chart = (props) => {
  return (
    <View>
      <Text style = {styles.title}>{props.title}</Text>
      <LineChart
        data={{
          //labels: ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"],
          datasets: [
            {
              data: props.data
            }
          ]
        }}
        height={220} // from react-native
        width={0.9*Dimensions.get("window").width}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: Theme.background,
          backgroundGradientFrom: Theme.background,
          backgroundGradientTo: Theme.background,//'#26ffd5'
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => 'white',
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "3",
            strokeWidth: "2",
            stroke: "white"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          marginHorizontal:'5%',
          borderRadius: 16,
        }}/>
    </View>
  )
}

export default Chart

const styles = StyleSheet.create({
  title:{
    color:'white',
    textAlign:'center',
    padding:5,
    fontSize:28
  }
})