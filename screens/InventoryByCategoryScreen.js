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

import Colors from '../constants/Colors';
import Icons from '../constants/Icons';

export default class InventoryByCategoryScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('categoryDisplayName'),
      headerLeft: (
        <View style={styles.iconHolder}>
          <Icon
            name={Icons.NAVIGATION_ICONS['back']}
            type='material-community'
            size={RFValue(30)}
            color={Colors.primaryTextColor}
            style={styles.topNavButton}
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      ),
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      category: this.props.navigation.state.params.category,
      categoryDisplayName: this.props.navigation.state.params.categoryDisplayName,
      inventory: {},
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

  renderStockCount(count) {
    if (count == 0) {
      return (<Text style={styles.itemCountOut}>Not in stock</Text>);
    } else if (count < 10) {
      return (<Text style={styles.itemCountLow}>{count} in stock</Text>);
    } else if (count < 20) {
      return (<Text style={styles.itemCountMedium}>{count} in stock</Text>);
    } else {
      return (<Text style={styles.itemCountHigh}>{count} in stock</Text>);
    }
  }

  renderItem(itemName, itemCount) {
    if (itemCount == 0) {
      return (
        <TouchableOpacity 
          key={itemName}
          style={styles.outOfStock}>
          <View style={styles.iconHolder}>
            <Icon
              name={Icons.CATEGORY_ICONS[this.state.categoryDisplayName]}
              type='material-community'
              size={RFValue(30)}
              color={Colors.itemOutOfStock}
            />
          </View>
          <View style={styles.iconHolder}>
            <Text style={styles.itemNameOutOfStock}>{itemName}</Text>
            {this.renderStockCount(itemCount)}
          </View>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity 
          key={itemName}
          style={styles.inStock}>
          <View style={styles.iconHolder}>
            <Icon
              name={Icons.CATEGORY_ICONS[this.state.categoryDisplayName]}
              type='material-community'
              size={RFValue(30)}
              color={Colors.primaryTextColor}
            />
          </View>
          <View style={styles.iconHolder}>
            <Text style={styles.itemNameInStock}>{itemName}</Text>
            {this.renderStockCount(itemCount)}
          </View>
        </TouchableOpacity>
      )
    }
  }

  renderInventory() {
    var itemRows = [];
    Object.entries(this.state.inventory).map(([itemName, itemCount]) => {
      itemRows.push(
        this.renderItem(itemName, itemCount)
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

const win = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  inStock: {
    flexDirection: "row",
    height: 80,
    width: win.width - 20,
    justifyContent: 'flex-start',
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.accentColor,   
    alignContent: 'center'
  },
  outOfStock: {
    flexDirection: "row",
    height: 80,
    width: win.width - 20,
    justifyContent: 'flex-start',
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.accentColor,   
    alignContent: 'center'
  },
  itemNameInStock: {
    color: Colors.primaryTextColor,
    fontSize: RFValue(14),
    fontWeight: 'bold',
    textAlign: 'left',
    justifyContent: 'flex-start',
  },
  itemNameOutOfStock: {
    color: Colors.itemOutOfStock,
    fontSize: RFValue(14),
    fontWeight: 'bold',
    textAlign: 'left',
    justifyContent: 'flex-start',
  },
  itemCountHigh: {
    color: Colors.itemCountHigh,
    fontSize: RFValue(14),
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 10,
    justifyContent: 'flex-start',
  },
  itemCountMedium: {
    color: Colors.itemCountMedium,
    fontSize: RFValue(14),
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 10,
    justifyContent: 'flex-start',
  },
  itemCountLow: {
    color: Colors.itemCountLow,
    fontSize: RFValue(14),
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 10,
    justifyContent: 'flex-start',
  },
  itemCountOut: {
    color: Colors.itemOutOfStock,
    fontSize: RFValue(14),
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 10,
    justifyContent: 'flex-start',
  },
  iconHolder: {
    justifyContent: "center",
    marginLeft: 10,
  },
  categoryName: {
    color: Colors.primaryTextColor,
    fontSize: RFValue(22),
    fontWeight: 'bold',
    textAlign: 'left',
    marginStart: 10,
    marginTop: 30,
    marginBottom: 10,
    justifyContent: 'flex-start',
  }
});
