import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import HoursScreen from '../screens/HoursScreen';
import InventoryByCategoryScreen from '../screens/InventoryByCategoryScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import SettingsScreen from '../screens/SettingsScreen';
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
    <Text style={{alignSelf:'center', marginBottom: 3, fontSize: 12, color: focused ? Colors.tabIconSelected : Colors.tabIconDefault}}>Inventory</Text>),
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
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <Text style={{alignSelf:'center', marginBottom: 3, fontSize: 12, color: focused ? Colors.tabIconSelected : Colors.tabIconDefault}}>Settings</Text>),  
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'} />
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
