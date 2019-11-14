import React, { useState, useEffect } from 'react';
import {
    Button,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from './Join_Style';
import { Ionicons } from '@expo/vector-icons';

export default Join = (props) => {
    const { navigation } = props;

    return (
        <ScrollView >
            <View style={styles.container}>
                <Text style={styles.field}>계정정보</Text>
                <View style={styles.inputSection}>
                    <View style={styles.iconWrap}>
                        <Ionicons name="md-person" size={30} color="black" />
                    </View>
                    <TextInput
                        style={styles.inputText}
                        placeholder="User ID ( Nick Name )"
                        placeholderTextColor="gray"
                        require
                        autoFocus
                    />
                    <TouchableOpacity activeOpacity={.5} style={styles.inputButton}>
                        <Text>중복확인</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputSection}>
                    <View style={styles.iconWrap}>
                        <Ionicons name="md-key" size={30} color="black" />
                    </View>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Password"
                        placeholderTextColor="gray"
                        secureTextEntry
                        require
                        autoFocus
                    />
                </View>
                <View style={styles.inputSection}>
                    <View style={styles.iconWrap}>
                        <Ionicons name="md-key" size={30} color="black" />
                    </View>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Confirm Password"
                        placeholderTextColor="gray"
                        secureTextEntry
                        require
                        autoFocus
                    />
                </View>
            </View>
        </ScrollView>
    )
};
Join.navigationOptions = {
    // header: null,
    title: "회원가입",
};