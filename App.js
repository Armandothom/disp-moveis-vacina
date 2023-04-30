//importações
import Login from './src/screens/Login/Login'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EsqueciSenha from './src/screens/EsqueciSenha/EsqueciSenha';
import CriarConta from './src/screens/CriarConta/CriarConta';
const Stack = createNativeStackNavigator();
//definição do componente
const App = ({ navigation }) => {
  console.log(navigation)
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App