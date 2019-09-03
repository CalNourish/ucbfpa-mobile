import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import * as firebase from 'firebase';

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

  parseTimestamp(timestamp) {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let ts = new Date('2019-09-02T11:34:00');
    // let diffInMinutes = (new Date().getTime() - timestamp.getTime())/ (1000 * 60);
    // let diffInHours = (int)( (new Date().getTime() - timestamp.getTime())
    //             / (1000 * 60 * 60) );
    // let diffInDays = (int)( (new Date().getTime() - timestamp.getTime())
    //             / (1000 * 60 * 60 * 24) );
    // let diffInWeeks = (int)( (new Date().getTime() - timestamp.getTime())
    //             / (1000 * 60 * 60 * 24 * 7) );
    string = months[ts.getMonth()] + ' ' + ts.getDate() + ' at ' + ts.getHours() + ':' + ts.getMinutes();
    return string;
  }

  renderNotifications() {
    return this.state.notifications.map((notification, index) =>
    
      <View key={index} style = {styles.notifContainer}>
        <Text style = {styles.notifTitle} >{notification.title} </Text>
        <Text style = {styles.notifText} >{notification.text} </Text>
        <Text style = {styles.notifTimestamp} >{this.parseTimestamp(notification.timestamp)} </Text>
      </View>

    );
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        <Text style = {styles.titleText}> Notification History</Text>
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
    color: '#4d4d4d'
  },

});
