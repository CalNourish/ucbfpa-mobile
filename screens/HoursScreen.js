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


import { ExpoLinksView } from '@expo/samples';

// export default function HoursScreen() {
//   return (
//     <ScrollView style={styles.container}>
//       {/**
//        * Go ahead and delete ExpoLinksView and replace it with your content;
//        * we just wanted to provide you with some helpful links.
//        */}
//       {/* <ExpoLinksView /> */}
//       <Text>Hours will go here.</Text>
      
//     </ScrollView>
//   );
// }

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

  // onPressCategory(categoryKey, displayName) {
  //   this.props.navigation.navigate('Inventory', {
  //     category: categoryKey,
  //     categoryDisplayName: displayName,
  //   });
  // }

  renderCategories() {
    var categoryImages = [];
    Object.entries(this.state.days_times).map(([dayKey, day]) => {
      var openingHours = day['openingHours'];
      if (openingHours) {
        categoryImages.push(
        <TouchableOpacity 
          key={dayKey}
          style={styles.touchable}>
            <Text key={dayKey} style={styles.text}>{dayKey}: {openingHours}</Text>
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

// HoursScreen.navigationOptions = {
//   title: 'Hours',
// };

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

