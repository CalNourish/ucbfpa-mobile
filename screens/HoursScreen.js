import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as firebase from 'firebase';

export default class HoursScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      days_times: {},
    };
  }

  async componentDidMount() {
    var days_times = {};
    await firebase
      .database()
      .ref('info')
      .once('value')
      .then(function(data) {
        data.forEach(function(childNode) {
          var day = childNode.val();
          days_times[childNode.key] = {
            openingHours: day['12hours'],
            restock: day['restock']

          };
        });
        this.setState({
          days_times: days_times
        });
      }.bind(this));
  }

  renderCategories() {
    var categoryImages = [];
    Object.entries(this.state.days_times).map(([dayKey, day]) => {
      var openingHours = day['openingHours'];
      var restockDays = day['restock'];
      if (openingHours) {
        categoryImages.push(
        <TouchableOpacity 
          key={dayKey}
          style={styles.touchable}>
            <Text key={dayKey} style={styles.text}>{dayKey}: {openingHours}</Text>
            <Text key={dayKey + dayKey} style={styles.text}>{restockDays['bread']}</Text> 
            {/* need to make keys unique */}

        </TouchableOpacity>
        );
      };
      
    });
    return categoryImages;
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Hours</Text>
        </View>
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

  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  touchable: {
    height: 40,
    width: win.width*0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 10,
    backgroundColor: '#949494',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  view: {
    position: 'absolute',
    backgroundColor: 'transparent'
  },

  text: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'left',
    marginStart: 10,
    justifyContent: 'flex-start',
  },
  title: {
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

