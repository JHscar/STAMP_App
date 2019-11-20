import React, { Component } from 'react';
import { Platform, View, TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';

import MissionList from '../screens/MissionPage/MissionList';
import MissionView from '../screens/MissionPage/MissionView';

import Test1_Draw from '../screens/Test/test';
import Test2_Draw from '../screens/Test/test2';
import Test3_Draw from '../screens/Test/test3';




//밑은 DrawerNav 바 생성

class NavigationDrawerStructure extends Component {

  toggleDrawer = () => {
    this.props.navigationProps.toggleDrawer();
  };

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={require('../assets/images/drawer.png')}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}


const DrawTest1_StackNavigator = createStackNavigator({
  First: {
    screen: Test1_Draw,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#fff',
    }),
  },
});


const DrawTest2_StackNavigator = createStackNavigator({
  Second: {
    screen: Test2_Draw,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});


const DrawTest3_StackNavigator = createStackNavigator({
  Third: {
    screen: Test3_Draw,
    navigationOptions: ({ navigation }) => ({
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#FF9800',
      },
      headerTintColor: '#fff',
    }),
  },
});



// 밑은 BottomNavigation

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#fff',
      }),
    }
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const MissionListStack = createStackNavigator(
  {
    Mission_list: {
      screen: MissionList,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#fff',
      }),
    },
    Mission_View: { screen: MissionView },
  },
  { initialRouteName: "Mission_list" },
);

MissionListStack.navigationOptions = {
  tabBarLabel: 'Mission',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

MissionListStack.path = '';



const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  MissionListStack,
});

tabNavigator.path = '';


const Test_Drawer = createDrawerNavigator({
  tabnavi: { screen: tabNavigator },
  Test1: { screen: DrawTest1_StackNavigator },
  Test2: { screen: DrawTest2_StackNavigator },
  Test3: { screen: DrawTest3_StackNavigator },
})




export default createAppContainer(Test_Drawer);

