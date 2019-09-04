import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as firebase from 'firebase';
import Days from '../constants/Days';
import Icons from '../constants/Icons';

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
    const emojis = Icons.EMOJIS;
    return Object.keys(emojis).map(function(key) {
      if (restock[key] == 1) {
        return emojis[key];
      }
    });
  }

  renderHours() {
    var orderedDaysToHours = Days.ORDERED_READABLE_DAYS.map((readableDay) => {
      return this.state.daysToHours[readableDay];
    });
    return orderedDaysToHours.map((dayObject) => {
      if (dayObject) {
        return (
        <View key={dayObject.day} style={styles.dayContainer}>
          <Text style={styles.dayText}>{dayObject.day}</Text>
          <View style={styles.hoursRestockContainer}>
            <Text style={styles.hoursText}>{dayObject.hours}</Text>
            <Text style={styles.hoursText}>{this.getEmojis(dayObject.restock)}</Text>
          </View>
        </View>);
      }
    });
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Hours</Text>
        <ScrollView style={styles.contentContainer}>
          <View>
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
    padding: 10
  },
  titleText: {
    color: '#4d4d4d',
    paddingTop: 30,
    paddingLeft: 10,
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
    borderTopColor: '#febd40',
    flexDirection: "row",
    padding: 10,
  },
  hoursRestockContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  dayText: {
    flex: 2,
    color: '#4d4d4d',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    justifyContent: 'flex-start',
  },
  hoursText: {
    flex: 1,
    color: '#4d4d4d',
    fontSize: 16,
    textAlign: 'left',
    justifyContent: 'flex-start',
    paddingVertical: 2,
  }
});
