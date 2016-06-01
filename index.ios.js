/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Image,
  Text,
  View
} from 'react-native';

var SplashPage = require("./SplashPage");
var HomePage = require("./HomePage");
var SearchPage = require("./SearchPage");
// import {
//   SplashPage
// } from '';

class PlayablChallenge extends Component {
  renderScene ( route, navigator ) {

    var routeId = route.id;
    if (routeId === 'SplashPage') {
        return (
            <SplashPage
                navigator={navigator}/>
        );
    }
    if (routeId === 'Home') {
      // console.log({route});
        return (
            <HomePage
                navigator={navigator} data={route.passProps.data} />
        );
    }
    if (routeId === 'Search') {
        return (

            <SearchPage
                navigator={navigator}  />
        );
    }
  }

  render() {
    return (
        <Navigator
            title='Challenge'
            initialRoute={{id: 'SplashPage', name: 'Index'}}
            renderScene={this.renderScene.bind(this)} /> );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('PlayablChallenge', () => PlayablChallenge);
