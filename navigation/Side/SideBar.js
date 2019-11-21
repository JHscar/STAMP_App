import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image } from "react-native";
import { DrawerNavigatorItems } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";

export default SideBar = props => (
    <ScrollView>
        <View
            style={{ width: undefined, padding: 16, paddingTop: 48, backgroundColor: "#3b465b" }}
        >
            <Image source={require("../../assets/images/robot-dev.png")} style={styles.profile} />
            <Text style={styles.name}>이재훈</Text>

            <View style={{ flexDirection: "row" }}>
                <Text style={styles.followers}>"나는 React-native 중독자"</Text>
                <Ionicons name="md-people" size={16} color="rgba(255, 255, 255, 0.8)" />
            </View>
        </View>

        <View style={styles.container} forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
        </View>
    </ScrollView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    profile: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#FFF"
    },
    name: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "800",
        marginVertical: 8
    },
    followers: {
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: 13,
        marginRight: 4
    }
});
