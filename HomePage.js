import moment from 'moment';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Image,
  AlertIOS,
  ActivityIndicatorIOS,
  Animated,
  Dimensions,
  Text,
  View
} from 'react-native';

import NavigationBar from 'react-native-navbar';

var API = require("./API");
var Carousel = require('react-native-spring-carousel');
class HomePage extends Component {
  constructor(props) {
    props.date = null
    super(props);
    // this.props = {
    //   date : null
    // }
    this.state = {
      errors: null,
      matches: null,
      size: Dimensions.get('window')
    };
  }
  // apiKe = "http://pads6.pa-sport.com/api/football/competitions/matchDay/HpczY2gP4f/20160508/json";

  //
  getMatchesByDate(date) {
    console.log("http://pads6.pa-sport.com/api/football/competitions/matchDay/"+API.key+"/"+date+"/json")
    fetch("http://pads6.pa-sport.com/api/football/competitions/matchDay/"+API.key+"/"+date+"/json", {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
            // console.dir(responseData)
            // AlertIOS.alert(
            //     "GET Response",
            //     "Search Query -> " + responseData.matches.match[0].homeTeam.teamName
            // )
            // Need to handle error


            if (!!responseData.matches.errors)
            {
              console.log('error');
              this.setState({
                errors: responseData.matches.errors.error
              });
            } else {
              this.setState({
                  currentMatches: responseData.matches.match,
                  errors: null
              });
            }
        })
        .catch((error) => {
          console.log('error');
          console.log(error)
          this.setState({errors: 'Loading Error' })
        })
        .done();
  }



  componentWillMount () {
    console.log('date is'+this.props.data)
      // var yyyy = this.props.data.getFullYear();
      // var mm = this.props.data.getMonth()+1;
      // var dd = this.props.data.getDate();
      // mm = mm<10 ? '0'+mm : mm;
      // dd = dd<10 ? '0'+dd : dd;
      // var strDate = yyyy+mm+dd;
      // console.log(strDate);
      // console.log(moment(this.props.data).format('YYYYMMDD'));
      this.getMatchesByDate(moment(this.props.data).format('YYYYMMDD'));
  }

  renderErrorView() {
    // console.log(this.state.errors);
    return (<View style={{flex:1}}>
      <NavigationBar
        title={{ title: 'Match Standings', }}
        leftButton={{ title: 'Back',handler: () => this.props.navigator.replace({
            id: 'Search' }) }}
         />
         <View style={styles.container}>
        <Text>
           {this.state.errors}
        </Text>
        </View>
      </View>);

  };

  renderLoadingView() {
    return (<View style={styles.container}>
        <Text>
          Loading matches...
        </Text>
      </View>);

  };


    _onLayoutDidChange(e) {
      var layout = e.nativeEvent.layout;
      this.setState({size: {width: layout.width, height: layout.height}});
    }

  renderMatches() {
    console.log(this.state.currentMatches.length);
    return (<View style={{flex:1}} onLayout={this._onLayoutDidChange}>
      <NavigationBar

        title={{ title: 'Match Standings', }}
        leftButton={{ title: 'Back',handler: () => this.props.navigator.replace({ id: 'Search' }) }}
         />
      <View style={styles.container} >
      <Image source={{uri: 'http://www.androidguys.com/wp-content/uploads/2013/07/gradient2.png'}}  style={{position: 'absolute', left: 0, top: 0, width: this.state.size.width, height: this.state.size.height}}/>

        <Carousel delay={1500}
                pagerSize={10}
                pagerOffset={10}
                pagerMargin={2}
                pagerMargin={2}
                speed={2000}
                pageStyle={ {backgroundColor: "white", borderRadius: 5} }
                width={this.state.size.width}
                height={this.state.size.height-20}
                style={[this.state.size, styles.carousel]}>
              { typeof this.state.currentMatches === 'array' ? this.state.currentMatches.map( this.renderMatch ) : this.renderMatch(this.state.currentMatches,0) }
        </Carousel>

      </View>
      </View>
    );
  }
  renderMatch(match, i) {
    console.log('http://pads6.pa-sport.com/api/football/team/badge/'+API.key+'/'+match.homeTeam['@teamID']+'/200/200');
    return (<View key={i} style={styles.box, {width: Dimensions.get('window').width,
    height: Dimensions.get('window').height}}>
      <View style={styles.box}>


        <View style={styles.team}  key={'homeTeam'+i}>
            <View  style={styles.badges}>
              <Image style={styles.badgeImage} source={{uri: 'http://pads6.pa-sport.com/api/football/team/badge/'+API.key+'/'+match.homeTeam['@teamID']+'/200/200'}} />
            </View>

              <Text style={styles.teamname}>
                {match.homeTeam.teamName}
              </Text>
              <Text style={styles.score}>
                {match.homeTeam.score}
              </Text>
        </View>

      <Text style={styles.versus}>
          VS
      </Text>

      <View style={styles.team} key={'awayTeam'+i}>
          <View  style={styles.badges}>
              <Image style={styles.badgeImage} source={{uri: 'http://pads6.pa-sport.com/api/football/team/badge/'+API.key+'/'+match.awayTeam['@teamID']+'/200/200'}}/>
          </View>
          <Text style={styles.teamname}>
            {match.awayTeam.teamName}
          </Text>
          <Text style={styles.score}>
            {match.awayTeam.score}
          </Text>
      </View>


      </View>
      <View style={styles.matchDetails}>
          <Text style={styles.matchDetailsText}>{match.competition['#text']}</Text>
      </View>
    </View>);
  }
  render() {
    console.log("render")
    console.log(!this.state.errors);
    if (!!this.state.errors)
    {


      return this.renderErrorView();
    } else if (!this.state.currentMatches)
    {
      //loading View
      return this.renderLoadingView();

    } else {
      // Matches view
      return this.renderMatches();
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
      alignItems: 'center',

    },

  versus: {
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
    color: '#ffffff',

  },
  badges: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    alignSelf: 'auto',
    backgroundColor: 'rgba(0,0,0,0.1)',

    borderRadius: 50,

  },
  badgeImage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 100,
    alignSelf: 'auto',
    marginTop: 20

  },
  teamname: {
    fontSize: 12,
    textAlign: 'center',
    color: '#ffffff',
  },
  score: {
    fontSize: 32,
    textAlign: 'center',
    color: '#ffffff',
  },
  team: {
    flex: 1,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',

  },
  matchDetails: {

    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20

  },
  matchDetailsText: {
    color: '#ffffff',

  }
});


module.exports = HomePage;
