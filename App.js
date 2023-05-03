//importações
import Login from './src/screens/Login/Login'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EsqueciSenha from './src/screens/EsqueciSenha/EsqueciSenha';
import CriarConta from './src/screens/CriarConta/CriarConta';
import Home from './src/screens/Home/Home';
import ContextManager from './src/shared/dataContext'
import { useEffect, useState, createContext } from 'react'


const Stack = createNativeStackNavigator();
const AuthContext = createContext();
//definição do componente
const App = ({ navigation }) => {
  const [loggedIn, refreshAuth] = useState(false)
  let loggedUser = null;
  useEffect(() => {
    loggedUser = ContextManager.instance.loggedUser;
  })

  return (
    <AuthContext.Provider
    value={
      refreshAuth
  }>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
          {
            loggedIn == false ? (
              <>
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{ title: 'Login' }}
                />
                <Stack.Screen
                  name="EsqueciSenha"
                  component={EsqueciSenha}
                  options={{ title: 'EsqueciSenha' }}
                />
                <Stack.Screen
                  name="CriarConta"
                  component={CriarConta}
                  options={{ title: 'CriarConta' }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{ title: "Home" }} />
              </>
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export {App, AuthContext}