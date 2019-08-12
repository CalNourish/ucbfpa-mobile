import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import * as firebase from 'firebase';
import { Icon } from 'react-native-elements';

const win = Dimensions.get('window');


export default class InventoryByCategoryScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      category: this.props.navigation.state.params.category,
      inventory: {},
      categoryDisplayName: null,
    };
  }

  async componentDidMount() {
    var inventory = {};

    await firebase
      .database()
      .ref('inventory')
      .once('value')
      .then(function(data) {
        data.forEach(function(childNode) {
          var item = childNode.val();
          if (item['categoryName'][this.state.category] !== undefined) {
            inventory[item['itemName']] = item['count'];
          }
        }.bind(this));
        this.setState({
          inventory: inventory
        });
      }.bind(this));

    await firebase
    .database()
    .ref('category/'+ this.state.category)
    .once('value')
    .then(function(data) {
      var categoryVal = data.val();
      this.setState({
        categoryDisplayName: categoryVal['displayName']
      });
    }.bind(this));
  }

  renderInventory() {
    var itemRows = [];
    Object.entries(this.state.inventory).map(([itemName, itemCount]) => {
      itemRows.push(
        <TouchableOpacity 
          key={itemName}
          style={styles.touchable}>
          <View style={styles.iconHolder}>
            <Icon
              name='food-apple-outline'
              type='material-community'
              size = {30} />
          </View>
          <View style={styles.iconHolder}>
            <Text style={styles.itemName}> {itemName}</Text>
            <Text style={styles.itemCount}> {itemCount} in stock </Text>
          </View>
         
        </TouchableOpacity>
        
      );
    });
    return itemRows;
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.categoryName}>
          {this.state.categoryDisplayName} 
        </Text>
        </View>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            {this.renderInventory()}
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
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  touchable: {
    flexDirection: "row",
    height: 80,
    width: win.width - 20,
    justifyContent: 'flex-start',
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    alignContent: 'center'
  },
  itemName: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
    justifyContent: 'flex-start',
  },
  itemCount: {
    color: '#000000',
    fontSize: 14,
    textAlign: 'left',
    marginTop:10,
    justifyContent: 'flex-start',
  },
  iconHolder: {
    justifyContent: "center",
    marginLeft: 10,
    
  },
  categoryName: {
    color: '#000000',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    marginStart: 10,
    marginTop:30,
    marginBottom:10,
    justifyContent: 'flex-start',
  }
});
