
import { View, StyleSheet, Text, FlatList, Image, TouchableWithoutFeedback, TextInput, Keyboard } from 'react-native'
import { useState, useCallback, useEffect } from 'react'
import ContextManager from '../../shared/dataContext'
import { Button, Card } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

const Home = ({ navigation }) => {
  const context = ContextManager.instance;

  useEffect(() => {

  }, [vacinas, filterText])

  useFocusEffect(useCallback(() => {
    setFilterText("")
    setVacinas([].concat(sortVacinas("")))
  }, [vacinas]))

 function filterCards(text) {
    setFilterText(text);
    setVacinas([].concat(sortVacinas(text)))
  }

  const [vacinas, setVacinas] = useState([])
  const [filterText, setFilterText] = useState("")


  function sortVacinas(filter = filterText) {
    return context.loggedUser ? context.loggedUser.vacinas.sort((a, b) => b.dataVacinacao.getTime() - a.dataVacinacao.getTime()).filter((vacina) => {
      const text = filter.toLowerCase();
      if(vacina.nomeVacina.toLowerCase().includes(text)) {
        return true;
      } else {
        return false;
      }
    }) : []
  }
  return (
    <View style={estilos.body}>
      <View style={estilos.searchWrapper}>
        <Image style={estilos.searchIcon} source={require("../../assets/search.png")}/>
        <TextInput
          placeholder="PESQUISAR VACINA..."
          style={estilos.input}
          value={filterText}
          onChangeText={filterCards}
          underlineColorAndroid="transparent"
          onSubmitEditing={Keyboard.dismiss}
          blurOnSubmit={true}
          autoFocus={false}
        />
      </View>
      <FlatList style={estilos.cardWrapper}
        data={vacinas}
        numColumns={2}
        contentContainerStyle={{
          justifyContent: 'space-evenly',
          width: '100%',
          alignContent: 'space-between'
        }}
        renderItem={({ item }) =>
          <TouchableWithoutFeedback 
          onPress={() => {
            navigation.push('EditarVacina', { userId: context.loggedUserId, vacinaId: item.id })
          }}>
            <Card style={estilos.card}>
              <View style={estilos.cardContent}>
                <Text numberOfLines={1} style={estilos.nomeVacina}>{item.nomeVacina}</Text>
                <View style={estilos.wrapperCentralizer}>
                  <Text numberOfLines={1} style={estilos.doseVacina}>{item.doseNome}</Text>
                </View>
                <Text style={estilos.dataVacinacaoFormatada}>{item.dataVacinacaoFormatada}</Text>
                {item.comprovante && <Image source={{ uri: item.comprovante }} style={estilos.imageUri}></Image>}
                <Text numberOfLines={1} style={estilos.proximaVacina}>{item.proximaVacinacao ? `Próxima dose em: ${item.dataProximaFormatada}` : `Não há próxima dose`}</Text>
              </View>
            </Card>
          </TouchableWithoutFeedback>
        }
        keyExtractor={item => item.id}
        extraData={this.state}>
      </FlatList>
      <View style={estilos.footer}>
        <Button mode="elevated" onPress={() => {
          navigation.push('CriarVacina', { userId: context.loggedUserId })
        }} style={estilos.buttonNovaVacina}>
          <Text style={estilos.buttonText}>Nova Vacina</Text>
        </Button>
      </View>
    </View>
  )
}

const estilos = StyleSheet.create({
  searchWrapper: {
    height: 30,
    marginTop: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    fontFamily: 'AveriaLibre-Regular'
  },
  searchIcon : {
    height: 15,
    width: 15,
    alignSelf: 'center',
    position: 'absolute',
    left: 25,
    top: 15,
    zIndex: 9999
  }, 
  cardContent: {
    padding: 10
  },
  wrapperCentralizer: {
    width: 120,
    display: 'flex',
    backgroundColor: '#3F92C5',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  nomeVacina: {
    fontSize: 24,
    color: "#3F92C5",
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'center',
  },
  proximaVacina: {
    fontSize: 12,
    color: "#FD7979",
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'right',

  },
  imageUri: {
    height: 100,
    width: '100%',
  },
  dataVacinacaoFormatada: {
    fontSize: 14,
    color: "#8B8B8B",
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'center',
  },
  doseVacina: {
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'center',
    alignSelf: 'center',
    maxWidth: 140,
  },
  dataVacina: {
    fontSize: 18,
    color: "#8B8B8B",
    fontFamily: 'AveriaLibre-Regular'
  },
  card: {
    marginTop: 20,
    marginBottom: 20,
    height: 210,
    width: 185,
    margin: 5
  },
  cardWrapper: {
    width: "100%",
    marginTop: 25,
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
    borderStyle: 'solid',
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
    paddingLeft: 25,
    paddingRight: 10
  },
})

export default Home