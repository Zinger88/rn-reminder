import React from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { HomeScreen } from './screens/HomeScreen';
import { Notify } from './screens/Notify';
import { RegisterScreen } from './screens/RegisterScreen';
import { LoginScreen } from './screens/LoginScreen';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as firebase from 'firebase';

// fixes for long time warning for expo
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};


const Stack = createStackNavigator();




// разобраться с экранами + с прохождением верификации 
// если не прошла то что
// добавление заметок
// пуш уведомления
// нормально прочитать доку по firebase 

// link to video firebase https://www.youtube.com/watch?v=TkuQAjnaSbM

var firebaseConfig = {
  apiKey: "AIzaSyCvno9LVLycWiFv9j-giDwshEmG0znxHYY",
  authDomain: "rn-notify.firebaseapp.com",
  databaseURL: "https://rn-notify.firebaseio.com",
  projectId: "rn-notify",
  storageBucket: "rn-notify.appspot.com",
  messagingSenderId: "254747766607",
  appId: "1:254747766607:web:3566a65316b2028cb19f3a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Логин' }}/> */}
          {/* <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Регистрация' }}/> */}
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'По бизнесу' }}/>
          <Stack.Screen name="Notify" component={Notify} options={{ title: 'Напоминалка' }}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
