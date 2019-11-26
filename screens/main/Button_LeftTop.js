import React from "react";
import { Image, View, StatusBar, StyleSheet, TouchableOpacity, Platform } from "react-native";
import img_drawerMenu from '../../assets/images/drawMenu.png';

const StatusBarH = Platform.OS == "ios" ? 15 : StatusBar.currentHeight;

export default function Button_LeftTop({ navigation }) {
    return (
        // {/** 왼쪽 상단 버튼 */ }
        <View style={overStyle.topLeftSection} >
            <TouchableOpacity
                style={overStyle.topLeftButton}
                onPress={navigation.openDrawer}>
                <Image style={overStyle.topLeftImg} source={img_drawerMenu} />
            </TouchableOpacity>
        </View >
    );
};

const overStyle = StyleSheet.create({
    topLeftSection: {
        position: "absolute",
        top: StatusBarH + 10,
        left: 10,
    },
    topLeftButton: {
        width: 40,
        height: 40,
        backgroundColor: "rgba(220,220,220,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    topLeftImg: {
        width: 30,
        height: 30,
    },
});