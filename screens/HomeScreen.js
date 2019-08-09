import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import * as firebase from 'firebase';

import { getImage } from '../constants/ImageFilepaths';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      categories: {},
      inventory: ""
    };
  }

  async componentDidMount() {
    var categories = {};
    await firebase
      .database()
      .ref('category')
      .once('value')
      .then(function(data) {
        data.forEach(function(childNodes) {
          categories[childNodes.key] = getImage(childNodes.val()['fileName']);
        });
        this.setState({
          categories: categories
        });
      }.bind(this));

      // await firebase
      // .database()
      // .ref('inventory')
      // .once('value')
      // .then(function(data) {
      //   this.setState({
      //     inventory: data.val()["1FNSA"].count
      //   });
      // }.bind(this));
  }

  renderCategories() {
    var categoryImages = [];
    Object.entries(this.state.categories).map(([categoryName, image]) => {
      categoryImages.push(
        <Image
          key={categoryName}
          source={image}
          style={styles.welcomeImage}
        />
      );
    });
    return categoryImages;
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text>{this.state.inventory}</Text>
            {this.renderCategories()}
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
