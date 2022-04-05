import { StyleSheet, Text, View } from 'react-native'
const Header = (props) => {
  return (
    <View>
      <Text style={[styles.titleText, props.style]}>Mood Tracker</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    titleText:{
        textAlign: 'center',
        color: '#ffffff',
        fontSize:65,
        fontWeight:'bold',
        marginTop:120,
        fontFamily:'ChelaOne_400Regular',
      },
})