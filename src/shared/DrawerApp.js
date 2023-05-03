import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { getHeaderTitle } from '@react-navigation/elements';
import { useContext } from 'react'
import { Text, StyleSheet, Image, Pressable, View } from 'react-native'
import ContextManager from './dataContext'
import { AuthContext } from '../../App'
import Home from '../screens/Home/Home';
import ProximasVacinas from '../screens/ProximasVacinas/ProximasVacinas';

const Drawer = createDrawerNavigator();

const DrawerApp = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={({ navigation }) => {
      return {
        headerShown: true,
        headerTitleStyle: {
          ...estilos.headerTitle
        },
        headerStyle: {
          ...estilos.headerTitleWrapper
        },
        drawerActiveBackgroundColor: null,
        drawerActiveTintColor: "#419ED7",
        drawerInactiveTintColor: "#419ED7",
        drawerItemStyle: { display: "flex", marginVertical: 0},
        drawerLabelStyle: {
          fontFamily: 'AveriaLibre-Regular',
          fontSize: 22,
          marginLeft: 0
        },
        headerLeft: ({ }) => {
          return (
            <Pressable onPress={navigation.toggleDrawer}>
              <Image onPress={navigation.toggleDrawer} style={estilos.imageHeader} source={require("../assets/drawericon.png")}></Image>
            </Pressable>
          )
        }
      }
    }} drawerContent={(props) => <DrawerItems {...props} />}>
      <Drawer.Screen options={{
        title: "Minhas vacinas", drawerIcon: () => (
          <Image source={require("../assets/icon-vaccine.png")} style={{ width: 30, height: 30, marginRight: -25 }}></Image>
        )
      }} name="Home" component={Home} />
      <Drawer.Screen options={{
        title: "Próximas vacinas", drawerIcon: () => (
          <Image source={require("../assets/calendar_1.png")} style={{ width: 30, height: 30, marginRight: -25 }}></Image>
        )
      }} name="ProximasVacinas" component={ProximasVacinas} />
    </Drawer.Navigator>
  );
}

const DrawerItems = (props) => {
  const context = ContextManager.instance;
  const refreshAuth = useContext(AuthContext)
  const userName = context.loggedUser ? context.loggedUser.nome.split(" ")[0] : "Usuário"
  function logout() {
    context.logout();
    refreshAuth(false)
  }
  return (
    <DrawerContentScrollView {...props} style={estilos.body}>
      <View style={estilos.drawerWrapper}>
        <Text style={estilos.drawerUserName}>Olá {userName}</Text>
      </View>
      <View>
        <DrawerItemList {...props}></DrawerItemList>
        <View style={{ display: "flex" }}>
          <DrawerItem label="Sair" onPress={logout} 
          
          labelStyle={{
            fontFamily: 'AveriaLibre-Regular',
            fontSize: 22,
            marginLeft: 0,
            color: "#419ED7"
          }} icon={() => (
            <Image source={require("../assets/logout_green_2.png")} style={{ width: 30, height: 30, marginRight: -25 }}></Image>
          )}></DrawerItem>
        </View>
      </View>
    </DrawerContentScrollView>
  )
}


const estilos = StyleSheet.create({
  headerTitleWrapper: {
    backgroundColor: '#C1E7E3'
  },
  headerTitle: {
    fontSize: 32,
    color: '#419ED7',
    fontWeight: 500,
    alignSelf: 'center',
    fontFamily: 'AveriaLibre-Regular'
  },
  imageHeader: {
    height: 30,
    width: 50,
    alignSelf: 'center',
    marginLeft: 10
  },
  body: {
    height: '100%',
    backgroundColor: '#ADD4D0'
  },
  drawerWrapper: {
    display: "flex",
    height: 80,
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    borderBottomColor: "#419ED7",
    borderBottomWidth: 2,
    marginBottom: 30,
    marginTop: 5
  },
  drawerUserName: {
    fontSize: 28,
    color: '#419ED7',
    fontFamily: 'AveriaLibre-Regular',
    textAlign: "center",
  }
})

export default DrawerApp;