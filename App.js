import React from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { HomeScreen } from './screens/HomeScreen';
import { Notify } from './screens/Notify';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

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
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Главная' }}/>
          <Stack.Screen name="Notify" component={Notify} options={{ title: 'Напоминалка' }}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
