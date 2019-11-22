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
/**
 * ========================================================================================================================
 * 메인페이지   ( 찜한 것 들만 보임)
 */
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

/**
 * ========================================================================================================================
 * 예정 페이지
 */
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

/**
 * ========================================================================================================================
 * 진행중 미션 보기 
 */
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

/**
 * ========================================================================================================================
 * 기능 테스트 페이지
 */
import TestScreen from '../screens/Test'
const TestStack = createStackNavigator(
  {
    test_1: TestScreen,
  },
  {
    headerMode: null,
  }
);

TestStack.navigationOptions = {
  tabBarLabel: '기능테스트',
  tabBarIcon: ({ tintColor }) =>
    <Image source={require("../assets/images/expect.png")} style={{ width: 35, height: 35 }} color={tintColor} />
};

TestStack.path = '';



const tabNavigator = createBottomTabNavigator({
  MainMapStack,
  LinksStack,
  MissionListStack,
  TestStack,
});

tabNavigator.path = '';

export default createAppContainer(tabNavigator);

