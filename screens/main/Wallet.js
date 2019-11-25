import React from "react";
import { AsyncStorage, View, Text, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const StatusBarH = StatusBar.currentHeight;

export default class wallet extends React.Component {
    render() {

        _logout = () => {
            AsyncStorage.clear();
            this.props.navigation.navigate("AuthChecker");
        }
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Text style={styles.text}>{this.props.name} 지갑</Text>
                    <TouchableOpacity onPress={_logout}><Text>logout</Text></TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        marginTop: StatusBarH,
    },
    text: {
        color: "#161924",
        fontSize: 20,
        fontWeight: "500"
    }
});