import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { RFValue } from "react-native-responsive-fontsize";

import * as firebase from 'firebase';

import Colors from '../constants/Colors';
import Icons from '../constants/Icons';
import { parseTimestamp } from '../constants/Timestamp';

export default class NotificationsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Notification History',
      headerLeft: (
        <View style={styles.iconHolder}>
          <Icon
            name={Icons.NAVIGATION_ICONS['back']}
            type='material-community'
            size={RFValue(30)}
            color={Colors.primaryTextColor}
            onPress={() => navigation.navigate('Settings')}
          />
        </View>
      ),
    };
  }

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
      <View key={index} style={styles.notifContainer}>
        <Text style={styles.notifTitle}>{notification.title}</Text>
        <Text style={styles.notifText}>{notification.text}</Text>
        <Text style={styles.notifTimestamp}>{parseTimestamp(notification.timestamp)}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.contentContainer}>
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
  notifTitle: {
    padding: 1,
    color: '#4d4d4d',
    fontSize: RFValue(14),
    fontWeight: 'bold',
  },
  notifText: {
    padding: 1,
    color: '#4d4d4d',
    fontSize: RFValue(14),
  },
  notifTimestamp: {
    padding: 1,
    fontSize: RFValue(12),
    color: '#5d5d5d'
  },
  iconHolder: {
    justifyContent: "center",
    marginLeft: 10,
  },
});
