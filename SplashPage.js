
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Image,
  Dimensions,
  Text,
  View
} from 'react-native';
class SplashPage extends Component {
    componentWillMount () {
        var navigator = this.props.navigator;
        setTimeout (() => {
            navigator.replace({
                id: 'Search',
            });
        }, 2000);
    }

    render () {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                <Image style={{position: 'absolute', left: 0, top: 0, width: Dimensions.get('window').width, height: Dimensions.get('window').height}} source={{uri: 'http://insider.ticketmaster.com/wp-content/uploads/2014/06/soccer-play-ball.png'}}></Image>
                <Text style={{color: 'white', fontSize: 22}}>PLAYABL THE CHALLENGE</Text>
            </View>
        );
    }
}

module.exports = SplashPage;
