
import { View, StyleSheet, TextInput, Image, Text, Pressable, TouchableOpacity } from 'react-native'
import { Button, RadioButton } from 'react-native-paper'
import { useState } from 'react'
import ContextManager, { DoseEnum } from '../../shared/dataContext';
import { TextInputMask } from 'react-native-masked-text';
import { parseAndValidate } from '../../shared/helper';
import { Vacina } from '../../shared/dataContext';
import {launchImageLibrary} from 'react-native-image-picker'
import { db } from '../../firebase/config';
import { addDoc, collection } from 'firebase/firestore';

const CriarVacina = ({ navigation, route }) => {
  const context = ContextManager.instance;
  const userId = route.params.userId
  function validateVacinacaoDate() {
    if (!dataVacinacao) {
      setDataVacError(true);
      return;
    } else {
      const date = parseAndValidate(dataVacinacao)
      if (!date) {
        setDataVacError(true);
        setDataVacinacao(null);
        return;
      }
      setDataVacError(false);
    }
  }

  function validateVacinacaoProximaDate() {
    if (!dataVacinacao) {
      setDataProximaVacError(true);
      return;
    } else {
      const date = parseAndValidate(dataVacinacao)
      if (!date) {
        setDataProximaVacError(true);
        setDataProximaVacinacao(null);
        return;
      }
      setDataProximaVacError(false);
    }
  }

  function cadastrarVacina() {
    const vacColecao = collection(db, context.getVacinaPath())
    const dto = new Vacina({
      dataVacinacao : parseAndValidate(dataVacinacao),
      nomeVacina : nomeVacina,
      dose : dose,
      comprovante : comprovante,
      proximaVacinacao : parseAndValidate(dataProximaVacinacao)

    })
    addDoc(vacColecao, JSON.parse(JSON.stringify(dto))).then((refDoc) => {
      navigation.pop();
    })
  }

  const [dose, setDose] = useState(null)
  const [dataVacinacao, setDataVacinacao] = useState(null)
  const [comprovante, setComprovante] = useState(null)
  const [dataProximaVacinacao, setDataProximaVacinacao] = useState(null)
  const [nomeVacina, setNomeVacina] = useState(null)
  const [showDataVacError, setDataVacError] = useState(false)
  const [showDataProxVacError, setDataProximaVacError] = useState(false)

  return (
    <View style={estilos.body}>
      <View style={estilos.headerTitleWrapper}>
        <Pressable onPress={(() => navigation.pop())}>
          <Image
            style={estilos.imageHeader}
            source={require("../../assets/vector-left.png")} />
        </Pressable>
        <Text style={estilos.headerTitle}>Nova Vacina</Text>
      </View>

      <View style={estilos.form}>
        <View style={estilos.wrapperInput}>
          <Text style={estilos.inputText}>Data de vacinação</Text>
          <TextInputMask
            style={estilos.input}
            value={dataVacinacao}
            type={'custom'}
            onChangeText={setDataVacinacao}
            onBlur={validateVacinacaoDate}
            options={{
              mask: '99/99/9999'
            }}
          />
          <Image
            style={estilos.imageDatepicker}
            source={require("../../assets/calendar_1.png")} />
        </View>
        <View style={estilos.wrapperErro}>
          {showDataVacError && <Text style={estilos.erroText}>Data inválida.</Text>}
        </View>
        <View style={estilos.wrapperInput}>
          <Text style={estilos.inputText}>Vacina</Text>
          <TextInput
            style={estilos.input}
            value={nomeVacina}
            onChangeText={setNomeVacina}
          />
        </View>
        <View style={estilos.wrapperRadioInput}>
          <Text style={estilos.inputText}>Dose</Text>
          <View style={estilos.wrapperRadioGroup}>
            <View style={estilos.wrapperRadioButton}>
              <RadioButton
                value={DoseEnum.PrimeiraDose}
                status={dose === DoseEnum.PrimeiraDose ? 'checked' : 'unchecked'}
                onPress={() => setDose(DoseEnum.PrimeiraDose)}
              />
              <Text style={estilos.inputRadioButton}>1a. dose</Text>
            </View>
            <View style={estilos.wrapperRadioButton}>
            <RadioButton
              value={DoseEnum.SegundaDose}
              status={dose === DoseEnum.SegundaDose ? 'checked' : 'unchecked'}
              onPress={() => setDose(DoseEnum.SegundaDose)}
            />
            <Text style={estilos.inputRadioButton}>2a. dose</Text>
            </View>
            <View style={estilos.wrapperRadioButton}>
            <RadioButton
              value={DoseEnum.TerceiraDose}
              status={dose === DoseEnum.TerceiraDose ? 'checked' : 'unchecked'}
              onPress={() => setDose(DoseEnum.TerceiraDose)}
            />
            <Text style={estilos.inputRadioButton}>3a. dose</Text>
            </View>
            <View style={estilos.wrapperRadioButton}>
            <RadioButton
              value={DoseEnum.DoseUnica}
              status={dose === DoseEnum.DoseUnica ? 'checked' : 'unchecked'}
              onPress={() => setDose(DoseEnum.DoseUnica)}
            />
            <Text style={estilos.inputRadioButton}>Dose única</Text>
            </View>
          </View>
        </View>
        <View style={estilos.wrapperInput}>
          <Text style={estilos.inputText}>Comprovante</Text>
          <TouchableOpacity onPress={async () => {
            try {
              const img = await launchImageLibrary({
                selectionLimit: 1,
                includeBase64 : true,
                saveToPhotos : true
              })
              if(img?.assets && img.assets.length > 0) {
                const uri = img.assets[0].uri;
                setComprovante(uri);
              }
            } catch (error) {
              console.error(error)
            }
          }} style={estilos.buttonImage}>
          <Text style={estilos.buttonTextImage}>Selecionar imagem...</Text>
        </TouchableOpacity>
        </View>
        {comprovante && <Image source={{uri : comprovante}} style={estilos.imageUri}></Image>}
        <View style={estilos.wrapperInput}>
          <Text style={estilos.inputText}>Próxima vacinação</Text>
          <TextInputMask
            style={estilos.input}
            value={dataProximaVacinacao}
            type={'custom'}
            onChangeText={setDataProximaVacinacao}
            onBlur={validateVacinacaoProximaDate}
            options={{
              mask: '99/99/9999'
            }} 
          />
          <Image
            style={estilos.imageDatepicker}
            source={require("../../assets/calendar_1.png")} />
        </View>
        <View style={estilos.wrapperErro}>
          {showDataProxVacError && <Text style={estilos.erroText}>Data inválida.</Text>}
        </View>
      </View>
      <View style={estilos.footer}>
        <Button mode="elevated" onPress={cadastrarVacina} style={estilos.buttonRecuperar}
          disabled={!nomeVacina || !dose || !dataVacinacao || !nomeVacina || !comprovante}>
          <Text style={estilos.buttonText}>Cadastrar</Text>
        </Button>
      </View>
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
    backgroundColor: '#C1E7E3'
  },
  headerTitle: {
    fontSize: 32,
    color: '#419ED7',
    fontWeight: 500,
    alignSelf: 'center',
  },
  imageUri: {
    height: 100,
    width: 220,
    marginLeft: 120
  },
  imageHeader: {
    height: 30,
    width: 30,
    alignSelf: 'center',
    marginRight: 10
  },
  erroText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
    fontFamily: 'AveriaLibre-Regular',
    maxWidth: 240
  },
  imageDatepicker: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    position: 'absolute',
    right: 45,
    bottom: 10
  },
  body: {
    height: '100%',
    backgroundColor: '#ADD4D0'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 100
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    alignSelf: 'center',
    fontFamily: 'AveriaLibre-Regular'
  },
  wrapperErro: {
    width: '100%',
    marginLeft: 140
  },
  buttonTextImage: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'AveriaLibre-Regular',
  },
  buttonImage : {
    backgroundColor: '#419ED7',
    width: 200,
    marginRight: 50,
    height: 40,
    marginTop: 10,
    borderColor: '#37BD6D',
    borderStyle: 'solid',
    borderWidth: 1,
    paddingLeft: 5,
    justifyContent: 'center',
    borderRadius: 5,
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
  wrapperInput: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 30,
    paddingRight: 50,
    marginTop: 10,
    position: 'relative'
  },
  wrapperRadioInput: {
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
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 5,
    width: 110,
    textAlign: 'right',
    fontFamily: 'AveriaLibre-Regular'
  },
  inputRadioButton: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 5,
    width: 90
  },
  wrapperRadioButton: {
    width: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent : 'center',
  },
  wrapperRadioGroup: {
    height: 80,
    marginTop: 5,
    width: '75%',
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  input: {
    fontSize: 14,
    color: '#3F92C5',
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    height: 40,
    borderWidth: 1,
    marginTop: 5,
    width: '75%',
    paddingLeft: 10,
    paddingRight: 10,
    verticalAlign: 'middle',
    textAlignVertical: 'center',
    marginRight: 10
  },
})

export default CriarVacina