import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import SettingsList from 'react-native-settings-list';
import Colors from '../constants/Colors';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Menu</Text>
        <ScrollView style={styles.contentContainer}>
          <SettingsList borderColor={Colors.accentColor}>
            <SettingsList.Item
              itemWidth={RFValue(50)}
              title='Notifications'
              onPress={() => this.props.navigation.navigate('Notifications')}
            />
            <SettingsList.Item
              itemWidth={RFValue(50)}
              title='Privacy Policy'
              onPress={() => this.props.navigation.navigate('Privacy')}
            />
          </SettingsList>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
  },
  titleText: {
    color: '#4d4d4d',
    paddingTop: 30,
    paddingLeft: 10,
    fontSize: RFValue(32),
    fontWeight: 'bold',
    textAlign: 'left',
    justifyContent: 'flex-start',
  },
});
