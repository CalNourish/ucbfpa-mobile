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

  renderNotifications() {
    return this.state.notifications.map((notification, index) =>
    
      <View key={index} style = {styles.notifContainer}>
        <Text style = {styles.notifTitle} >{notification.title} </Text>
        <Text style = {styles.notifText} >{notification.text} </Text>
        <Text style = {styles.notifTimestamp} >{notification.timestamp} </Text>
      </View>

      // <Text key={index}>{index}. Title: {notification.text}, Text: {notification.title}, Timestamp: {notification.timestamp}</Text>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style = {styles.titleText}> Notification History</Text>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.contentContainer}>
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
    paddingTop: 30,
    paddingHorizontal: 10,
    fontSize: 32,
    fontWeight: 'bold',
  },
  notifTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  notifText: {
    fontSize: 14,
  },
  notifTimestamp: {
    fontSize: 12,
    color: '#4d4d4d'
  },

});
