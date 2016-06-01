
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
            <View style={{flex: 1, backgroundColor: '#C0C0C0', alignItems: 'center', justifyContent: 'center'}}>
                <Text>PLAYABL THE CHALLENGE</Text>
                <Image style={{position: 'absolute', left: 0, top: 0, width: Dimensions.get('window').width, height: Dimensions.get('window').height}} source={require('image!background')}></Image>
            </View>
        );
    }
}

module.exports = SplashPage;
