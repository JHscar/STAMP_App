import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const StatusBarH = StatusBar.currentHeight;

export default class inventory extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                              <View style={{ alignItems: "flex-start" }}>
                    <TouchableOpacity
                        style={{ alignItems: "flex-start", margin: 16 }}
                        onPress={this.props.navigation.openDrawer}
                    >
                        <FontAwesome5 name="bars" size={24} color="#161924" />
                    </TouchableOpacity>
                </View>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Text style={styles.text}>{this.props.name} 인벤토리</Text>
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