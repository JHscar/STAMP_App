import React, { useState, useEffect, Fragment } from 'react';
import {
    AsyncStorage,
    ActivityIndicator,
    Button,
    Image,
    Keyboard,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ImageBackground,
} from "react-native";
import axios from 'axios';
import { styles } from './Login_Style';
import { Ionicons } from '@expo/vector-icons';

export default Join = (props) => {
    const { navigation } = props;
    // navigation.navigate("AuthChecker");
    /**
    * ============================================================================================================================
    *          loding state
    * ============================================================================================================================ 
    */
    const [isLoading, setisLoading] = useState(false);
    // const _Loading = () => {
    //     setisLoading(true);
    //     console.log("로딩중", isLoading);
    //     setTimeout(() => { // 
    //         setisLoading(false);
    //         console.log("완료", isLoading);
    //     }, 2000);
    // }
    //////////

    /**
     * ============================================================================================================================
     *          Keyboard Height Event
     * ============================================================================================================================ 
     */
    useEffect(() => {
        const KeyboardUp = Keyboard.addListener("keyboardDidShow", (e) => _KeyboardUp(e));
        const KeyboardDw = Keyboard.addListener("keyboardDidHide", (e) => _KeyboardDw(e));
        return () => {/*console.log("clean up");*/
            KeyboardUp.remove();
            KeyboardDw.remove();
        };
    }, []);
    const [keyboardH, setkeyboardH] = useState(0);
    const _KeyboardUp = (e) => { setkeyboardH(150);/*console.log(e.endCoordinates.height)*/ }
    const _KeyboardDw = (e) => { setkeyboardH(0); }
    /////////


    /**
    * ============================================================================================================================
    *          UserInput Infomation
    * ============================================================================================================================ 
    */
    const [LoginInfo, setLoginInfo] = useState({ id: "", password: "" });

    useEffect(() => { _validate("id") }, [LoginInfo.id]);
    useEffect(() => { _validate("password") }, [LoginInfo.password]);

    const _userInputs = (text, key) => { // 입력값 갱신용  
        setLoginInfo({ ...LoginInfo, [key]: text });
    };
    // console.log(LoginInfo);

    const _validate = (key) => { // 입력값 검증 함수
        const { id, password } = LoginInfo;

        if (key === "id") {
            const idRule = /([_]?[0-9a-zA-Z가-힣]){3,}/; // _가능, 3자 이상
            idRule.test(id)
                ? setWarning({ ...Warning, [key + "_w"]: "올바른 형식입니다.", [key + "_c"]: "blue" })
                : id.length > 0 && setWarning({ ...Warning, [key + "_w"]: "올바르지 않은 형식입니다.", [key + "_c"]: "red" });
        }
        if (key === "password") {
            const passwordRule = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&+=]).*$/; // 특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내의 암호
            passwordRule.test(password)
                ? setWarning({ ...Warning, [key + "_w"]: "올바른 형식입니다.", [key + "_c"]: "blue" })
                : password.length > 0 && setWarning({ ...Warning, [key + "_w"]: "올바르지 않은 형식입니다.  ( 8~15 자 / 특수문자 + 숫자 + 대소문자 )", [key + "_c"]: "red" });
        }
    };

    // *** Warning Component ***
    const WarningText = ({ wordFor }) => {
        return (
            <Text style={[styles.inputWarning, Warning[wordFor + "_c"] && { color: Warning[wordFor + "_c"] }]} >
                {Warning[wordFor + "_w"]}
            </Text>
        )
    }
    const [Warning, setWarning] = useState({  // 입력값 검증 결과 _w는 word, _c는 color
        id_w: "[ 아이디 ] 를 입력하세요. ( 3 자이상 / 특수문자 _ 만 가능 )",
        id_c: null,
        password_w: "[ 비밀번호 ] 를 입력하세요. ( 8~15 자 / 특수문자 + 숫자 + 대소문자 )",
        password_c: null,
    });
    //////////

    // *** DB check ***
    const baseURL = "https://stamp-test-server.herokuapp.com";

    _login = async () => {
        setisLoading(true); //로딩시작
        const { id, password } = LoginInfo;

        const { data } = await axios.post(
            `${baseURL}/auth/login`,
            { id, password }
        );

        console.log(data);
        if (data.result === true) {
            await AsyncStorage.setItem('userToken', data.token, () => {
                AsyncStorage.setItem('userId', LoginInfo.id)
            });
            setisLoading(false) //로딩 끝
            navigation.navigate("AuthChecker")
        } else {
            //오류처리
            alert(data.msg);
            navigation.navigate("AuthChecker")
        }
    }

    return (
        <>
            <ScrollView style={styles.statusHeight}>
                {isLoading
                    ? <ImageBackground style={styles.loading}
                        source={require('../../assets/images/gif_intro.gif')}>
                        <View style={styles.loadContainer}>
                            <Text style={styles.loadText}>로딩중</Text>
                            <ActivityIndicator color="#FFF8DC" size="large" />
                        </View>
                    </ImageBackground>
                    : <>
                        <View style={[styles.logoSection, { height: 350 - keyboardH }]}>
                            <Image style={styles.logo}
                                source={require('../../assets/images/gif_intro.gif')} />
                        </View>
                        <View style={styles.container}>
                            {/* <View style={styles.welcomeSection}>
                                <Text style={styles.welcomeText}>screens 안녕하세요</Text>
                                <Text style={styles.welcomeText}>screens 안녕하세요</Text>
                                <Text style={styles.welcomeText}>screens 안녕하세요</Text>
                                <Text style={styles.welcomeText}>screens 안녕하세요</Text>
                                <Text style={styles.welcomeText}>screens 안녕하세요</Text>
                            </View> */}
                            <View style={styles.inputSection}>
                                <View style={styles.iconWrap}>
                                    <Ionicons name="md-person" size={30} color="black" />
                                </View>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="ID"
                                    value={LoginInfo.id}
                                    placeholderTextColor="gray"
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => _1stRef.focus()}
                                    onChangeText={(text) => { _userInputs(text, "id") }}
                                // onEndEditing={() => { _dbChecker("P", "name") }}
                                />
                            </View>
                            <WarningText wordFor="id" />

                            <View style={styles.inputSection}>
                                <View style={styles.iconWrap}>
                                    <Ionicons name="md-key" size={30} color="black" />
                                </View>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Password"
                                    value={LoginInfo.password}
                                    placeholderTextColor="gray"
                                    secureTextEntry
                                    ref={ref => _1stRef = ref}
                                    onChangeText={(text) => { _userInputs(text, "password") }}
                                // onSubmitEditing={() => step1_2stRef.focus()}
                                // onEndEditing={() => { _dbChecker("P", "name") }}
                                />
                            </View>
                            <WarningText wordFor="password" />
                            <View style={styles.submitContainer}>
                                <TouchableOpacity style={styles.submitButton} onPress={() => { navigation.navigate("Join") }}>
                                    <Text style={styles.submitText}>회원가입</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.submitButton} onPress={_login}>
                                    <Text style={styles.submitText}>로그인</Text>
                                </TouchableOpacity>
                            </View>

                            {/* <Button
                                title="loading test"
                                onPress={_Loading}
                            /> */}
                        </View>
                    </>
                }

            </ScrollView>

            <View style={styles.footerContainer}>
                <Text style={styles.copyrightText}>ⓒ 2019. STAMP .All right reserved.</Text>
            </View>
        </>
    )
};
Join.navigationOptions = {
    header: null,
};