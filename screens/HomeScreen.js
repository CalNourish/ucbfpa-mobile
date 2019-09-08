import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { RFValue } from "react-native-responsive-fontsize";
import * as firebase from 'firebase';
import Icons from '../constants/Icons'
import Colors from '../constants/Colors';

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
      categoryImages.push(
        <TouchableOpacity 
          key={categoryKey}
          style={styles.touchable}
          onPress={this.onPressCategory.bind(this, categoryKey, categoryDisplayName)}>
          <View style={styles.iconHolder}>
            <Icon
              name={Icons.CATEGORY_ICONS[categoryDisplayName]}
              type='material-community'
              size={RFValue(30)}
              color={Colors.primaryTextColor}
            />
          </View>
          <Text style={styles.text}>{categoryDisplayName}</Text>
        </TouchableOpacity>
      );
    });
    return categoryImages;
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>Live Inventory</Text>
        <ScrollView style={styles.contentContainer}>
          <View>
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
    padding: 10,
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
  iconHolder: {
    justifyContent: "center",    
  },
  touchable: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: '#febd40',
    
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
    backgroundColor: '#fff'
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
  text: {
    flex: 1,
    color: '#4d4d4d',
    fontSize: RFValue(18),
    textAlign: 'left',
    marginStart: 10,
    justifyContent: 'flex-start',
  },
});
