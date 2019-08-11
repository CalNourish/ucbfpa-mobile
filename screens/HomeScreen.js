import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
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
      categories: {}
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
  }

  onPressCategory(categoryName) {
    this.props.navigation.navigate('Inventory', { category: categoryName });
  }

  renderCategories() {
    var categoryImages = [];
    Object.entries(this.state.categories).map(([categoryName, image]) => {
      categoryImages.push(
        <TouchableHighlight
          onPress={this.onPressCategory.bind(this, categoryName)}
          key={categoryName}>
          <ImageBackground
            source={image}
            style={styles.welcomeImage}>
            <Text style={styles.innerText}>{categoryName}</Text>
          </ImageBackground>
        </TouchableHighlight>
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
