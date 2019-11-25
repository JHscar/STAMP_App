import React from 'react';
import { Dimensions, Image } from "react-native";
import { createAppContainer, createStackNavigator, createDrawerNavigator } from 'react-navigation';

import SideBar from './side/SideBar';

import Main from '../screens/main/Main';
import Honor from '../screens/main/Honor';
import MailBox from '../screens/main/MailBox';
import Inventory from '../screens/main/Inventory';
import MissionRecord from '../screens/main/MissionRecord';
import Wallet from '../screens/main/Wallet';

const TestDraw = createDrawerNavigator(
    {
        홈: {
            screen: Main,
        },
        칭호: {
            screen: Honor,
        },
        알림함: {
            screen: MailBox,
        },
        인벤토리: {
            screen: Inventory,
        },
        미션기록: {
            screen: MissionRecord,
        },
        지갑: {
            screen: Wallet,
        },
    },
    {
        contentComponent: props => <SideBar {...props} />,
        drawerWidth: Dimensions.get("window").width * 0.85,
    }
);



export default createAppContainer(TestDraw);