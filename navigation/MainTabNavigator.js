import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import InventoryByCategoryScreen from '../screens/InventoryByCategoryScreen';
import HoursScreen from '../screens/HoursScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import Colors from '../constants/Colors';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Inventory: InventoryByCategoryScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <Text style={{marginBottom: 3, fontSize: 12, color: focused ? Colors.tabIconSelected : Colors.tabIconDefault}}>Inventory</Text>),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? `ios-list` : 'md-list'}/>
  ),
};

HomeStack.path = '';

const HoursStack = createStackNavigator(
  {
    Hours: HoursScreen,
  },
  config
);

HoursStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <Text style={{marginBottom: 3, fontSize: 12, color: focused ? Colors.tabIconSelected : Colors.tabIconDefault}}>Hours</Text>),  
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-time' : 'md-time'} />
  ),
};

HoursStack.path = '';

const NotificationsStack = createStackNavigator(
  {
    Notifications: NotificationsScreen,
  },
  config
);

NotificationsStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <Text style={{marginBottom: 3, fontSize: 12, color: focused ? Colors.tabIconSelected : Colors.tabIconDefault}}>Notifications</Text>),  
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-notifications' : 'md-notifications'} />
  ),
};

NotificationsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  HoursStack,
  NotificationsStack,
});

tabNavigator.path = '';

export default tabNavigator;
