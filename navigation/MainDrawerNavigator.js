import React, { Component } from 'react'
import { Dimensions, Image } from "react-native";

import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";

import { Feather } from "@expo/vector-icons";
import SideBar from "./Side/SideBar";
import MainTabNavigator from "./MainTabNavigator";

import Test1_Draw from '../screens/Test/test';
import Test2_Draw from '../screens/Test/test2';
import Test3_Draw from '../screens/Test/test3';
import Test4_Draw from '../screens/Test/test4';
import Test5_Draw from '../screens/Test/test5';

const DrawerNavigator = createDrawerNavigator(
    {
        홈: {
            screen: MainTabNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => <Feather name="home" size={25} color={tintColor} />
            }
        },
        국밥종결자: {
            screen: Test1_Draw,
            navigationOptions: {
                title: "국밥종결자",
                drawerIcon: ({ tintColor }) => <Image source={require("../assets/images/medal.png")} style={{ width: 45, height: 45 }} color={tintColor} />
            }
        },
        알림함: {
            screen: Test2_Draw,
            navigationOptions: {
                title: "알림함",
                drawerIcon: ({ tintColor }) => <Image source={require("../assets/images/alarm.png")} style={{ width: 45, height: 45 }} color={tintColor} />
            }
        },
        인벤토리: {
            screen: Test3_Draw,
            navigationOptions: {
                title: "인벤토리",
                drawerIcon: ({ tintColor }) => <Image source={require("../assets/images/inventory.png")} style={{ width: 45, height: 45 }} color={tintColor} />
            }
        },
        미션기록: {
            screen: Test4_Draw,
            navigationOptions: {
                title: "미션기록",
                drawerIcon: ({ tintColor }) => <Image source={require("../assets/images/missionRecord.png")} style={{ width: 45, height: 45 }} color={tintColor} />
            }
        },
        지갑: {
            screen: Test5_Draw,
            navigationOptions: {
                title: "지갑",
                drawerIcon: ({ tintColor }) => <Image source={require("../assets/images/wallet.png")} style={{ width: 45, height: 45 }} color={tintColor} />
            }
        },
    },
    {
        contentComponent: props => <SideBar {...props} />,

        drawerWidth: Dimensions.get("window").width * 0.85,
        hideStatusBar: true,

        contentOptions: {
            activeBackgroundColor: "rgba(212,118,207, 0.2)",
            activeTintColor: "#3b465b",
            itemsContainerStyle: {
                marginTop: 16,
                marginHorizontal: 8,
            },
            itemStyle: {
                borderRadius: 4
            }
        }
    }
);

export default createAppContainer(DrawerNavigator);