import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Pokemons from './Components/Pokemons';
import Details from './Components/Details';

/*createStackNavigator is a function that returns a component, 
it can take two parameters, first a configuration object that will be our routes and we can pass a second configuration object which is optional.
 createStackNavigator places a component on the top like a stack*/
const appNavigator = createStackNavigator(
  {
    Home: {
      screen: Pokemons,
    },
    Details: {
      screen: Details,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(stackNavigator);

class App extends Component {
  render() {
    return <AppContainer />;
  }
}

export default App; 