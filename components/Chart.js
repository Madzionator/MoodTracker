import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { LineChart } from "react-native-chart-kit";
import Theme from '../Theme';

const Chart = (props) => {
  const isNull = (element, index, array)=>element===-1
  return (
    <View>
      <Text style = {styles.title}>{props.title}</Text>
      {props.data.every(isNull)?
      <View style ={{
          height:220, 
          width: props.width==null?0.9*Dimensions.get("window").width:props.width, 
          backgroundColor:Theme.background, 
          borderRadius:5,
          padding:15,
          alignSelf:'center',
          alignItems:'center',
          justifyContent:'center',
          margin:10
      }}>
        <Text style={{color:'white'}}>Brak danych do wyświetlenia</Text>
      </View>:
      props.data?.length===7?
      <LineChart
        data={{
          labels:  ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"],
          datasets: [
            {
              data: props.data
            }
          ]
        }}
        height={220} // from react-native
        width={props.width==null?0.9*Dimensions.get("window").width:props.width}
        yAxisInterval={1} // optional, defaults to 1
        formatYLabel={(y)=>y==-1? 'BD': y==0?'😭':y==1?'😕' : y==2? '😐': y==3?'😊' :y==4?'😍':''} //(y)=>y==-1? 'BD': y==0?'😭':y==1?'😕' : y==2? '😐': y==3?'😊' :y==4?'😍':''
        chartConfig={{
          backgroundColor: Theme.background,
          backgroundGradientFrom: Theme.background,
          backgroundGradientTo: Theme.background,//'#26ffd5'
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => 'white',
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "3",
            strokeWidth: "2",
            stroke: "white"
          },
          
        }}
        bezier
        style={{
          marginVertical: 8,
          marginHorizontal:'5%',
          borderRadius: 16,
        }}/>
        :
        <LineChart
        data={{
          //labels:  ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"],
          datasets: [
            {
              data: props.data
            }
          ]
        }}
        height={220} // from react-native
        width={props.width==null?0.9*Dimensions.get("window").width:props.width}
        yAxisInterval={1} // optional, defaults to 1
        formatYLabel={(y)=>y==-1? 'BD': y==0?'😭':y==1?'😕' : y==2? '😐': y==3?'😊' :y==4?'😍':''}
        chartConfig={{
          backgroundColor: Theme.background,
          backgroundGradientFrom: Theme.background,
          backgroundGradientTo: Theme.background,//'#26ffd5'
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => 'white',
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "3",
            strokeWidth: "2",
            stroke: "white"
          },
          
        }}
        bezier
        
        style={{
          marginVertical: 8,
          marginHorizontal:'5%',
          borderRadius: 16,
        }}/>
    }
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