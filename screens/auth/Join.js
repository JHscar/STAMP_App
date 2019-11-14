import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default Join = (props) => {
    const { navigation } = props;
    console.log(navigation)
    return (
        <View style={styles.container}>
            <Text style={styles.text}>회원가입</Text>
            <Button
                title="뒤로"
                onPress={() => { navigation.navigate("Login") }}
            />

        </View>
    )
};
Join.navigationOptions = {
    // header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center", // 상하
        alignItems: "center", // 좌우
    },
    text: {
        fontWeight: "bold",
        fontSize: 40
    },
});