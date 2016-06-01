
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Image,
  DatePickerIOS,
  TouchableHighlight,
  Dimensions,
  Text,
  View
} from 'react-native';

var API = require("./API");

class SearchPageCal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
    };
  }

  componentWillMount () {
  }

  onDateChange(date) {
    console.log(this.state.date)
   this.setState({
     date: date
   });
  }
  onSubmit() {
  //  this.setState({date: date});
  // console.log(this.state.date)
  var navigator = this.props.navigator;
    navigator.replace({
        id: 'Home',
        passProps: {data : this.state.date}
    });
  }

  render() {

      return (<View style={styles.container}>

          <Text>Lookup Match</Text>
          <DatePickerIOS
          date={this.state.date}
          mode="date"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={ (date) => this.setState( {date: date}) }
        />

      <TouchableHighlight style={styles.button}
            onPress={() => this.onSubmit()}>
            <Text style={styles.buttonText}>Go</Text>
          </TouchableHighlight>
      </View>);
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 44,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});


module.exports = SearchPageCal;
