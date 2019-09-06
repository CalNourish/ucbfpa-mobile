import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import * as firebase from 'firebase';
<<<<<<< HEAD
=======
import { parseTimestamp } from '../constants/Timestamp';
>>>>>>> ebb9eff4efa513a550e3035a311d3ac4e1a73766

export default class NotificationsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      notifications: [],
    };
  }

  async componentDidMount() {
    var notifications = [];
    await firebase
      .database()
      .ref('notification')
      .orderByChild("timestamp")
      .limitToLast(10)
      .once('value')
      .then(function(data) {
        data.forEach(function(childNode) {
          var notification = childNode.val();
          notifications.unshift(notification);
        });
        this.setState({
          notifications: notifications
        });
      }.bind(this));
  }

<<<<<<< HEAD
  parseTimestamp(timestamp) {
    let month = timestamp.slice(5,7);
    let date = timestamp.slice(8,10);
    let hour = timestamp.slice(11,13);
    let minute = timestamp.slice(14,16);
    let ampm;
    if (hour < 12) {
      ampm = 'AM';
    } else {
      ampm = 'PM';
    }
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];    
    return months[month - 1] + ' ' + date/1 + ' at ' + hour%12 + ':' + minute + ' ' + ampm; 
  }

=======
>>>>>>> ebb9eff4efa513a550e3035a311d3ac4e1a73766
  renderNotifications() {
    return this.state.notifications.map((notification, index) =>
      <View key={index} style={styles.notifContainer}>
        <Text style={styles.notifTitle}>{notification.title}</Text>
        <Text style={styles.notifText}>{notification.text}</Text>
<<<<<<< HEAD
        <Text style={styles.notifTimestamp}>{this.parseTimestamp(notification.timestamp)}</Text>
=======
        <Text style={styles.notifTimestamp}>{parseTimestamp(notification.timestamp)}</Text>
>>>>>>> ebb9eff4efa513a550e3035a311d3ac4e1a73766
      </View>
    );
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Notification History</Text>
        <ScrollView style={styles.contentContainer}>
          <View>
            {this.renderNotifications()}
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
    padding: 10,
  },
  notifContainer: {
    borderTopWidth: 1,
    borderTopColor: '#febd40',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 10
  },
  view: {
    position: 'absolute',
    backgroundColor: 'transparent'
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
  notifTitle: {
    padding: 1,
    color: '#4d4d4d',
    fontSize: 14,
    fontWeight: 'bold',
  },
  notifText: {
    padding: 1,
    color: '#4d4d4d',
    fontSize: 14,
  },
  notifTimestamp: {
    padding: 1,
    fontSize: 12,
    color: '#5d5d5d'
  },
});
