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
            };
          }
        });
        this.setState({
          daysToHours: daysToHours
        });
      }.bind(this));
  }

  renderHours() {
    var orderedDaysToHours = Days.ORDERED_READABLE_DAYS.map((readableDay) => {
      return this.state.daysToHours[readableDay];
    });

    console.log(orderedDaysToHours);

    return orderedDaysToHours.map((dayObject) => {
      if (dayObject) {
        return <Text key={dayObject.day}>{dayObject.day} | Hours: {dayObject.hours}</Text>;
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            {this.renderHours()}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  view: {
    position: 'absolute',
    backgroundColor: 'transparent'
  },
});
