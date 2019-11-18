import React, { useState, useEffect, Fragment } from 'react';
import {
    Button,
    Image,
    Keyboard,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from './Join_Style';
import { Ionicons } from '@expo/vector-icons';

export default Join = (props) => {
    // const { navigation } = props;
    const DBdata = [
        { name: "kim", email: "kim@email.com", phone_num: "01012340001" },
        { name: "lee", email: "lee@email.com", phone_num: "01012340002" },
        { name: "park", email: "park@email.com", phone_num: "01012340003" },
    ];
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
    //////////

    /**
    * ============================================================================================================================
    *          UserInput Infomation
    * ============================================================================================================================ 
    */
    // const [UserInfo, setUserInfo] = useState({
    //     id: `Test${Math.floor(Math.random() * 100)}`,
    //     password: `${Math.floor(Math.random() * 1000)}qwer`,
    //     passwordCon: "",
    // });
    const name = _userInputs("");
    const email = _userInputs("");
    const phone_num = _userInputs("");

    function _userInputs(defaultValue) { // 입력값 갱신용
        const [value, setvalue] = useState(defaultValue);
        function __chageValue(text) { setvalue(text); };
        function __validateInput(){};
        return { value, onChangeText: __chageValue }
    }

    const _중복확인 = async (obj, key) => { // personal_DB api
        const isUsable = (await DBdata.find(data => data[key] === obj.value) == null);
        console.log(key,"는 사용가능한가요?", isUsable);
    }
    useEffect(() => { _중복확인(email, "email") }, [email.value]);
    useEffect(() => { _중복확인(phone_num, "phone_num") }, [phone_num.value]);

    //////////

    /**
     * ============================================================================================================================
     *          Join Step Component
     * ============================================================================================================================ 
     */
    const StepNum = 4;
    const [JoinSteps, setJoinSteps] = useState(1);
    const StepsBar = ({ stepNum, step }) => { // component
        let voidArray = new Array(stepNum).fill(1);
        return (<>
            {voidArray.map((el, ix) => (
                <Fragment key={ix + 1}>
                    <View style={(ix + 1) === step ? styles.setpsSelected : styles.setps}>
                        <Text style={(ix + 1) === step ? styles.setpsSelectedText : styles.setpsText}>{(ix + 1)}</Text>
                    </View>
                    {(ix + 1) !== stepNum && <View style={styles.stepDash}></View>}
                </Fragment>
            ))}
        </>)
    }
    const _changeStep = (direct) => {
        if (JoinSteps === 1) {
            if (direct === "prev") alert("첫페이지 입니다.");
            if (direct === "next") setJoinSteps(JoinSteps + 1);
        } else {
            if (direct === "next") setJoinSteps(JoinSteps + 1);
            if (direct === "prev") setJoinSteps(JoinSteps - 1);
        };
    }
    //////////
    return (
        <>
            <ScrollView >
                <View style={[styles.logoSection, { height: 250 - keyboardH }]}>
                    <Image style={[styles.logo, { width: 250 - keyboardH }]}
                        source={require('../../assets/images/robot-dev.png')} />
                </View>
                <View style={styles.stepsBar}>
                    <StepsBar stepNum={StepNum} step={JoinSteps} />
                </View>
                {
                    JoinSteps === 1
                        ? <View style={styles.container}>
                            <Text style={styles.field}>개인정보</Text>
                            <View style={styles.inputSection}>
                                <View style={styles.iconWrap}>
                                    <Ionicons name="md-person" size={30} color="black" />
                                </View>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Name"
                                    placeholderTextColor="gray"
                                    require
                                    // returnKeyLabel="다음"
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => _2stRef.focus()}
                                    {...name}
                                />
                            </View>
                            <View style={styles.inputSection}>
                                <View style={styles.iconWrap}>
                                    <Ionicons name="md-mail" size={30} color="black" />
                                </View>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="email"
                                    placeholderTextColor="gray"
                                    require
                                    ref={ref => _2stRef = ref}
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => _3stRef.focus()}
                                    {...email}
                                />
                            </View>
                            <View style={styles.inputSection}>
                                <View style={styles.iconWrap}>
                                    <Ionicons name="md-phone-portrait" size={30} color="black" />
                                </View>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Phone Number"
                                    placeholderTextColor="gray"
                                    require
                                    ref={ref => _3stRef = ref}
                                    {...phone_num}
                                />
                            </View>
                            <TouchableOpacity activeOpacity={.5} style={styles.inputButton}>
                                <Text>중복확인</Text>
                            </TouchableOpacity>
                        </View>

                        : <View style={styles.container}>
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
                                    value={UserInfo.id}
                                />
                            </View>
                            <TouchableOpacity activeOpacity={.5} style={styles.inputButton}>
                                <Text>중복확인</Text>
                            </TouchableOpacity>
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
                                />
                            </View>
                        </View>
                }
                <View style={styles.stepConSection}>
                    {
                        JoinSteps === 1
                            ? <>
                                <View style={styles.setpConButton} />
                                <TouchableOpacity activeOpacity={.5} style={styles.setpConButton}
                                    onPress={() => { _changeStep("next") }}>
                                    <Text style={styles.setpConText}>다음</Text>
                                    <Ionicons name="md-arrow-forward" size={30} color="black" />
                                </TouchableOpacity>
                            </>
                            : JoinSteps === StepNum
                                ? <TouchableOpacity activeOpacity={.5} style={styles.setpConButton}
                                    onPress={() => { _changeStep("prev") }}>
                                    <Ionicons name="md-arrow-back" size={30} color="black" />
                                    <Text style={styles.setpConText}>이전</Text>
                                </TouchableOpacity>

                                : <>
                                    <TouchableOpacity activeOpacity={.5} style={styles.setpConButton}
                                        onPress={() => { _changeStep("prev") }}>
                                        <Ionicons name="md-arrow-back" size={30} color="black" />
                                        <Text style={styles.setpConText}>이전</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={.5} style={styles.setpConButton}
                                        onPress={() => { _changeStep("next") }}>
                                        <Text style={styles.setpConText}>다음</Text>
                                        <Ionicons name="md-arrow-forward" size={30} color="black" />
                                    </TouchableOpacity>
                                </>
                    }
                </View>

                {
                    JoinSteps === StepNum &&
                    <View style={styles.submitContainer}>
                        <TouchableOpacity style={styles.submitButton}>
                            <Text style={styles.submitText}>가입하기</Text>
                        </TouchableOpacity>
                    </View>
                }
            </ScrollView>

            <View style={styles.footerContainer}>
                <Text style={styles.copyrightText}>ⓒ 2019. STAMP .All right reserved.</Text>
            </View>
        </>
    )
};
Join.navigationOptions = {
    // header: null,
    title: "회원가입",
};