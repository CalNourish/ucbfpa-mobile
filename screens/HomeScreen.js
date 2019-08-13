import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
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
        data.forEach(function(childNode) {
          var category = childNode.val();
          categories[childNode.key] = {
            categoryImage: getImage(category['fileName']),
            categoryDisplayName: category['displayName']
          };
        });
        this.setState({
          categories: categories
        });
      }.bind(this));
  }

  onPressCategory(categoryKey) {
    this.props.navigation.navigate('Inventory', { category: categoryKey });
  }

  renderCategories() {
    var categoryImages = [];
    Object.entries(this.state.categories).map(([categoryName, category]) => {
      categoryImages.push(
        <TouchableOpacity 
          key={categoryName}
          style={styles.touchable}
          onPress={this.onPressCategory.bind(this, categoryName)}>
            <ImageBackground
              source={category['categoryImage']}
              style={styles.image}>
              <Text style={styles.text}>{category['categoryDisplayName']}</Text>
            </ImageBackground>
        </TouchableOpacity>
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

const win = Dimensions.get('window');
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
  categoryCard: {
    width: 400,
    height: 80,
    backgroundColor: '#fff',
  },
  touchable: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#febd40',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  view: {
    position: 'absolute',
    backgroundColor: 'transparent'
  },
  image: {
    height: 80,
    width: win.width - 20,
    justifyContent: 'center',
    borderRadius: 10,
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginStart: 10,
    justifyContent: 'flex-start',
  },
});
