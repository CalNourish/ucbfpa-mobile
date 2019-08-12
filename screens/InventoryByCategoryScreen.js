import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import * as firebase from 'firebase';

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
        <Text
          style={styles.innerText}
          key={itemName}>
          {itemName} - Count: {itemCount}
        </Text>
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
});
