import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'


import LoginScreen from './src/pages/LoginScreen'

const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions:{
      title: 'Bem vindo!',
    }
  }
}, {
  defaultNavigationOptions: {
    title: "Séries",
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: 'black',
      borderBottomWidth: 1,
      borderBottomColor: '#C5C5C5',
    },
    headerTitleStyle: {
      color: 'white',
      fontSize: 30,

    }
  }
})

const AppContainer = createAppContainer(AppNavigator)

export default AppContainer