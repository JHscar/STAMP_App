import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';


// 인증 체크 
import AuthChecker from '../screens/auth/AuthChecker';

// 토큰 no -> 인증 체크 (fail) -> Auth Nav
import Login from '../screens/auth/Login';
import Join from '../screens/auth/Join';
const AuthStack = createStackNavigator({ Login, Join });

// 토큰 ok -> 인증 체크 (success) -> Main Nav
import MainNavigator from './MainNavigator';


export default createAppContainer(
  createSwitchNavigator(
    {
      AuthChecker,
      Auth: AuthStack,
      Main: MainNavigator
    },
    {
      initialRouteName: "AuthChecker"
    }
  )
);
