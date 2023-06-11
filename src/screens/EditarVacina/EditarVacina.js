
import { View, StyleSheet, TextInput, Image, Text, Pressable, TouchableOpacity, Modal } from 'react-native'
import { Button, RadioButton } from 'react-native-paper'
import { useEffect, useState } from 'react'
import ContextManager, { DoseEnum } from '../../shared/dataContext';
import { TextInputMask } from 'react-native-masked-text';
import { parseAndValidate } from '../../shared/helper';
import { Vacina } from '../../shared/dataContext';
import { launchImageLibrary } from 'react-native-image-picker'
import { updateDoc, collection, getDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const EditarVacina = ({ navigation, route }) => {
  const context = ContextManager.instance;
  const vacinaId = route.params.vacinaId;
  let savedVacina = {};

  useEffect(() => {
    setVacina();
  }, [])

  async function setVacina() {
    try {
      const docRef = doc(db, context.getVacinaPath(), vacinaId);
      savedVacina = (await getDoc(docRef)).data();
      savedVacina = new Vacina(savedVacina);
      setDose(savedVacina.dose);
      setDataVacinacao(savedVacina.dataVacinacaoFormatada);
      setComprovante(savedVacina.comprovante);
      setDataProximaVacinacao(savedVacina.dataProximaFormatada);
      setNomeVacina(savedVacina.nomeVacina);
    } catch (error) {
      console.error(error)
    }
  }

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

  function excluirVacina() {
    const docRef = doc(db, context.getVacinaPath(), vacinaId);
    deleteDoc(docRef).then(() => {
      navigation.pop();
    })
  }

  function editarVacina() {
    const docRef = doc(db, context.getVacinaPath(), vacinaId);
    const dto = new Vacina({
      dataVacinacao: parseAndValidate(dataVacinacao),
      nomeVacina: nomeVacina,
      dose: dose,
      comprovante: comprovante,
      proximaVacinacao: parseAndValidate(dataProximaVacinacao)

    })
    updateDoc(docRef, JSON.parse(JSON.stringify(dto))).then((refDoc) => {
      navigation.pop();
    })
  }

  const [dose, setDose] = useState(savedVacina.dose)
  const [dataVacinacao, setDataVacinacao] = useState(savedVacina.dataVacinacaoFormatada)
  const [comprovante, setComprovante] = useState(savedVacina.comprovante)
  const [dataProximaVacinacao, setDataProximaVacinacao] = useState(savedVacina.dataProximaFormatada)
  const [nomeVacina, setNomeVacina] = useState(savedVacina.nomeVacina)
  const [showDataVacError, setDataVacError] = useState(false)
  const [showDataProxVacError, setDataProximaVacError] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={estilos.body}>
      <View style={estilos.headerTitleWrapper}>
        <Pressable onPress={(() => navigation.pop())}>
          <Image
            style={estilos.imageHeader}
            source={require("../../assets/vector-left.png")} />
        </Pressable>
        <Text style={estilos.headerTitle}>Editar Vacina</Text>
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
                includeBase64: true,
                saveToPhotos: true
              })
              if (img?.assets && img.assets.length > 0) {
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
        {comprovante && <Image source={{ uri: comprovante }} style={estilos.imageUri}></Image>}
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
        <Button mode="elevated" onPress={editarVacina} style={estilos.buttonRecuperar}
          disabled={!nomeVacina || !dose || !dataVacinacao || !nomeVacina || !comprovante}>
          <Text style={estilos.buttonText}>Salvar alterações</Text>
        </Button>
        <Button mode="elevated" onPress={() => setModalVisible(true)} style={estilos.buttonExcluir}>
          <Image
            style={estilos.imageExcluir}
            source={require("../../assets/trash_2.png")} />
          <Text style={estilos.buttonText}>Excluir</Text>
        </Button>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={estilos.modal}>
          <View style={estilos.modalInner}>
            <Text style={estilos.modalText}>Tem certeza que deseja remover essa vacina?</Text>
            <View style={estilos.wrapperModalAction}>
              <Button mode="elevated" onPress={excluirVacina} style={estilos.buttonExcluir}
                disabled={!nomeVacina && !dose && !dataVacinacao && !nomeVacina && !comprovante}>
                <Text style={estilos.buttonText}>SIM</Text>
              </Button>
              <Button mode="elevated" onPress={() => setModalVisible(false)} style={estilos.buttonCancelarModal}
                disabled={!nomeVacina && !dose && !dataVacinacao && !nomeVacina && !comprovante}>
                <Text style={estilos.buttonText}>CANCELAR</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const estilos = StyleSheet.create({
  modal: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  modalInner: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    width: 300
  },
  modalText: {
    color: '#FD7979',
    fontSize: 16,
    alignSelf: 'center',
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'center'
  },
  imageExcluir: {
    height: 20,
    width: 20,
  },
  buttonCancelarModal: {
    backgroundColor: '#3F92C5',
    width: 160,
    height: 40,
    marginTop: 10,
    borderWidth: 1,
    padding: 0,
    alignSelf: 'center',
    borderRadius: 0,
  },
  buttonExcluir: {
    backgroundColor: '#FF8383',
    width: 130,
    height: 40,
    marginTop: 10,
    borderWidth: 1,
    padding: 0,
    alignSelf: 'center',
    borderRadius: 0,
  },
  wrapperModalAction: {

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
  buttonImage: {
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
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: '30%',
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
    justifyContent: 'center',
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

export default EditarVacina