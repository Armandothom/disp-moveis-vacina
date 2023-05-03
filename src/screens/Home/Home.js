
import { View, StyleSheet, TextInput, Image, Text } from 'react-native'
import { Button } from 'react-native-paper'
import { useState, useContext } from 'react'


const Home = ({ navigation }) => {


  return (
    <View style={estilos.body}>
      <Text>HOME</Text>
    </View>
  )
}

const estilos = StyleSheet.create({
  headerTitleWrapper: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignContent: 'flex-end',
    padding: 10,
    backgroundColor : '#C1E7E3'
  },
  headerTitle: {
    fontSize: 32,
    color: '#419ED7',
    fontWeight: 500,
    alignSelf: 'center',
  },
  imageHeader: {
    height: 30,
    width: 30,
    alignSelf: 'center',
    marginRight: 10
  },
  body: {
    height: '100%',
    backgroundColor: '#ADD4D0'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    alignSelf: 'center',
    fontFamily: 'AveriaLibre-Regular'
  },
  buttonRecuperar: {
    backgroundColor: '#49B976',
    width: 180,
    height: 40,
    marginTop: 10,
    borderColor: '#37BD6D',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 0,
    alignSelf: 'center',
    borderRadius: 0,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: '45%',
    width: '100%',

  },
  wrapperInput: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 30,
    paddingRight: 50,
    marginTop: 10
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40%',
  },
  main: {
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputText: {
    color: '#FFFFFF',
    fontSize: 16,
    width: 50,
    fontFamily: 'AveriaLibre-Regular'
  },
  input: {
    fontSize: 15,
    color: '#3F92C5',
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    height: 40,
    borderWidth: 1,
    marginTop: 5,
    width: '90%',
    paddingLeft: 10,
    paddingRight: 10
  },
})

export default Home