
import { View, StyleSheet, Text, FlatList } from 'react-native'
import { useState, useCallback } from 'react'
import ContextManager, { Vacina } from '../../shared/dataContext'
import { AuthContext } from '../../../App'
import { Avatar, Button, Card } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

const ProximasVacinas = ({ navigation }) => {
  const context = ContextManager.instance;

  useFocusEffect(useCallback(() => {
    let sortedVacinas = context.loggedUser ? context.loggedUser.vacinas.filter((vacina) => {
      const now = new Date();
      if(vacina.proximaVacinacao && vacina.proximaVacinacao.getTime() > now.getTime()) {
        return true;
      } else {
        return false;
      }
    }).sort((a, b) => a.proximaVacinacao.getTime() - b.proximaVacinacao.getTime()) : []
    setVacinas([].concat(sortedVacinas))
  }, [vacinas]))
  const [vacinas, setVacinas] = useState([])

  return (
    <View style={estilos.body}>
      <FlatList style={estilos.cardWrapper}
        data={vacinas}
        renderItem={({ item }) =>
          <Card style={estilos.card} onPress={() => {
            navigation.push('EditarVacina', {userId : context.loggedUserId, vacinaId : item.id})
          }}>
            <View style={estilos.cardContent}>
            <Text numberOfLines={1} style={estilos.nomeVacina}>{item.nomeVacina}</Text>
            <Text style={estilos.dataVacina}>{item.dataProximaFormatada}</Text>
            </View>
          </Card>
        }
        keyExtractor={item => item.id}
        extraData={this.state}>
      </FlatList>
      <View style={estilos.footer}>
            <Button mode="elevated" onPress={() => {
              navigation.push('CriarVacina', {userId : context.loggedUserId})
            }} style={estilos.buttonNovaVacina}>
              <Text style={estilos.buttonText}>Nova Vacina</Text>
            </Button>
          </View>
    </View>
  )
}

const estilos = StyleSheet.create({
  cardContent : {
    padding: 10
  },
  nomeVacina: {
    fontSize: 28,
    color: "#3F92C5",
    fontFamily: 'AveriaLibre-Regular',
  },
  dataVacina: {
    fontSize: 18,
    color: "#8B8B8B",
    fontFamily: 'AveriaLibre-Regular'
  },
  card : {
    marginTop: 20,
    marginBottom: 20,
    height: 50
  },
  cardWrapper: {
    width: "100%",
    height: "95%",
    display: "flex",
    alignContent: "center",
    paddingHorizontal: 20,
    marginTop: 25
  },
  headerTitleWrapper: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignContent: 'flex-end',
    padding: 10,
    backgroundColor: '#C1E7E3'
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
  buttonNovaVacina: {
    backgroundColor: '#49B976',
    width: 180,
    marginTop: 10,
    borderColor: '#37BD6D',
    borderStyle : 'solid',
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 0,
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
    height: '20%',
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

export default ProximasVacinas