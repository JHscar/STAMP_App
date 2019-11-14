import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';


// 인증 전 (로그인/회원가입)
import Login from '../screens/auth/Login';
import Join from '../screens/auth/Join';

const AuthStack = createStackNavigator({ Login, Join });
// 인증 후 -> 메인페이지 이동
import MainTabNavigator from './MainTabNavigator';



export default createAppContainer(
  createSwitchNavigator(
    { // 인증 전,후 분기
      Auth: AuthStack,
      Main: MainTabNavigator,
    },
    {
      initialRouteName: "Auth"
    }
  )
);
