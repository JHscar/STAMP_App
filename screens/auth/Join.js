import React from 'react';
import {
    Button,
    Text,
    View,
} from "react-native";
import { styles } from './Join_Style'

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
    title: "회원가입",
};