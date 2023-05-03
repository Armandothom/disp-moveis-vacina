//importações
import { View, StyleSheet, Image, TextInput, ImageBackground, Text} from 'react-native'
import { Button } from 'react-native-paper'
import LinearGradient from 'react-native-linear-gradient'
import { useState, useEffect, useContext } from 'react'
import ContextManager from '../../shared/dataContext'
import {AuthContext} from '../../../App'

//definição do componente
const Login = ({navigation}) => {
  const context = ContextManager.instance;
  const refreshAuth = useContext(AuthContext)

  function sendLogin() {  
    const user = context.login(email, password);
    refreshAuth(true)
    if(!user) {
      setChangeShowError(true)
    } else {
      setChangeShowError(false);
    }
  }
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showError, setChangeShowError] = useState(false)


  return (
    <View style={estilos.body}>
      <ImageBackground source={require("../../assets/bg-login.jpeg")} resizeMode="cover" style={estilos.imageBackground}>
        <LinearGradient
          colors={[
            "rgba(255, 255, 255, 0.8)",
            "rgba(221, 230, 229, 0.9)",
            "rgba(84, 131, 126, 0.4)",
          ]}
          style={estilos.linearGradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        >
          <View style={estilos.header}>
            <View style={estilos.headerTitleWrapper}>
              <Image
                style={estilos.image}
                source={require("../../assets/icon-vaccine.png")} />
              <Text style={estilos.headerTitle}>MyHealth</Text>
            </View>
            <View style={estilos.headerBottomWrapper}>
              <Text style={estilos.headerBottomText}>Controle as suas vacinas e fique seguro</Text>
            </View>
          </View>

          <View style={estilos.main}>
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
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </View>
            <View style={estilos.wrapperErro}>
            { showError && <Text style={estilos.erroText}>E-mail e/ou senha inválidos.</Text> }
            </View>
          </View>

          <View style={estilos.footer}>
            <Button mode="elevated" onPress={() => sendLogin()} style={estilos.buttonEntrar} disabled={!email && !password}>
              <Text style={estilos.buttonText}>Entrar</Text>
            </Button>
            <Button onPress={() => navigation.push('CriarConta')} style={estilos.buttonCriarConta}>
              <Text style={estilos.buttonText}>Criar minha conta</Text>
            </Button>
            <Button mode="elevated" onPress={() => navigation.push('EsqueciSenha')} style={estilos.buttonEsqueciSenha}>
              <Text style={estilos.secondaryButtonText}>Esqueci minha senha</Text>
            </Button>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  )
}

const estilos = StyleSheet.create({
  body: {
    height: '100%',
    fontFamily: 'AveriaLibre-Regular'
  },
  header: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 30,
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    height: 250,
    justifyContent : 'space-evenly',
    fontFamily: 'AveriaLibre-Regular'
  },
  headerBottomWrapper: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: "center",
    justifySelf: "center",
    maxWidth: "90%",
    marginTop: 30
  },
  headerBottomText: {
    color: "rgba(65, 158, 215, 1)",
    textAlign: "center",
    fontSize: 35,
    fontFamily: 'AveriaLibre-Regular'
  },
  headerTitleWrapper: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'center',
    alignContent: 'flex-end',
  },
  main: {
    flex: 2,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    height: 50,
    width: 50,
    alignSelf: 'center'
  },
  imageBackground: {
    justifyContent: 'center',
    width: "100%",
    height: "100%",
  },
  linearGradient: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(108, 122, 137, 0.65)"
  },
  headerTitle: {
    fontSize: 48,
    color: '#419ED7',
    fontWeight: 500,
    alignSelf: 'center',
    textDecorationLine: 'underline',
    fontFamily: "AveriaLibre-Regular"
  },
  mainTitle: {
    fontSize: 36,
    color: '#FFFFFF'
  },
  buttonEntrar: {
    backgroundColor: '#49B976',
    width: 130,
    marginTop: 10,
    borderColor: '#37BD6D',
    borderStyle : 'solid',
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 0,
  },
  buttonCriarConta: {
    backgroundColor: '#419ED7',
    width: 250,
    marginTop: 10,
    borderColor: '#419ED7',
    borderStyle : 'solid',
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 0,
    shadowColor: '#52006A',
    shadowOpacity: 1,
    elevation: 30,
    shadowRadius: 30 ,
    shadowOffset : { width: 5, height: 13},
  },
  buttonEsqueciSenha: {
    backgroundColor: '#B0CCDE',
    width: 250,
    height: 40,
    marginTop: 10,
    borderRadius: 0,
    alignSelf: 'center',
    padding: 0
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    alignSelf: 'center',
    fontFamily: 'AveriaLibre-Regular'
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'AveriaLibre-Regular',
    alignSelf: 'center'
  },
  wrapperInput :{
    display : 'flex',
    flexDirection : 'row',
    alignItems : 'center',
    width : '100%',
    paddingLeft : 10,
    paddingRight : 30,
    marginTop: 10
  },
  inputText : {
    color: '#FFFFFF',
    fontWeight : 'bold',
    fontSize: 16,
    marginRight: 5,
    width: 50
  },
  wrapperErro : {
    height: 30
  },
  erroText : {
    color: 'red',
    fontWeight : 'bold',
    fontSize: 16,
    marginTop: 5,
    width: 340,
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'center'
  },
  input: {
    fontSize: 15,
    color: '#3F92C5',
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    height: 40,
    borderWidth: 1,
    marginTop: 5,
    width : '90%',
    paddingLeft: 10,
    paddingRight: 10
  },
})

//exportação
export default Login