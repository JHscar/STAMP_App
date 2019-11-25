import React from 'react';
import { StyleSheet, ScrollView, View, Image, Text } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';

export default SideBar = props => (
    <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <View
                style={{ width: undefined, padding: 16, paddingTop: 48, backgroundColor: "#3b465b" }}
            >
                <Image source={require("../../assets/images/robot-dev.png")} style={styles.profile} />
                <Text style={styles.name}>이재훈</Text>

                <View style={{ flexDirection: "row" }}>
                    <Image source={require("../../assets/images/medal.png")} style={{ width: 20, height: 20 }} />
                    <Text style={styles.followers}>"나는 React-native 중독자"</Text>
                </View>
            </View>
            <View style={styles.container} forceInset={{ top: "always", horizontal: "never" }}>
                <DrawerItems {...props} />
            </View>
        </SafeAreaView>
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