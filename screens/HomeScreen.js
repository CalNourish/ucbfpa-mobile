import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import * as firebase from 'firebase';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      inventory: ""
    };
  }

  async componentDidMount() {
    firebase
      .database()
      .ref('inventory')
      .once('value')
      .then(function(data) {
        this.setState({
          inventory: data.val()["1FNSA"].count
        });
      }.bind(this));
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                require('../assets/images/inventory/canned_foods.jpg')
              }
              style={styles.welcomeImage}
            />
  
            <Text>{this.state.inventory}</Text>
  
            <Image
              source={
                require('../assets/images/inventory/eggs.jpg')
              }
              style={styles.welcomeImage}
            />
            <Image
              source={
                require('../assets/images/inventory/frozen.jpg')
              }
              style={styles.welcomeImage}
            />
            <Image
              source={
                require('../assets/images/inventory/grains.jpg')
              }
              style={styles.welcomeImage}
            />
            <Image
              source={
                require('../assets/images/inventory/milk.jpg')
              }
              style={styles.welcomeImage}
            />
            <Image
              source={
                require('../assets/images/inventory/sauces.jpeg')
              }
              style={styles.welcomeImage}
            />
            <Image
              source={
                require('../assets/images/inventory/spices.jpg')
              }
              style={styles.welcomeImage}
            />
            <Image
              source={
                require('../assets/images/inventory/yogurt.jpg')
              }
              style={styles.welcomeImage}
            />
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
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
});
