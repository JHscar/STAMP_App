import React, { useState, useEffect, Fragment } from 'react';
import {
    Alert,
    ActivityIndicator,
    Button,
    Image,
    ImageBackground,
    Keyboard,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import axios from 'axios';
import { styles } from './Join_Style';
import { Ionicons } from '@expo/vector-icons';
import baseURL from '../../config';

export default Join = (props) => {
    const { navigation } = props;

    /**
    * ============================================================================================================================
    *          loding state
    * ============================================================================================================================ 
    */
    const [isLoading, setisLoading] = useState(false);
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
    //////////

    /**
    * ============================================================================================================================
    *          UserInput Infomation
    * ============================================================================================================================ 
    */
    const [PersonalInfo, setPersonalInfo] = useState({ name: "", email: "", phone_num: "" });
    const [UserInfo, setUserInfo] = useState({ id: "", password: "", passwordCheck: "" });
    const [AuthNo, setAuthNo] = useState("");

    const _userInputs = (text, type, key) => { // 입력값 갱신용  
        //text는 입력값, type은 PersonalInfo ="P" UserInfo ="U",key는 바꿀 대상 Auth ="A"
        type == "P" && setPersonalInfo({ ...PersonalInfo, [key]: text });
        type == "U" && setUserInfo({ ...UserInfo, [key]: text });
        type == "A" && setAuthNo(text);
    };

    const [Warning, setWarning] = useState({  // 입력값 검증 결과 _w는 word, _c는 color
        name_w: "한글 [ 이름 ] 을 입력 하세요.",
        name_c: null,
        email_w: "[ 이메일 아이디 ] @ [ 도메인 ]",
        email_c: null,
        phone_num_w: "[ - ] 없이 숫자만 입력하세요.",
        phone_num_c: null,
        id_w: "[ 아이디 ] 를 입력하세요. ( 3 자이상 / 특수문자 _ 만 가능 )",
        id_c: null,
        password_w: "[ 비밀번호 ] 를 입력하세요. ( 8~15 자 / 특수문자 + 숫자 + 대소문자 )",
        password_c: null,
        passwordCheck_w: "같은 [ 비밀번호 ] 를 한번 더 입력하세요.",
        passwordCheck_c: null,
        auth_w: "이메일로 받은 인증번호 4자리를 입력하세요.",
        auth_c: null,

    });

    const _validate = (type, key) => { // 입력값 검증 함수
        const { name, email, phone_num } = PersonalInfo;  // 비구조화
        const { id, password, passwordCheck } = UserInfo;

        if (type === "P" && key === "name") {
            // const nameRule = /[-`~!@#$%^&*|\\\'\";:\/?,.\sㄱ-ㅎa-zA-Z]/gi; // 특수문자+공백+한글초성+영문
            const nameRule = /^([가-힣]){1,}$/; // 한글만
            nameRule.test(name)
                ? setWarning({ ...Warning, [key + "_w"]: "올바른 형식입니다.", [key + "_c"]: "blue" })
                : name.length > 0 && setWarning({ ...Warning, [key + "_w"]: "올바르지 않은 형식입니다. ( 한글 이름을 입력하세요. )", [key + "_c"]: "red" });
        }
        if (type === "P" && key === "email") {
            const emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
            emailRule.test(email)
                ? setWarning({ ...Warning, [key + "_w"]: "올바른 형식입니다.", [key + "_c"]: "blue" })
                : email.length > 0 && setWarning({ ...Warning, [key + "_w"]: "올바르지 않은 형식입니다. ( 이메일 양식을 확인하세요. )", [key + "_c"]: "red" })
        }
        if (type === "P" && key === "phone_num") {
            const phoneRule = /^01([0|1|6|7|8|9]?)([0-9]{3,4})([0-9]{4})$/;
            phoneRule.test(phone_num)
                ? setWarning({ ...Warning, [key + "_w"]: "올바른 형식입니다.", [key + "_c"]: "blue" })
                : phone_num.length > 0 && setWarning({ ...Warning, [key + "_w"]: "올바르지 않은 형식입니다. ( 휴대폰 번호 양식을 확인하세요. )", [key + "_c"]: "red" })
        }
        if (type === "U" && key === "id") {
            const idRule = /([_]?[0-9a-zA-Z가-힣]){3,}/; // _가능, 3자 이상
            idRule.test(id)
                ? setWarning({ ...Warning, [key + "_w"]: "올바른 형식입니다.", [key + "_c"]: "blue" })
                : id.length > 0 && setWarning({ ...Warning, [key + "_w"]: "올바르지 않은 형식입니다. ( 3자 이상, _ 허용 4자 이상 )", [key + "_c"]: "red" });
        }
        if (type === "U" && key === "password") {
            const passwordRule = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&+=]).*$/; // 특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내의 암호
            passwordRule.test(password)
                ? setWarning({ ...Warning, [key + "_w"]: "올바른 형식입니다.", [key + "_c"]: "blue" })
                : password.length > 0 && setWarning({ ...Warning, [key + "_w"]: "올바르지 않은 형식입니다.  ( 8~15 자 / 특수문자 + 숫자 + 대소문자 )", [key + "_c"]: "red" });
        }
        if (type === "U" && key === "passwordCheck") {
            passwordCheck === password
                ? passwordCheck.length > 0 && setWarning({ ...Warning, [key + "_w"]: "일치합니다.", [key + "_c"]: "blue" })
                : passwordCheck.length > 0 && setWarning({ ...Warning, [key + "_w"]: "입력하신 비밀번호와 일치하지 않습니다.", [key + "_c"]: "red" });

        }

        if (type === "A") {
            const authRule = /^([0-9]{4})$/;
            authRule.test(AuthNo)
                ? setWarning({ ...Warning, ["auth_w"]: "올바른 형식입니다.", ["auth_c"]: "blue" })
                : AuthNo.length > 0 && setWarning({ ...Warning, ["auth_w"]: "숫자 4자리를 입력하세요.", ["auth_c"]: "red" })
        }

    };
    useEffect(() => { _validate("P", "name"); _dbChecker("C", "name") }, [PersonalInfo.name]);
    useEffect(() => { _validate("P", "email"); _dbChecker("C", "email") }, [PersonalInfo.email]);
    useEffect(() => { _validate("P", "phone_num"); _dbChecker("C", "phone_num") }, [PersonalInfo.phone_num]);

    useEffect(() => { _validate("U", "id"); _dbChecker("C", "id") }, [UserInfo.id]);
    useEffect(() => { _validate("U", "password"); _dbChecker("C", "password") }, [UserInfo.password]);
    useEffect(() => { _validate("U", "passwordCheck"); _dbChecker("C", "passwordCheck") }, [UserInfo.passwordCheck]);

    useEffect(() => { _validate("A", ""); _dbChecker("A", "clear") }, [AuthNo]);
    // *** Warning Component ***
    const WarningText = ({ wordFor }) => {
        return (
            <Text style={[styles.inputWarning, Warning[wordFor + "_c"] && { color: Warning[wordFor + "_c"] }]} >
                {Warning[wordFor + "_w"]}
            </Text>
        )
    }
    // *** DB check ***
    // const baseURL = "https://stamp-test-server.herokuapp.com";

    // 중복확인 API 함수
    const _checkDuplicateInDB = async (type, key) => {  //  user:id / personal:email,phone_num
        if (type === "P") {
            const { data: Checker } = await axios.get(`${baseURL}/auth/${key}/?${key}=${PersonalInfo[key]}`);
            return (Checker.result);
        }
        if (type === "U") {
            const { data: Checker } = await axios.get(`${baseURL}/auth/${key}/?${key}=${UserInfo[key]}`);
            return (Checker.result);
        }
    };

    const [DBcheck, setDBcheck] = useState({ name: false, email: false, phone_num: false, id: false, password: false, passwordCheck: false, auth: false });
    const _dbChecker = async (type, key) => {  // type:C = clear
        // console.log(Warning[key + "_c"]); // 디버그용
        if (Warning[key + "_c"] == "blue") { // 입력값 검증 통과 한 것만 
            if (type === "P") {
                if (key === "name") { // name은 특수 처리...
                    [setDBcheck({ ...DBcheck, [key]: true }), setWarning({ ...Warning, [key + "_w"]: "사용가능" })];
                    return;
                }

                setDBcheck({ ...DBcheck, [key]: "loading" });
                // API 호출 (중복확인)
                const result = await _checkDuplicateInDB(type, key);
                // console.log("중복확인", result); // 디버그용
                (result)
                    ? [setDBcheck({ ...DBcheck, [key]: true }), setWarning({ ...Warning, [key + "_w"]: "사용가능" })]
                    : [setWarning({ ...Warning, [key + "_w"]: "이미 사용중 입니다.", [key + "_c"]: "red" })]
            }
            if (type === "U") {
                if (key === "password") { // password는 특수 처리...
                    [setDBcheck({ ...DBcheck, [key]: true }), setWarning({ ...Warning, [key + "_w"]: "사용가능" })];
                    return;
                }
                if (key === "passwordCheck") { // passwordCheck도 특수 처리
                    setDBcheck({ ...DBcheck, [key]: "loading" });
                    setTimeout(() => {
                        [setDBcheck({ ...DBcheck, [key]: true }), setWarning({ ...Warning, [key + "_w"]: "사용가능" })]
                    }, 1000);
                    return;
                }
                setDBcheck({ ...DBcheck, [key]: "loading" });
                // API 호출 (중복확인)
                const result = await _checkDuplicateInDB(type, key);
                (result)
                    ? [setDBcheck({ ...DBcheck, [key]: true }), setWarning({ ...Warning, [key + "_w"]: "사용가능" })]
                    : [setWarning({ ...Warning, [key + "_w"]: "이미 사용중 입니다.", [key + "_c"]: "red" })]
            }
        }
        if (type === "C" && DBcheck[key] === true) { setDBcheck({ ...DBcheck, [key]: false }); }

        // Auth DB check API
        if (type === "A") {
            if (key === "clear" && DBcheck.auth === true) { setDBcheck({ ...DBcheck, ["auth"]: false }); }
            if (key === "input") {
                setDBcheck({ ...DBcheck, ["auth"]: "loading" });
                // API 호출
                const result = await _emailAuthAPI();
                (result)
                    ? [setDBcheck({ ...DBcheck, ["auth"]: true }), setWarning({ ...Warning, ["auth_w"]: "인증되었습니다." })]
                    : [setWarning({ ...Warning, ["auth_w"]: "인증번호가 틀렸습니다.", ["auth_c"]: "red" })]
            }
        }
    }
    //////////

    /**
     * ============================================================================================================================
     *          Join Step Component
     * ============================================================================================================================ 
     */
    const StepNum = 3;
    const stepTag = ["개인정보", "계정정보", "인증하기"];
    const [StepProgress, setStepProgress] = useState({ 1: "inProgress", 2: "inProgress" });
    useEffect(() => {
        // console.log(DBcheck);  // 디버그용
        // console.log(StepProgress); // 디버그용
        if (JoinSteps === 1) {
            (DBcheck.name === true && DBcheck.email === true && DBcheck.phone_num === true)
                ? setStepProgress({ ...StepProgress, [JoinSteps]: "done" })
                : StepProgress[JoinSteps] === "done" && setStepProgress({ ...StepProgress, [JoinSteps]: "inProgress" });
        }
        if (JoinSteps === 2) {
            (DBcheck.id === true && DBcheck.password === true && DBcheck.passwordCheck === true)
                ? setStepProgress({ ...StepProgress, [JoinSteps]: "done" })
                : StepProgress[JoinSteps] === "done" && setStepProgress({ ...StepProgress, [JoinSteps]: "inProgress" });
        }
        if (JoinSteps === 3) {
            (DBcheck.auth === true)
                ? setStepProgress({ ...StepProgress, [JoinSteps]: "done" })
                : StepProgress[JoinSteps] === "done" && setStepProgress({ ...StepProgress, [JoinSteps]: "inProgress" });
        }
    }, [DBcheck])
    const [JoinSteps, setJoinSteps] = useState(1);
    const StepsBar = ({ stepNum, step }) => { // component
        let voidArray = new Array(stepNum).fill(1);
        return (<>
            {voidArray.map((el, ix) => (
                <Fragment key={ix + 1}>
                    <View style={styles.stepWrap}>
                        <View style={(ix + 1) === step ? styles.stepsSelected : styles.steps}>
                            <Text style={(ix + 1) === step ? styles.stepsSelectedText : styles.stepsText}>{(ix + 1)}</Text>
                        </View>
                        <Text style={styles.stepTag}>{stepTag[ix]}</Text>
                    </View>
                    {(ix + 1) !== stepNum && <View style={styles.stepDash}></View>}
                </Fragment>
            ))}
        </>)
    }
    const _changeStep = (direct) => {  //  디버그용
        if (JoinSteps === 1) {
            if (direct === "prev") alert("첫페이지 입니다.");
            if (direct === "next") setJoinSteps(JoinSteps + 1);
        } else {
            if (direct === "next") setJoinSteps(JoinSteps + 1);
            if (direct === "prev") setJoinSteps(JoinSteps - 1);
        };
    }
    //////////
    /**
     * ============================================================================================================================
     *          Join & Auth API
     * ============================================================================================================================ 
     */
    const _joinAPI = async () => {
        setisLoading(true); // 로딩시작
        const { name, email, phone_num } = PersonalInfo;  // 비구조화
        const { id, password } = UserInfo;

        const { data } = await axios.post(
            `${baseURL}/auth/join`,
            { name, email, phone_num, id, password }
        );
        if (data.result === true) {
            await _emailAuthReq(); // 인증메일 발송요청
            setisLoading(false); // 로딩 끝
            _changeStep("next");
        } else {
            alert("잘못된 접근입니다.");
            navigation.navigate("Join")
        }
        console.log(data);
    };

    const exTime = 50000; // 미리세컨드
    const [MailExpire, setMailExpire] = useState(exTime); // 인증 유효 시간
    const [MailReqBtn, setMailReqBtn] = useState(true); // 메일요청 버튼 활성화
    const [ExClock, setExClock] = useState("");
    const [myInterval, setmyInterval] = useState(null);

    useEffect(() => {
        const min = (Math.floor(MailExpire / 60000)).toString();
        const sec = (((MailExpire % 60000) / 1000).toFixed(0)).toString();
        const leftTime = min + ":" + (sec < 10 ? "0" : "") + sec;
        setExClock(leftTime);
    }, [MailExpire])

    const _emailAuthReq = async () => {
        const { email } = PersonalInfo;  // 비구조화

        setMailReqBtn(false); // 버튼 비활성화
        setExClock("인증번호 전송중......");

        const { data } = await axios.post( // 메일 발송 요청 API
            `${baseURL}/auth/emailAuth`,
            { email }
        );
        if (data.result === true) {

            const expireCnt = setInterval(() => { // 발송된 후 인증시간 카운트
                console.log("-1초")
                setMailExpire(MailExpire => MailExpire - 1000);
            }, 1000)
            setmyInterval(expireCnt);

            setTimeout(() => {   // 인증시간 만료되면 interval 삭제, 버튼 확성화, 인증시간 초기화
                clearInterval(expireCnt);
                setMailReqBtn(true);
                setMailExpire(exTime);
                console.log("인증 만료!")
            }, exTime);

        } else {
            alert("잘못된 접근 입니다.");
            navigation.navigate(Join);
        }
        console.log(data);
    }

    const _emailAuthAPI = async () => {
        const { email } = PersonalInfo;  // 비구조화

        const { data } = await axios.post(
            `${baseURL}/auth/emailAuth/emailCheck`,
            {
                email,
                inputAuthNo: AuthNo
            }
        );
        if (data.result === true) { // 인터벌 삭제..
            clearInterval(myInterval);
            setExClock("잠시 후 요청 버튼이 재활성화 됩니다.");
            setTimeout(() => { // 재요청 기능 활성화..
                setMailReqBtn(true);
                setMailExpire(exTime);
            }, 3000);
        }
        return (data.result);
    }

    return (
        <>
            {isLoading
                ? <ImageBackground style={styles.loading}
                    source={require('../../assets/images/gif_intro.gif')}>
                    <View style={styles.loadContainer}>
                        <Text style={styles.loadText}>로딩중</Text>
                        <ActivityIndicator color="#FFF8DC" size="large" />
                    </View>
                </ImageBackground>
                : <>
                    <ScrollView >
                        <View style={[styles.logoSection, { height: 250 - keyboardH }]}>
                            <Image style={styles.logo}
                                source={require('../../assets/images/gif_intro.gif')} />
                        </View>
                        <View style={styles.stepsBar}>
                            <StepsBar stepNum={StepNum} step={JoinSteps} />
                        </View>
                        {JoinSteps === 1
                            && <View style={styles.container}>
                                <View style={styles.inputSection}>
                                    <View style={styles.iconWrap}>
                                        <Ionicons name="md-person" size={30} color="black" />
                                    </View>
                                    <TextInput
                                        style={styles.inputText}
                                        placeholder="Name"
                                        placeholderTextColor="gray"
                                        require={true}
                                        // returnKeyLabel="다음"
                                        returnKeyType="next"
                                        blurOnSubmit={false}
                                        onSubmitEditing={() => step1_2stRef.focus()}
                                        value={PersonalInfo.name}
                                        onChangeText={(text) => { _userInputs(text, "P", "name") }}
                                        onEndEditing={() => { _dbChecker("P", "name") }}
                                    />
                                </View>
                                <WarningText wordFor="name" />

                                <View style={styles.inputSection}>
                                    <View style={styles.iconWrap}>
                                        <Ionicons name="md-mail" size={30} color="black" />
                                    </View>
                                    <TextInput
                                        style={styles.inputText}
                                        placeholder="Email"
                                        placeholderTextColor="gray"
                                        require
                                        ref={ref => step1_2stRef = ref}
                                        returnKeyType="next"
                                        blurOnSubmit={false}
                                        onSubmitEditing={() => step1_3stRef.focus()}
                                        value={PersonalInfo.email}
                                        onChangeText={(text) => { _userInputs(text, "P", "email") }}
                                        onEndEditing={() => { _dbChecker("P", "email") }}
                                    />
                                    <View style={styles.iconWrap}>
                                        {DBcheck.email
                                            ? DBcheck.email === "loading"
                                                ? <ActivityIndicator />
                                                : <Ionicons name="md-checkbox-outline" size={30} color="#347C2C"/*jungleGreen*/ />
                                            : <Ionicons name="md-square-outline" size={30} color="gray" />
                                        }
                                    </View>
                                </View>
                                <WarningText wordFor="email" />

                                <View style={styles.inputSection}>
                                    <View style={styles.iconWrap}>
                                        <Ionicons name="md-phone-portrait" size={30} color="black" />
                                    </View>
                                    <TextInput
                                        style={styles.inputText}
                                        placeholder="Phone Number"
                                        placeholderTextColor="gray"
                                        require
                                        ref={ref => step1_3stRef = ref}
                                        keyboardType="phone-pad"
                                        value={PersonalInfo.phone_num}
                                        onChangeText={(text) => { _userInputs(text, "P", "phone_num") }}
                                        onEndEditing={() => { _dbChecker("P", "phone_num") }}
                                    />
                                    <View style={styles.iconWrap}>
                                        {DBcheck.phone_num
                                            ? DBcheck.phone_num === "loading"
                                                ? <ActivityIndicator />
                                                : <Ionicons name="md-checkbox-outline" size={30} color="#347C2C"/*jungleGreen*/ />
                                            : <Ionicons name="md-square-outline" size={30} color="gray" />
                                        }
                                    </View>
                                </View>
                                <WarningText wordFor="phone_num" />
                            </View>
                        }
                        {JoinSteps === 2
                            && <View style={styles.container}>
                                <View style={styles.inputSection}>
                                    <View style={styles.iconWrap}>
                                        <Ionicons name="md-person" size={30} color="black" />
                                    </View>
                                    <TextInput
                                        style={styles.inputText}
                                        placeholder="User ID ( Nick Name )"
                                        placeholderTextColor="gray"
                                        returnKeyType="next"
                                        blurOnSubmit={false}
                                        onSubmitEditing={() => step2_2stRef.focus()}
                                        value={UserInfo.id}
                                        onChangeText={(text) => { _userInputs(text, "U", "id") }}
                                        onEndEditing={() => { _dbChecker("U", "id") }}
                                    />
                                    <View style={styles.iconWrap}>
                                        {DBcheck.id
                                            ? DBcheck.id === "loading"
                                                ? <ActivityIndicator />
                                                : <Ionicons name="md-checkbox-outline" size={30} color="#347C2C"/*jungleGreen*/ />
                                            : <Ionicons name="md-square-outline" size={30} color="gray" />
                                        }
                                    </View>
                                </View>
                                <WarningText wordFor="id" />

                                <View style={styles.inputSection}>
                                    <View style={styles.iconWrap}>
                                        <Ionicons name="md-key" size={30} color="black" />
                                    </View>
                                    <TextInput
                                        style={styles.inputText}
                                        placeholder="Password"
                                        placeholderTextColor="gray"
                                        secureTextEntry
                                        ref={ref => step2_2stRef = ref}
                                        returnKeyType="next"
                                        blurOnSubmit={false}
                                        onSubmitEditing={() => step2_3stRef.focus()}
                                        value={UserInfo.password}
                                        onChangeText={(text) => { _userInputs(text, "U", "password") }}
                                        onEndEditing={() => { _dbChecker("U", "password") }}
                                    />
                                </View>
                                <WarningText wordFor="password" />

                                <View style={styles.inputSection}>
                                    <View style={styles.iconWrap}>
                                        <Ionicons name="md-key" size={30} color="black" />
                                    </View>
                                    <TextInput
                                        style={styles.inputText}
                                        placeholder="Confirm Password"
                                        placeholderTextColor="gray"
                                        secureTextEntry
                                        ref={ref => step2_3stRef = ref}
                                        value={UserInfo.passwordCheck}
                                        onChangeText={(text) => { _userInputs(text, "U", "passwordCheck") }}
                                        onEndEditing={() => { _dbChecker("U", "passwordCheck") }}
                                    />
                                    <View style={styles.iconWrap}>
                                        {DBcheck.passwordCheck
                                            ? DBcheck.passwordCheck === "loading"
                                                ? <ActivityIndicator />
                                                : <Ionicons name="md-lock" size={30} color="#347C2C"/*jungleGreen*/ />
                                            : <Ionicons name="md-unlock" size={30} color="gray" />
                                        }
                                    </View>
                                </View>
                                <WarningText wordFor="passwordCheck" />
                            </View>
                        }
                        {JoinSteps === 3
                            && <View style={styles.container}>
                                <View style={styles.authSection}>
                                    <Text style={[styles.authText]}>{PersonalInfo.name} 님,</Text>
                                    <Text style={[styles.authText]}>
                                        <Text style={[styles.authText, { color: "#E55B3C" }]}>STAMP</Text>가입을 환영합니다.
                            </Text>
                                    <Text style={[styles.authText, { color: "blue" }]}>{PersonalInfo.email}</Text>
                                    <Text style={[styles.authText]}>로 전송된 <Text style={[styles.authText, { color: "red" }]}>인증번호</Text>를 입력하세요.</Text>
                                </View>
                                {MailReqBtn
                                    ? <Button title="메일 다시 요청" onPress={_emailAuthReq} />
                                    : <Text style={{ color: "red" }}>{ExClock}</Text>
                                }
                                <View style={styles.inputSection}>
                                    <View style={styles.iconWrap}>
                                        <Ionicons name="md-mail" size={30} color="black" />
                                    </View>
                                    <TextInput
                                        style={styles.inputText}
                                        placeholder="인증번호 (4자리)"
                                        placeholderTextColor="gray"
                                        // returnKeyType="next"
                                        // blurOnSubmit={false}
                                        // onSubmitEditing={() => step2_2stRef.focus()}
                                        value={AuthNo}
                                        onChangeText={(text) => { _userInputs(text, "A", "") }}
                                        onEndEditing={() => { _dbChecker("A", "input") }}
                                    />
                                    <View style={styles.iconWrap}>
                                        {DBcheck.auth
                                            ? DBcheck.auth === "loading"
                                                ? <ActivityIndicator />
                                                : <Ionicons name="md-checkbox-outline" size={30} color="#347C2C"/*jungleGreen*/ />
                                            : <Ionicons name="md-square-outline" size={30} color="gray" />
                                        }
                                    </View>
                                </View>
                                <WarningText wordFor="auth" />
                            </View>
                        }
                        {JoinSteps === 1
                            && <View style={styles.submitContainer}>
                                {StepProgress[JoinSteps] == "done"
                                    ? (<TouchableOpacity style={styles.submitButton} onPress={() => { _changeStep("next") }}>
                                        <Text style={styles.submitText}>다음단계로</Text>
                                    </TouchableOpacity>)
                                    : <ActivityIndicator color="white" />
                                }
                            </View>
                        }
                        {JoinSteps === 2
                            && <View style={styles.submitContainer}>
                                {StepProgress[JoinSteps] == "done"
                                    ? (<TouchableOpacity style={styles.submitButton} onPress={_joinAPI}>
                                        <Text style={styles.submitText}>회원가입</Text>
                                    </TouchableOpacity>)
                                    : <ActivityIndicator color="white" />
                                }
                            </View>
                        }
                        {JoinSteps === 3
                            && <View style={styles.submitContainer}>
                                {StepProgress[JoinSteps] == "done"
                                    ? (<TouchableOpacity style={styles.submitButton} onPress={() => { navigation.navigate("Login") }}>
                                        <Text style={styles.submitText}>로그인 하러가기</Text>
                                    </TouchableOpacity>)
                                    : <ActivityIndicator color="white" />
                                }
                            </View>
                        }

                    </ScrollView>
                    {/* 디버그용 페이지 이동 버튼 */}
                    <View style={styles.stepConSection}>
                        {JoinSteps === 1
                            ? <>
                                <View style={styles.setpConButton} >{/** 공백용 */}</View>
                                <TouchableOpacity activeOpacity={.5} style={styles.setpConButton}
                                    onPress={() => { _changeStep("next") }}>
                                    <Text style={styles.setpConText}>다음</Text>
                                    <Ionicons name="md-arrow-forward" size={30} color="white" />
                                </TouchableOpacity>
                            </>
                            : JoinSteps === StepNum
                                ? <TouchableOpacity activeOpacity={.5} style={styles.setpConButton}
                                    onPress={() => { _changeStep("prev") }}>
                                    <Ionicons name="md-arrow-back" size={30} color="white" />
                                    <Text style={styles.setpConText}>이전</Text>
                                </TouchableOpacity>

                                : <>
                                    <TouchableOpacity activeOpacity={.5} style={styles.setpConButton}
                                        onPress={() => { _changeStep("prev") }}>
                                        <Ionicons name="md-arrow-back" size={30} color="white" />
                                        <Text style={styles.setpConText}>이전</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={.5} style={styles.setpConButton}
                                        onPress={() => { _changeStep("next") }}>
                                        <Text style={styles.setpConText}>다음</Text>
                                        <Ionicons name="md-arrow-forward" size={30} color="white" />
                                    </TouchableOpacity>
                                </>
                        }
                    </View>

                    <View style={styles.footerContainer}>
                        <Text style={styles.copyrightText}>ⓒ 2019. STAMP .All right reserved.</Text>
                    </View>
                </>
            }
        </>

    )
};
Join.navigationOptions = {
    // header: null,
    title: "회원가입",
};