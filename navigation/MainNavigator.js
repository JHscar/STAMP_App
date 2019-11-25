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
            navigationOptions: {
                title: "칭호",
                drawerIcon: ({ tintColor }) => <Image source={require("../assets/images/medal.png")} style={{ width: 45, height: 45 }} color={tintColor} />
            }
        },
        알림함: {
            screen: MailBox,
            navigationOptions: {
                title: "알림함",
                drawerIcon: ({ tintColor }) => <Image source={require("../assets/images/alarm.png")} style={{ width: 45, height: 45 }} color={tintColor} />
            }
        },
        인벤토리: {
            screen: Inventory,
            navigationOptions: {
                title: "인벤토리",
                drawerIcon: ({ tintColor }) => <Image source={require("../assets/images/inventory.png")} style={{ width: 45, height: 45 }} color={tintColor} />
            }
        },
        미션기록: {
            screen: MissionRecord,
            navigationOptions: {
                title: "미션기록",
                drawerIcon: ({ tintColor }) => <Image source={require("../assets/images/missionRecord.png")} style={{ width: 45, height: 45 }} color={tintColor} />
            }
        },
        지갑: {
            screen: Wallet,
            navigationOptions: {
                title: "지갑",
                drawerIcon: ({ tintColor }) => <Image source={require("../assets/images/wallet.png")} style={{ width: 45, height: 45 }} color={tintColor} />
            }
        },
    },
    {
        contentComponent: props => <SideBar {...props} />,
        drawerWidth: Dimensions.get("window").width * 0.75,
    }
);



export default createAppContainer(TestDraw);