import React from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import img_drawer from '../../assets/images/drawer.png';

const StatusBarH = StatusBar.currentHeight;

export default class MainBox extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                {/** 왼쪽 상단 버튼 */}
                <View style={overStyle.topLeftSection}>
                    <TouchableOpacity
                        style={overStyle.topLeftButton}
                        onPress={navigation.openDrawer}>
                        <Image style={overStyle.topLeftImg} source={img_drawer} />
                    </TouchableOpacity>
                </View>


                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={styles.text}>{this.props.name} 알림함</Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "red",
    },
    text: {
        color: "#161924",
        fontSize: 20,
        fontWeight: "500"
    }
});

const overStyle = StyleSheet.create({
    topLeftSection: {
        position: "absolute",
        top: StatusBarH + 10,
        left: 10,
        // width: 100,
        // height: 100,
        // backgroundColor: "rgba(220,220,220,0.5)",
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