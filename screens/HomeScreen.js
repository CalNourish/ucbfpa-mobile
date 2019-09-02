import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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

  onPressCategory(categoryKey, displayName) {
    this.props.navigation.navigate('Inventory', {
      category: categoryKey,
      categoryDisplayName: displayName,
    });
  }
  

  renderCategories() {
    var categoryImages = [];
    Object.entries(this.state.categories).map(([categoryKey, category]) => {
      var categoryDisplayName = category['categoryDisplayName'];
      var categoryImage = category['categoryImage'];
      categoryImages.push(
        <TouchableOpacity 
          key={categoryKey}
          style={styles.touchable}
          onPress={this.onPressCategory.bind(this, categoryKey, categoryDisplayName)}>
            <Text style={styles.text}>{categoryDisplayName}</Text>

            <ImageBackground
              source={categoryImage}
              style={styles.image}>
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
    width: win.width - 20,
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
    flex: 2,
    height: 80,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#a3a3a3'
  },
  text: {
    flex: 1,
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginStart: 10,
    justifyContent: 'flex-start',
  },
});
