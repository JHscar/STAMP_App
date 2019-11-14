import React from 'react';
import {
    AsyncStorage,
    Button,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default Join = (props) => {
    const { navigation } = props;
    // console.log(navigation)

    _login = async() => {
        await AsyncStorage.setItem('userToken', 'abc');
        navigation.navigate("AuthChecker")
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>screens 안녕하세요</Text>
            <Button
                title="Login"
                onPress={_login}
            />
            <Button
                title="회원가입"
                onPress={() => { navigation.navigate("Join") }}
            />
        </View>
    )
};
Join.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center", // 상하
        alignItems: "center", // 좌우
    },
    text: {
        fontFamily: "jua",
        fontSize: 40,
    },
});