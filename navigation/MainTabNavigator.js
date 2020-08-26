import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';



import TabBarIcon from '../components/TabBarIcon';
import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import HoursScreen from '../screens/HoursScreen';
import InventoryByCategoryScreen from '../screens/InventoryByCategoryScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import PrivacyScreen from '../screens/PrivacyScreen';
import SettingsScreen from '../screens/SettingsScreen';

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
    <Text style={{alignSelf:'center', marginBottom: 3, fontSize: 12, color: focused ? Colors.tabIconSelected : Colors.tabIconDefault}}>Inventory</Text>),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? `ios-checkbox` : 'md-checkbox'}/>
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
    <Text style={{alignSelf:'center', marginBottom: 3, fontSize: 12, color: focused ? Colors.tabIconSelected : Colors.tabIconDefault}}>Hours</Text>),  
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-time' : 'md-time'} />
  ),
};

HoursStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
    Notifications: NotificationsScreen,
    Privacy: PrivacyScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <Text style={{alignSelf:'center', marginBottom: 3, fontSize: 12, color: focused ? Colors.tabIconSelected : Colors.tabIconDefault}}>Menu</Text>),  
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu '} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  HoursStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
