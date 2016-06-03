import NavigationBar from 'react-native-navbar';
import Calendar from 'react-native-calendar';
import moment from 'moment';
import EventEmitter from 'EventEmitter';
import Subscribable from 'Subscribable';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Image,
  DatePickerIOS,
  ScrollView,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS,
  WithLabel,
  Dimensions,
  Text,
  View
} from 'react-native';


// import { moment } from 'moment';

var API = require("./API");
var customDayHeadings = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];



class SearchPage extends Component  {


  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      matchDates: null,
      date: new Date(),
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
    };
  }

  // getMatchesDates between dates
  getMatchesDates(fromDate, toDate) {
    console.log("http://pads6.pa-sport.com/api/football/competitions/matchDates/"+API.key+"/"+fromDate+"/"+toDate)
    fetch("http://pads6.pa-sport.com/api/football/competitions/matchDates/"+API.key+"/"+fromDate+"/"+toDate+"/json", {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
            // Check for errors
            if (!!responseData.matchDates.errors) {
              this.setState({
                errors: responseData.matchDates.errors.error
              });
            // Otherwise collate matchDates and update state to popluate calendar
            } else {
              // console.log(responseData.matchDates.matchDate);
              this.setState({
                  matchDates: responseData.matchDates.matchDate,
                  errors: null
              });
            }
        })
        .catch((error) => {
          // Oh no - other errors such as network issue
          console.log(error)
          this.setState({errors: 'Loading Error' })
        })
        .done();
  }

  // Load match dates in range 4 months old to 2 months ahead
  load() {
    var fromDate = moment().add(-4, 'months').format('YYYYMMDD');
    var toDate = moment().add(2, 'months').format('YYYYMMDD');
    // console.log('date: '+fromDate);
     this.getMatchesDates(fromDate, toDate);
  }

  // TODO: ES6 doesnt accept mixins - need to use composition methods
  componentDidMount() {
    /* this.addListenerOn(this.props.events, 'reload', this.onReload); */
  }
  componentWillMount () {
    this.load();
  }

  onReload() {
    this.load();
  }

  onSubmit() {
    // Go to Home View to see matches on particular date
    var navigator = this.props.navigator;
    navigator.replace({
        id: 'Home',
        passProps: {data : this.state.selectedDate}
    });
  }

  goTo( id ) {
    // Go to Home View to see matches on particular date
    var navigator = this.props.navigator;
    navigator.replace({
        id: id
    });
  }


  render() {

      if (this.state.errors) {
        return <ErrorView error={this.state.errors} />;
      } else if (!this.state.matchDates) {
        return <LoadingView label="loading match dates..." />
      } else {
        return this.renderSearch();
      }

  }

  renderSearch() {
    var dates = [];
    for( var i in this.state.matchDates ) {
        dates[i] = this.state.matchDates[i].split('/').reverse().join('-');
    }
    // console.log(dates);
    return (<View style={{flex:1}}>
        <NavigationBar
          title={{ title: "Find Match", tintColor: 'black', }}
          leftButton={{ title: 'Back', }}
          rightButton={{ title: 'Forward', }}
          style={{ backgroundColor: "white", }}
          statusBar={{ tintColor: "white", }}
        />
        <Calendar
        eventDates={dates}
        scrollEnabled={true}
        showControls={true}
        dayHeadings={customDayHeadings}
        titleFormat={'MMMM YYYY'}
        prevButtonText={'Prev'}
        nextButtonText={'Next'}
        onDateSelect={(date) => this.setState({selectedDate: date})}
        onTouchPrev={() => console.log('Back TOUCH')}
        onTouchNext={() => console.log('Forward TOUCH')}
        onSwipePrev={() => console.log('Back SWIPE')}
        onSwipeNext={() => console.log('Forward SWIPE')}/>


    <TouchableHighlight style={styles.button}
          onPress={() => this.onSubmit()}>
          <Text style={styles.buttonText}>Go</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.button}
              onPress={() => this.goTo('Fixtures')}>
              <Text style={styles.buttonText}>View Fixtures</Text>
            </TouchableHighlight>

          <Text style={styles.selectedDate}>Selected Date: {moment(this.state.selectedDate).format('MMMM DD YYYY')}</Text>
    </View>);
  }
}


class LoadingView extends Component {

  constructor(props) {
    props.label = null;
    super(props);
  }
  render() {
    console.log(this.props)
    return (<View style={styles.middle}>
        <View style={{flex:1, alignItems: 'center'}}>
        <ActivityIndicatorIOS />
        <Text style={{ marginTop: 5 }}>
          {this.props.label}
        </Text>
        </View>
      </View>);

  };
}

class ErrorView extends Component {

  constructor(props) {
    props.error = null;
    super(props);
  }
  componentWillMount () {
    console.log(this.props.error);
    this.eventEmitter = new EventEmitter();
  }
  onReload() {
    this.eventEmitter.emit('reload');
  }

  render() {
    return (<View style={{flex:1}}>
      <NavigationBar style={{backgroundColor: '#f2dede'}}
        title={{ title: 'An Error Occurred', tintColor: "#a94442"}}/>
      <View style={styles.middle}>
      <View  style={{flex: 1, alignItems: 'center'}}>
        <Text>
           {this.props.error}
        </Text>
        <TouchableHighlight style={styles.button}
              onPress={() => this.onReload()}>
              <Text style={styles.buttonText}>Try Again</Text>
            </TouchableHighlight>
            </View>
      </View>
    </View>);
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

  },
  middle: {
    flex: 1,
    flexDirection: 'row',
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
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,

  },
  selectedDate: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 18,
    marginTop: 20
  }
});


module.exports = SearchPage;
