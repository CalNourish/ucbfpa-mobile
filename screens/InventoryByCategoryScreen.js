import React from 'react';
import {
  Button,
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
import Icons from '../constants/Icons';
import Colors from '../constants/Colors';

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
    if (count < 10) {
      return (<Text style={styles.itemCountLow}>{count} in stock</Text>);
    } else if (count < 20) {
      return (<Text style={styles.itemCountMedium}>{count} in stock</Text>);
    } else {
      return (<Text style={styles.itemCountHigh}>{count} in stock</Text>);
    }
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
              name={Icons.CATEGORY_ICONS[this.state.categoryDisplayName]}
              type='material-community'
              size={RFValue(30)}
              color={Colors.primaryTextColor}
            />
          </View>
          <View style={styles.iconHolder}>
            <Text style={styles.itemName}>{itemName}</Text>
            {this.renderStockCount(itemCount)}
          </View>
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
  touchable: {
    flexDirection: "row",
    height: 80,
    width: win.width - 20,
    justifyContent: 'flex-start',
    marginLeft: 10,
    marginRight: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.accentColor,   
    alignContent: 'center'
  },
  itemName: {
    color: Colors.primaryTextColor,
    fontSize: RFValue(14),
    fontWeight: 'bold',
    textAlign: 'left',
    justifyContent: 'flex-start',
  },
  itemCountHigh: {
    color: '#228c22',
    fontSize: RFValue(14),
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 10,
    justifyContent: 'flex-start',
  },
  itemCountMedium: {
    color: '#febd40',
    fontSize: RFValue(14),
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 10,
    justifyContent: 'flex-start',
  },
  itemCountLow: {
    color: '#c21807',
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
