import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { RFValue } from "react-native-responsive-fontsize";

import Colors from '../constants/Colors';
import Icons from '../constants/Icons';
import PRIVACY_POLICY from '../constants/PrivacyPolicy';

export default class PrivacyScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Privacy Policy',
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
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        <ScrollView style={styles.contentContainer}>
          {PRIVACY_POLICY}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
  },
  iconHolder: {
    justifyContent: "center",
    marginLeft: 10,
  },
});
