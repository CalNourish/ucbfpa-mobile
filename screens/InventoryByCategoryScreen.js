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
import * as firebase from 'firebase';
import Colors from '../constants/Colors';
import Icons from '../constants/Icons';


export default class InventoryByCategoryScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('categoryDisplayName'),
      headerLeft: (
        <Button
          title='< Back'
          onPress={() => navigation.navigate('Home')}
        />
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
              size={30}
              color={Colors.primaryTextColor}
            />
          </View>
          <View style={styles.iconHolder}>
            <Text style={styles.itemName}>{itemName}</Text>
            <Text style={styles.itemCount}>{itemCount} in stock</Text>
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
          style={styles.contentContainer}>
          <View style={styles.container}>
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
    padding: 10
  },
  welcomeContainer: {
    alignItems: 'center',
  },
  touchable: {
    flexDirection: "row",
    height: 80,
    width: win.width - 20,
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: Colors.accentColor,
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
