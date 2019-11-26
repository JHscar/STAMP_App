import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Dimensions, Platform } from "react-native";

import axios from 'axios';
import baseURL from '../../config';

import Button_LeftTop from './Button_LeftTop';

const { width, height } = Dimensions.get("window");
const StatusBarH = Platform.OS == "ios" ? 15 : StatusBar.currentHeight;

export default MissionRecord = (props) => {
    const { navigation } = props;

    // DB API
    const _getAllMssions = async () => { // 모든 미션 가져오기
        const { data } = await axios.get(`${baseURL}/sample/all`);
        // console.log(data.DBdata);
        setDBdata(data.DBdata);
    };

    const _likeMission = async () => {
        const { data } = await axios.post(`${baseURL}/sample/like`, {
            접속한아이디: "프로먹방러",
            광고주소: "5ddcd1fbb360b80024dd4966",
        });
        console.log(data);  // result:true , msg:"좋아요 등록"
    };

    // data handler
    const _split = (typeDate, key) => {
        const theDate = typeDate.slice(0, 16).split("T");
        const ymd = theDate[0];
        const hm = theDate[1];
        return key === "ymd" ? ymd : hm;
    };

    // DB controol
    const [DBdata, setDBdata] = useState([]);

    useEffect(() => {
        _getAllMssions();
    }, [])

    return (
        <>
            <ScrollView style={{ marginTop: StatusBarH }}>
                <Text style={styles.text}>{props.name} 미션 기록</Text>
                {DBdata.map(data => (<View key={data._id} style={{ alignItems: "center" }}>
                    <View style={Card.container}>

                        <View style={Card.author}>
                            <Text style={Card.authorText}>{data.authorName}</Text>
                        </View>

                        <View style={Card.title}>
                            <Text style={Card.titleText}>{data.title}</Text>
                        </View>

                        <View style={Card.discription}>
                            <Text style={Card.discriptionText}>{data.discription}</Text>
                        </View>

                        <View style={Card.contents}>
                            <View style={Card.contentsLabel}>
                                <Text style={Card.contentsLabelText}>참여 방법</Text>
                            </View>
                            <Text style={Card.contentsText}>{data.attendWay}</Text>
                        </View>

                        <View style={Card.contents}>
                            <View style={Card.contentsLabel}>
                                <Text style={Card.contentsLabelText}>기간 안내</Text>
                            </View>
                            <Text style={[Card.contentsText, { textAlign: "left" }]}>▶이벤트 기간</Text>
                            <Text style={Card.contents2Text}>{_split(data.startDate, "ymd")} {_split(data.startDate)}</Text>
                            <Text style={Card.contents2Text}>~ {_split(data.endDate, "ymd")} {_split(data.endDate)}</Text>
                        </View>

                        <View style={[Card.contents, { flexDirection: "row" }]}>
                            <View style={Card.contentsLabel}>
                                <Text style={Card.contentsLabelText}>보상 안내</Text>
                            </View>
                            <Text style={Card.contentsText}>{data.reward}</Text>
                        </View>

                        <View style={Card.footer}>
                            <View style={Card.footerLabel}>
                                <Text style={Card.footerLabelText}>★ TIP ★</Text>
                            </View>
                            <Text style={Card.footerText}>{data.tip}</Text>
                        </View>
                    </View>
                </View>))}
            </ScrollView>

            <Button_LeftTop navigation={navigation} />
        </>
    );
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

    author: {
        borderBottomLeftRadius: 100,
        backgroundColor: "#fdfeff",

        justifyContent: "center",
        alignItems: "center",

        alignSelf: "flex-end",

        paddingHorizontal: 10,
        paddingLeft: 20,
    },
    authorText: {
        color: "#3aa0c9",
        fontWeight: "bold",
    },
    title: {
        width: "90%",
        borderRadius: 5,
        backgroundColor: "#fdfeff",

        justifyContent: "center",
        alignItems: "center",

        marginVertical: 10,
        paddingHorizontal: 5,
    },
    titleText: {
        fontSize: 25,
        color: "#41b5e3",
        fontWeight: "bold",

        textAlign: "center",
    },

    discription: {
        width: "80%",
        borderRadius: 10,
        // backgroundColor: "#fdfeff",

        justifyContent: "center",
        alignItems: "center",

        marginVertical: 10,
        paddingHorizontal: 5,
    },
    discriptionText: {
        color: "#41b5e3",
        fontWeight: "bold",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        textShadowColor: "white",
        textDecorationLine: "underline",

        textAlign: "center",
    },

    contents: {
        width: "80%",
        borderRadius: 3,
        backgroundColor: "#73cef2",
        // shadowOffset: {width: 5, height: 5 },
        // shadowRadius: 2,
        // shadowColor: "red",
        elevation: 2,

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
        elevation: 2,

        borderRadius: 10,
        backgroundColor: "white",

        justifyContent: "center",
        alignItems: "center",

        paddingHorizontal: 7,
    },
    contentsLabelText: {
        fontSize: 15,
        color: "#3aa0c9",
        fontWeight: "bold",
    },
    contentsText: {
        width: "95%",
        alignSelf: "center",
        // fontSize: 25,
        color: "#247291",
        fontWeight: "bold",

        textAlign: "center",
    },
    contents2Text: {
        paddingLeft: 20,

        // fontSize: 25,
        color: "white",
        fontWeight: "bold",
    },

    footer: {
        width: "80%",
        borderWidth: 0.5,
        borderColor: "#3aa0c9",
        borderRadius: 3,

        justifyContent: "center",
        alignItems: "center",

        marginVertical: 10,
        paddingHorizontal: 5,
    },
    footerLabel: {
        position: "absolute",
        top: -10,
        left: -10,
        elevation: 2,

        backgroundColor: "#3aa0c9",
        borderRadius: 10,

        justifyContent: "center",
        alignItems: "center",

        paddingHorizontal: 7,
    },
    footerLabelText: {
        color: "white",
        fontWeight: "bold",
    },
    footerText: {
        marginVertical: 10,
        width: "95%",
        alignSelf: "center",
        // fontSize: 25,
        color: "#3aa0c9",
        fontWeight: "bold",

        textAlign: "center",
    },
});