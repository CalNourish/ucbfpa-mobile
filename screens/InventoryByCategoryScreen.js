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

const win = Dimensions.get('window');


export default class InventoryByCategoryScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      category: this.props.navigation.state.params.category,
      inventory: {}
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
  }

  renderInventory() {
    var itemRows = [];
    Object.entries(this.state.inventory).map(([itemName, itemCount]) => {
      itemRows.push(
        <TouchableOpacity 
          key={itemName}
          style={styles.touchable}>
          <Text style={styles.itemName}> {itemName}</Text>
          <Text style={styles.itemCount}> {itemCount} in stock </Text>
        </TouchableOpacity>
        
      );
    });
    return itemRows;
  }

  render() {
    return (
      <View style={styles.container}>
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
    paddingTop: 15,
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
  touchable: {
    height: 80,
    width: win.width - 20,
    justifyContent: 'flex-start',
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  itemName: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginStart: 10,
    marginTop:10,
    justifyContent: 'flex-start',
  },
  itemCount: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
    marginStart: 10,
    marginTop:10,
    justifyContent: 'flex-start',
  },
});
