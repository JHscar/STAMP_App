import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';

export default authChecker = (props) => {

    _authChecker = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        const userId = await AsyncStorage.getItem("userId");
        console.log(userId,":",userToken); // 자동로그인 : 서버에 token 확인필요.
        props.navigation.navigate(userToken ? 'Main_Drawer' : 'Auth');
    }
    useEffect(() => { _authChecker(); }, [])
    return (
        <View style={styles.container}>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});