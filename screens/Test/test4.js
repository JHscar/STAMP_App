import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default class Screen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                
                    <TouchableOpacity
                        style={{ alignItems: "flex-start", margin: 16 }}
                        onPress={this.props.navigation.openDrawer}
                    >
                        <FontAwesome5 name="bars" size={24} color="#161924" />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Text style={styles.text}>{this.props.name} 미션기록</Text>
                    </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        marginTop: 25
    },
    text: {
        color: "#161924",
        fontSize: 20,
        fontWeight: "500"
    }
});