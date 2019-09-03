import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import * as firebase from 'firebase';

import Days from '../constants/Days';

export default class HoursScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      daysToHours: {},
    };
  }

  async componentDidMount() {
    var daysToHours = {};
    await firebase
      .database()
      .ref('info')
      .once('value')
      .then(function(data) {
        const DB_DAYS_KEYS_TO_READABLE_DAYS = Days.DB_DAYS_KEYS_TO_READABLE_DAYS;
        data.forEach(function(childNode) {
          var dayKey = childNode.key;
          if (DB_DAYS_KEYS_TO_READABLE_DAYS.hasOwnProperty(dayKey)) {
            var day = childNode.val();
            var readableDay = DB_DAYS_KEYS_TO_READABLE_DAYS[dayKey];
            daysToHours[readableDay] = {
              day: readableDay,
              hours: day['12hours'],
              restock: day['restock'],
            };
          }
        });
        this.setState({
          daysToHours: daysToHours
        });
      }.bind(this));
  }

  getEmojis(restock) {
    let arr = new Array();
    Object.keys(EMOJIS).map(function(key, emoji){
      if (restock[key] == 1){
        arr.push(EMOJIS[key]);
      }
    });
    return arr;
    // return restock['bread']; //get the emojis for this json
  }

  renderHours() {
    var orderedDaysToHours = Days.ORDERED_READABLE_DAYS.map((readableDay) => {
      return this.state.daysToHours[readableDay];
    });

    console.log(orderedDaysToHours);

    return orderedDaysToHours.map((dayObject) => {
      if (dayObject) {
        return (
        <View key={dayObject.day} style = {styles.dayContainer}>
          <Text style = {styles.dayText} >{dayObject.day} </Text>
          <View style = {styles.hoursRestockContainer}>
            <Text style = {styles.hoursText}> {dayObject.hours} </Text>
            <Text style = {styles.hoursText}> {this.getEmojis(dayObject.restock)} </Text>
          </View>
        </View>);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style = {styles.titleText}>Hours</Text>
        <ScrollView
          style={styles.contentContainer}>
          <View>
            {this.renderHours()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const EMOJIS = {
  '-none':'',
  'bread': '🥖',
  'eggs': '🥚',
  'milk': '🥛', 
  'prepared': '🥡',
  'produce': '🥦',
  'shelf': '🥫',
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 30
  },
  titleText: {
    paddingTop: 30,
    paddingLeft: 30,
    color: '#3d3d3d',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'left',
    justifyContent: 'flex-start',
  },

  view: {
    position: 'absolute',
    backgroundColor: 'transparent'
  },
  dayContainer: {
    borderTopWidth: 1,
    borderTopColor: '#d3d3d3',
    flexDirection: "row",
    paddingVertical: 10,
  },
  hoursRestockContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  dayText: {
    flex: 2,
    color: '#3d3d3d',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    justifyContent: 'flex-start',
  },
  hoursText: {
    flex: 1,
    color: '#3d3d3d',
    fontSize: 16,
    textAlign: 'left',
    justifyContent: 'flex-start',
  }
});
