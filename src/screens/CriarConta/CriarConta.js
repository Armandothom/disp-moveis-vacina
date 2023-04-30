
import { View, StyleSheet, TextInput, Image, Text, Pressable } from 'react-native'
import { Button, RadioButton } from 'react-native-paper'
import { useState, useContext } from 'react'
import ContextManager, { SexoEnum } from '../../shared/dataContext';
import { TextInputMask } from 'react-native-masked-text';
import { parseAndValidate } from '../../shared/helper';

const CriarConta = ({ navigation }) => {
  const context = ContextManager.instance;

  function validateDate() {
    if(!dataNascimento) {
      setDataNascError(true);
      return;
    } else {
      const date = parseAndValidate(dataNascimento)
      if(!date) {
        setDataNascError(true);
        setDataNascimento(null);
        return;
      }
      setDataNascError(false);
    }
  }

  function cadastrarConta() {
    if(senha != senhaRepetida) {
      setSenhaNotEqualError(true);
      return false;
    }
    context.createUser({
      sexo,
      dataNascimento : parseAndValidate(dataNascimento),
      nomeCompleto,
      email,
      senha
    })
    navigation.pop();
  }

  const [sexo, setSexo] = useState(null)
  const [dataNascimento, setDataNascimento] = useState(null)
  const [nomeCompleto, setNomeCompleto] = useState(null)
  const [email, setEmail] = useState(null)
  const [senha, setSenha] = useState(null)
  const [senhaRepetida, setSenhaRepetida] = useState(null)
  const [showDateNascError, setDataNascError] = useState(false)
  const [showSenhaNotEqualError, setSenhaNotEqualError] = useState(false)

  return (
    <View style={estilos.body}>
      <View style={estilos.headerTitleWrapper}>
        <Pressable onPress={(() => navigation.pop())}>
          <Image
            style={estilos.imageHeader}
            source={require("../../assets/vector-left.png")} />
        </Pressable>
        <Text style={estilos.headerTitle}>Nova Conta</Text>
      </View>

      <View style={estilos.form}>
        <View style={estilos.wrapperInput}>
          <Text style={estilos.inputText}>Nome completo</Text>
          <TextInput
            style={estilos.input}
            value={nomeCompleto}
            onChangeText={setNomeCompleto}
          />
        </View>
        <View style={estilos.wrapperRadioInput}>
          <Text style={estilos.inputText}>Sexo</Text>
          <View style={estilos.wrapperRadioButton}>
            <RadioButton
              value={SexoEnum.Masculino}
              status={sexo === SexoEnum.Masculino ? 'checked' : 'unchecked'}
              onPress={() => setSexo(SexoEnum.Masculino)}
            />
            <Text style={estilos.inputRadioButton}>Masculino</Text>
            <RadioButton
              value={SexoEnum.Feminino}
              status={sexo === SexoEnum.Feminino ? 'checked' : 'unchecked'}
              onPress={() => setSexo(SexoEnum.Feminino)}
            />
            <Text style={estilos.inputRadioButton}>Feminino</Text>
          </View>
        </View>
        <View style={estilos.wrapperInput}>
          <Text style={estilos.inputText}>Data nascimento</Text>
          <TextInputMask
            style={estilos.input}
            value={dataNascimento}
            type={'custom'}
            onChangeText={setDataNascimento}
            onBlur={validateDate}
            options={{
              mask: '99/99/9999'
            }}x
          />
          <Image
            style={estilos.imageDatepicker}
            source={require("../../assets/calendar_1.png")} />
        </View>
          <View style={estilos.wrapperErro}>
            {showDateNascError && <Text style={estilos.erroText}>Data inválida.</Text>}
          </View>
        <View style={estilos.wrapperInput}>
          <Text style={estilos.inputText}>E-mail</Text>
          <TextInput
            style={estilos.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={estilos.wrapperInput}>
          <Text style={estilos.inputText}>Senha</Text>
          <TextInput
            style={estilos.input}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={true}
          />
        </View>
        <View style={estilos.wrapperInput}>
          <Text style={estilos.inputText}>Repetir senha</Text>
          <TextInput
            style={estilos.input}
            value={senhaRepetida}
            onChangeText={setSenhaRepetida}
            secureTextEntry={true}
          />
        </View>
          <View style={estilos.wrapperErro}>
            {showSenhaNotEqualError && <Text style={estilos.erroText}>Campos de senha não correspondem.</Text>}
          </View>
      </View>
      <View style={estilos.footer}>
        <Button mode="elevated" onPress={cadastrarConta} style={estilos.buttonRecuperar}
        disabled={!email && !sexo && !dataNascimento && !nomeCompleto && !senha && !senhaRepetida}>
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
  imageHeader: {
    height: 35,
    width: 35,
    alignSelf: 'center',
    marginRight: 10
  },
  erroText : {
    color: 'red',
    fontWeight : 'bold',
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
    right: 30,
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
  wrapperErro : {
    width : '100%',
    marginLeft: 140
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
    width: 140,
    textAlign: 'right',
    fontFamily: 'AveriaLibre-Regular'
  },
  inputRadioButton: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 5,
    width: 80
  },
  wrapperRadioButton: {
    height: 40,
    marginTop: 5,
    width: '75%',
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
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

export default CriarConta