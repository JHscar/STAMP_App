import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        // justifyContent: "center", // 상하
        alignItems: "center", // 좌우
        paddingVertical: 30,
        width,
        height,
    },
    field: {
        alignSelf: "flex-start",
        marginLeft: 30,
        marginBottom: 10,
        padding: 5,
        fontFamily: "jua",
        fontSize: 15,
        backgroundColor: "#B6B6B4", //Gray Cloud
        borderRadius: 5,
    },
    inputSection: {
        // flex: 1,
        flexDirection: "row",
        // justifyContent: "space-between",
        alignItems: "center",
        width: "70%",
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC",
    },
    iconWrap: {
        marginLeft: 10,
    },
    inputText: {
        marginLeft: 10,
    },
    inputButton: {
        position: "absolute",
        marginLeft: "70%",
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 35,
        borderRadius: 5,
        backgroundColor: "gray",
    },
});