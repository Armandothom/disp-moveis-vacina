//importações
import 'react-native-gesture-handler';
import Login from './src/screens/Login/Login'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EsqueciSenha from './src/screens/EsqueciSenha/EsqueciSenha';
import CriarConta from './src/screens/CriarConta/CriarConta';
import CriarVacina from './src/screens/CriarVacina/CriarVacina';
import EditarVacina from './src/screens/EditarVacina/EditarVacina';
import DrawerApp from './src/shared/DrawerApp'
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
            loggedIn == true ? (
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
                  name="DrawerApp"
                  component={DrawerApp}
                  options={{ title: "DrawerApp" }} />
                <Stack.Screen
                  name="CriarVacina"
                  component={CriarVacina}
                  options={{ title: "CriarVacina" }} />
                <Stack.Screen
                  name="EditarVacina"
                  component={EditarVacina}
                  options={{ title: "EditarVacina" }} />
              </>
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export { App, AuthContext }