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

          for (let key in this.state.days_times) {
            if (key in data) {
                days_times[key] = convertTime(data[key]["24hours"])
                RESTOCK_INDICATORS[key]['restock'] = data[key]["restock"];  
            }
          }

        });
        this.setState({
          days_times: days_times
        });
      }.bind(this));
  }


  convertTime = time => {
    if (time != 'Closed' ) {
        let [start, end] = time.split('-')
        return [splitAndConvertTime(start), splitAndConvertTime(end)]
    }
    return ['Closed', null]
  } 

  splitAndConvertTime = time => {
    let [hr, mn] = time.split(':');
    let hour = (((parseInt(hr) + 11) % 12) + 1);
    let period = parseInt(hr) >= 12 ? 'PM' : 'AM'
    return `${hour}:${mn} ${period}`
  }

  renderDays() {
    var day = new Date();
    var categoryImages = [];
    if (Object.keys(this.state.days_times).length === 0) {
      return;
    }


    for (let i = 0; i < 7; i++) {
      let currentDay = weekday[(day.getDay() + i) % 7];
      // Find in the dictionary because we named it in weird way in the actual db
      let time = this.state.days_times["-" + currentDay.toLowerCase()]
      let restock_today = RESTOCK_INDICATORS["-" + currentDay.toLowerCase()]['restock']
      categoryImages.push(
        <TouchableOpacity 
          key={i}
          style={styles.touchable}>
            <Text style={styles.text}>{time} </Text>
            <Text style={styles.text}>{this.state.days_times["-" + currentDay.toLowerCase()]}</Text> 
            <Text style={styles.text}>{restock_today}</Text> 

            {/* need to make keys unique */}

        </TouchableOpacity>
      );
    }

    // Object.entries(this.state.days_times).map(([dayKey, day]) => {
    //   var openingHours = day['openingHours'];
    //   var restockDays = day['restock'];
    //   if (openingHours) {
    //     categoryImages.push(
    //     <TouchableOpacity 
    //       key={dayKey}
    //       style={styles.touchable}>
    //         <Text key={dayKey} style={styles.text}>{dayKey}: {openingHours}</Text>
    //         <Text key={dayKey + dayKey} style={styles.text}>{restockDays['bread']}</Text> 
    //         {/* need to make keys unique */}

    //     </TouchableOpacity>
    //     );
    //   };
      
    // });
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
            {this.renderDays()}
          </View>
          <Text> {weekday} </Text>
        </ScrollView>
      </View>
    );
  }
}

// const DAYS_TIMES = {
//   '-sunday': '',
//   '-monday': '',
//   '-tuesday': '', 
//   '-wednesday': '',
//   '-thursday': '',
//   '-friday': '',
//   '-saturday': ''
// }

//Dictionary for the categories that are restocked each day
const RESTOCK_INDICATORS = {
  '-sunday': {},
  '-monday': {},
  '-tuesday': {}, 
  '-wednesday': {},
  '-thursday': {},
  '-friday': {},
  '-saturday': {}
}

//Dictionary for emojis for each resotck category
const EMOJIS = {
  '-none':'',
  'bread': '🥖',
  'eggs': '🥚',
  'milk': '🥛', 
  'prepared': '🥡',
  'produce': '🥦',
  'shelf': '🥫',
}
const weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

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

