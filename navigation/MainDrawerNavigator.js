import React, { Component } from 'react'
import { Dimensions, Image } from "react-native";

import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";

import { Feather } from "@expo/vector-icons";
import SideBar from "./Side/SideBar";
import MainTabNavigator from "./MainTabNavigator";

import honor_Draw from '../screens/Draw_Category/honor';
import alarm_Draw from '../screens/Draw_Category/alarm';
import inventory_Draw from '../screens/Draw_Category/inventory';
import missionRecord_Draw from '../screens/Draw_Category/missionRecord';
import wallet_Draw from '../screens/Draw_Category/wallet';

const DrawerNavigator = createDrawerNavigator(
    {
        홈: {
            screen: MainTabNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => <Feather name="home" size={25} color={tintColor} />
            }
        },
        국밥종결자: {
            screen: honor_Draw,
            navigationOptions: {
                title: "국밥종결자",
                drawerIcon: ({ tintColor }) => <Image source={require("../assets/images/medal.png")} style={{ width: 45, height: 45 }} color={tintColor} />
            }
        },
        알림함: {
            screen: alarm_Draw,
            navigationOptions: {
                title: "알림함",
                drawerIcon: ({ tintColor }) => <Image source={require("../assets/images/alarm.png")} style={{ width: 45, height: 45 }} color={tintColor} />
            }
        },
        인벤토리: {
            screen: inventory_Draw,
            navigationOptions: {
                title: "인벤토리",
                drawerIcon: ({ tintColor }) => <Image source={require("../assets/images/inventory.png")} style={{ width: 45, height: 45 }} color={tintColor} />
            }
        },
        미션기록: {
            screen: missionRecord_Draw,
            navigationOptions: {
                title: "미션기록",
                drawerIcon: ({ tintColor }) => <Image source={require("../assets/images/missionRecord.png")} style={{ width: 45, height: 45 }} color={tintColor} />
            }
        },
        지갑: {
            screen: wallet_Draw,
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