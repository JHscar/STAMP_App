import React from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity, StatusBar, Dimensions } from "react-native";

import Button_LeftTop from './Button_LeftTop';

const { width, height } = Dimensions.get("window");
const StatusBarH = StatusBar.currentHeight;

export default class MissionRecord extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <>
                <Button_LeftTop navigation={navigation} />
                <View style={styles.container}>


                    <Text style={styles.text}>{this.props.name} 미션 기록</Text>
                    <View style={Card.container}>

                        <View style={Card.header}>
                            <Text style={Card.headerText}>2019 어린이주간 기념 이벤트</Text>
                        </View>

                        <View style={Card.title}>
                            <Text style={Card.titleText}>연합뉴스 카드뉴스</Text>
                            <Text style={Card.title2Text}>퍼가기 이벤트</Text>
                        </View>

                        <View style={Card.subTitle}>
                            <Text style={Card.subTitleText}>연합뉴스 SNS 페이지에 있는</Text>
                            <Text style={Card.subTitle2Text}>어린이주간 소개 카드뉴스
                                <Text style={Card.subTitleText}>를 공유해주시는 분께</Text>
                            </Text>
                            <Text style={Card.subTitleText}>추점을 통하여 푸짐한 선물을 드립니다.</Text>
                        </View>

                        <View style={Card.contents}>
                            <View style={Card.contentsLabel}>
                                <Text style={Card.contentsLabelText}>참여 방법</Text>
                            </View>
                            <Text style={Card.contentsText}>연합뉴스 SNS 페이지에
                                <Text style={Card.contents2Text}>에 게제된 어린이주간 </Text>
                            </Text>
                            <Text style={Card.contents2Text}>소개 카드뉴스를 본인의 SNS 계정에 공유한 후</Text>
                            <Text style={Card.contents2Text}>공유 인증 URL을 해당 포스트에 댓글로 남겨주세요!</Text>
                        </View>

                        <View style={Card.contents}>
                            <View style={Card.contentsLabel}>
                                <Text style={Card.contentsLabelText}>이벤트 안내</Text>
                            </View>
                            <Text style={Card.contentsText}>▶이벤트 기간:
                                <Text style={Card.contents2Text}>2019년 11월 27일(수) ~ 11월 28일 (목) </Text>
                            </Text>
                            <Text style={Card.contentsText}>▶당첨자 발표:
                                <Text style={Card.contents2Text}>2019년 11월 30일(토)</Text>
                            </Text>
                        </View>

                        <View style={[Card.contents,{flexDirection:"row"}]}>
                            <View style={Card.contentsLabel}>
                                <Text style={Card.contentsLabelText}>경품 안내</Text>
                            </View>
                            <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor:"white" }} ></View>
                            <View>
                                <Text>편의점 상품권</Text>
                                <Text>(5천원권)</Text>
                                <Text>22명</Text>
                            </View>
                            <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor:"white" }} ></View>
                            <View>
                                <Text>아이스크림</Text>
                                <Text>기프티콘</Text>
                                <Text>50명</Text>
                            </View>
                        </View>

                        <View style={Card.footer}>
                            <View style={Card.footerLabel}>
                                <Text style={Card.footerLabelText}>★TIP★</Text>
                            </View>
                            <Text style={Card.footerText}>아동학대예방 캠페인 공식 포스트를 팔로우하면 당첨 확률이 UP! UP!</Text>
                        </View>
                    </View>

                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "#161924",
        fontSize: 20,
        fontWeight: "500"
    }
});

const Card = StyleSheet.create({
    container: {
        width: width * 0.9,
        // height: height * 0.7,
        borderWidth: 5,
        borderColor: "#3aa0c9",
        backgroundColor: "#d5efff",

        // justifyContent:"center",
        alignItems: "center",
    },

    header: {
        borderRadius: 10,
        backgroundColor: "#fdfeff",

        justifyContent: "center",
        alignItems: "center",

        marginVertical: 10,
        paddingHorizontal: 5,
    },
    headerText: {
        color: "#3aa0c9",
        fontWeight: "bold",
    },
    title: {
        borderRadius: 10,
        backgroundColor: "#fdfeff",

        justifyContent: "center",
        alignItems: "center",

        marginVertical: 10,
        paddingHorizontal: 5,
    },
    titleText: {
        fontSize: 30,
        color: "#41b5e3",
        fontWeight: "bold",
    },
    title2Text: {
        fontSize: 25,
        color: "#3aa0c9",
        fontWeight: "bold",
    },
    subTitle: {
        borderRadius: 10,
        // backgroundColor: "#fdfeff",

        justifyContent: "center",
        alignItems: "center",

        marginVertical: 10,
        paddingHorizontal: 5,
    },
    subTitleText: {
        color: "#41b5e3",
        fontWeight: "bold",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        textShadowColor: "white"
    },
    subTitle2Text: {
        color: "#37baee",
        fontWeight: "bold",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        textShadowColor: "white"
    },

    contents: {
        width: "80%",
        // borderRadius: 10,
        backgroundColor: "#73cef2",

        justifyContent: "center",
        // alignItems: "center",

        marginVertical: 10,
        paddingHorizontal: 5,
        paddingTop: 15,
        paddingBottom: 10,
    },
    contentsLabel: {
        position: "absolute",
        top: -10,
        left: -10,

        borderRadius: 10,
        backgroundColor: "white",

        justifyContent: "center",
        alignItems: "center",

        paddingHorizontal: 5,
    },
    contentsLabelText: {
        fontSize: 15,
        color: "#3aa0c9",
        fontWeight: "bold",
    },
    contentsText: {
        // fontSize: 25,
        color: "#247291",
        fontWeight: "bold",
    },
    contents2Text: {
        // fontSize: 25,
        color: "white",
        fontWeight: "bold",
    },

    footer: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: "90%",
        // borderRadius: 10,
        // backgroundColor: "#73cef2",

        justifyContent: "center",
        alignItems: "center",

        marginVertical: 10,
        paddingHorizontal: 5,
    },
    footerLabel: {
        backgroundColor: "#3aa0c9",
        borderRadius: 10,

        justifyContent: "center",
        alignItems: "center",

        marginLeft: 10,
        paddingHorizontal: 5,
    },
    footerLabelText: {
        color: "white",
        fontWeight: "bold",
    },
    footerText: {
        color: "#3aa0c9",
        fontWeight: "bold",
    },
});