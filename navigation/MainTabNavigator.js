import React, { Component } from 'react';
import { Platform, View, TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';

import MainMap from '../screens/MainMap';
import MissionList from '../screens/MissionPage/MissionList';
import MissionView from '../screens/MissionPage/MissionView';



// 밑은 BottomNavigation

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const MainMapStack = createStackNavigator(
  {
    Home: {
      screen: MainMap,
    }
  },
);

MainMapStack.navigationOptions = {
  tabBarLabel: '찜',
  tabBarIcon: ({ tintColor }) =>
    <Image source={require("../assets/images/heart.png")} style={{ width: 35, height: 35 }} color={tintColor} />
};

MainMapStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: '예정',
  tabBarIcon: ({ tintColor }) =>
    <Image source={require("../assets/images/expect.png")} style={{ width: 35, height: 35 }} color={tintColor} />
};

LinksStack.path = '';

const MissionListStack = createStackNavigator(
  {
    Mission_list: { screen: MissionList },
    Mission_View: { screen: MissionView },
  },
  { initialRouteName: "Mission_list" },
);

MissionListStack.navigationOptions = {
  tabBarLabel: '진행중',
  tabBarIcon: ({ tintColor }) =>
    <Image source={require("../assets/images/ing.png")} style={{ width: 35, height: 35 }} color={tintColor} />
};

MissionListStack.path = '';



const tabNavigator = createBottomTabNavigator({
  MainMapStack,
  LinksStack,
  MissionListStack,
});

tabNavigator.path = '';

export default createAppContainer(tabNavigator);

