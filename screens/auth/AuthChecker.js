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
        props.navigation.navigate(userToken ? 'Main' : 'Auth');
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