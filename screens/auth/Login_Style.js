import { StyleSheet, Dimensions, StatusBar } from 'react-native';
// import { Header } from 'react-navigation';
const { width, height } = Dimensions.get("window");
const statusBarH = StatusBar.currentHeight;


export const styles = StyleSheet.create({
    /**
     * ==============================================================
     * 상태바 높이 & 로딩
     */
    statusHeight: {
        marginTop: statusBarH,
    },
    loading: {
        // flex: 1,
        // position: "absolute",
        // alignSelf: "center",
        width,
        height: height,
        backgroundColor: "rgba(220,220,220,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    /**
     * ==============================================================
     * 로고영역
     */
    logoSection: {
        justifyContent: "center",
        alignItems: "center",
        width,
        height: 250,
        backgroundColor: "red",
    },
    logo: {
        height: "100%",
        resizeMode: "cover"
    },
    /**
     * ==============================================================
     * 환영문구
     */
    welcomeSection: {
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        width: "70%",
        height: width * 0.7 * 0.5,
        borderRadius: width * 0.7 * 0.5 * 0.1,
        backgroundColor: "#FFF8DC", // Cornsilk
    },
    welcomeText: {
        marginVertical: 3,
        fontFamily: "jua",
    },
    /**
     * ==============================================================
     * 메인영역
     */
    container: {
        flexDirection: "column",
        justifyContent: "center", // 상하
        alignItems: "center", // 좌우
        width,
    },








    stepsBar: {
        alignSelf: "center",
        marginTop: 10,
        flexDirection: "row",
        width: "70%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    stepWrap: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    stepTag: {
        // alignSelf: "flex-start",
        marginTop: 3,
        // marginLeft: 30,
        padding: 5,
        fontFamily: "jua",
        fontSize: 12,
        backgroundColor: "#B6B6B4", //Gray Cloud
        borderRadius: 5,
    },
    steps: {
        justifyContent: "center",
        alignItems: "center",
        width: width * 0.08,
        height: width * 0.08,
        borderRadius: width * 0.04,
        borderColor: "gray",
        borderWidth: 2,
    },
    stepsText: {
        fontFamily: "jua",
        color: "black"
    },
    stepsSelected: {
        justifyContent: "center",
        alignItems: "center",
        width: width * 0.08,
        height: width * 0.08,
        borderRadius: width * 0.04,
        backgroundColor: "gray"
    },
    stepsSelectedText: {
        fontFamily: "jua",
        color: "white"
    },
    stepDash: {
        width: width * 0.08,
        height: width * 0.08 * 0.1,
        borderRadius: 3,
        backgroundColor: "#D1D0CE", // Gray Goose
    },
    /**
     * ==============================================================
     */

    inputSection: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
        width: "70%",
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC",
    },
    iconWrap: {
        justifyContent: "center",
        alignItems: "center",
        width: 35,
        // backgroundColor: "blue",
        marginHorizontal: 5,
    },
    inputText: {
        flex: 1,
        backgroundColor: "#F0FFFF",
        paddingHorizontal: 10,
        marginHorizontal: 5,
    },
    inputWarning: {
        backgroundColor: "yellow",
        color: "gray",
        fontSize: 10,
    },
    inputButton: {
        //위치
        alignSelf: "flex-end",
        marginRight: width * 0.15,
        //크기
        height: 30,
        //스타일
        borderRadius: 5,
        backgroundColor: "gray",
        //내부
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 3,
    },
    
    /**
     * ==============================================================
     */
    stepConSection: {
        alignSelf: "center",
        marginTop: 20,
        flexDirection: "row",
        width: "70%",
        height: width * 0.08,
        justifyContent: "space-between",
        alignItems: "center",
        // backgroundColor: "yellow"
    },
    setpConButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "15%",
        height: "100%",
        marginHorizontal: 5,
    },
    setpConText: {
        marginHorizontal: 5,
        color: "white"
    },
    /**
    * ==============================================================
    */
    submitContainer: {
        alignSelf: "center",
        width: "70%",
        height: width * 0.07,
        marginTop: 15,
        backgroundColor: "#4863A0", // Steel Blue
        borderRadius: width * 0.1,
        justifyContent: "center",
    },
    submitButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    submitText: {
        fontFamily: "jua",
        fontSize: width * 0.07 * 0.5, // height의 절반
        color: "white",
    },
    /**
    * ==============================================================
    */
    footerContainer: {
        // alignSelf: "flex-end",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "yellow",
    },
    copyrightText: {
        fontFamily: "jua",
        color: "#B6B6B4", //Gray Cloud
    },
});