import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../../config';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import {
  AsyncStorage,
  Animated,
  Dimensions,
  FlatList,
  Image,
  LayoutAnimation,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  UIManager,
  View,
  Button,
  Alert,
} from 'react-native';

import Button_LeftTop from './Button_LeftTop';

import { Ionicons } from '@expo/vector-icons';
import img_ing from '../../assets/images/ing.png';
import img_close from '../../assets/images/close.png';
import img_heart from '../../assets/images/heart.png';
import img_expect from '../../assets/images/expect.png';
import img_drawer from '../../assets/images/drawer.png';
import img_wallet from '../../assets/images/wallet.png';
import img_clock from '../../assets/images/clock.png';
import img_location from '../../assets/images/location.png';
import img_non_heart from '../../assets/images/non_heart.png';
import img_marker from '../../assets/images/missionMarker.png';
import img_marker_defalut from '../../assets/images/missionMarker_defalut.png';

const { width, height } = Dimensions.get("window");
const statusBarH = Platform.OS == "ios" ? 15 : StatusBar.currentHeight;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default function Main(props) {
  const { navigation } = props;
  const [initialRegion, setinitialRegion] = useState();
  const [hasLocationPermissions, setHasLocationPermissions] = useState();
  const [locationResult, setLocationResult] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [userAdd, setuserAdd] = useState("");

  useEffect(() => {
    if (Platform.OS !== 'ios' && Platform.OS !== 'android') {
      setErrorMessage({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      _getLocationAsync();
      _getAllMssions();
      _getUser();
    }
    return () => { };
  }, []);

  const _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      setLocationResult({
        locationResult: 'Permission to access location was denied',
      });
    } else {
      setHasLocationPermissions(true);
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocationResult(JSON.stringify(location));
    setinitialRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0422,
      longitudeDelta: 0.0121
    });
  };

  // 유저 정보
  const _getUser = async () => {
    const localId = await AsyncStorage.getItem('userId');

    const { data } = await axios.post(`${baseURL}/sample/whoami`, { userid: localId });
    // console.log(data.userAdd);
    setuserAdd(data.userAdd);
  }

  // DB controol
  const [DBdata, setDBdata] = useState([]);

  // DB API
  const _getAllMssions = async () => { // 모든 미션 가져오기
    const { data } = await axios.get(`${baseURL}/sample/all`);
    // console.log(data.DBdata);
    if (isLike) {
      _changeDB(data.DBdata)
    } else {
      setDBdata(data.DBdata);
    }
  };

  // 좋아요 누르기
  const _likeMission = async (e, Ad_address) => {   // 좋아요 누르기
    const localId = await AsyncStorage.getItem('userId');
    const { data } = await axios.post(`${baseURL}/sample/like`, {
      접속한아이디: localId,
      광고주소: Ad_address,
    });
    // console.log(data);  // result:true , msg:"좋아요 등록"
    await _getAllMssions();
  };

  // 내위치 조회
  const _myLocation = async () => {
    const myLocation = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = myLocation.coords;
    _Map.animateToRegion({ latitude, longitude, latitudeDelta: 0.0422, longitudeDelta: 0.0121 });
  };

  // 맵 포커스 변경
  const _focusCamera = (ix) => {
    if (DBdata !== []) {
      const { latitude, longitude } = DBdata[ix].coordinate;
      _Map.animateCamera({
        center: { latitude, longitude },
        zoom: 16 // 0-20 min -max
      })
    }
  };

  // 마커 클릭 controll
  const _markerSelect = async (e, index) => {
    await setFlatIndex(index);
    _clicked("Item");
  };

  // flatlist style controll
  const [click_num, setclick_num] = useState(0);
  const styleName = { 0: "Base", 1: "List", 2: "Item" };

  const _clicked = (mulitple) => {
    LayoutAnimation.easeInEaseOut();
    if (mulitple == "List") { setclick_num(1); return; };
    if (mulitple == "Item") { setclick_num(2); return; };
    if (mulitple == "Clear") { setclick_num(3); return; };
    setclick_num(click_num => ++click_num);
  };
  useEffect(() => { // index 초기화
    if (click_num % 3 === 0) {
      setFlatIndex(null);
      _myLocation();
    }
    if (click_num % 3 === 2 && !flatIndex) {
      setFlatIndex(0);
    }
  }, [click_num]);

  // 좋아요한 것만 불러오기
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    _getAllMssions();
  }, [isLike])

  const _changeDB = async (DB) => {
    const LikedDB = [];
    await DB.map(data => data.likedUser.includes(userAdd) && LikedDB.push(data));
    setDBdata(LikedDB);
  }

  // flatlist controll
  let [flatIndex, setFlatIndex] = useState(null);
  useEffect(() => { // 화면 전환
    if (flatIndex === 0 || flatIndex > 0) {
      _focusCamera(flatIndex)
    }
  }, [flatIndex])
  // touch drag change index
  const _pagination = async (velocity, index) => {
    if (index === 0 || index) {
      setFlatIndex(index); // 아이템 이동
      _clicked();
    } else {
      let nextIndex;
      if (Platform.OS == "ios")
        nextIndex = velocity > 0 ? flatIndex + 1 : flatIndex - 1;
      else
        nextIndex = velocity < 0 ? flatIndex + 1 : flatIndex - 1;

      if (nextIndex >= 0 && nextIndex < DBdata.length) {
        flatIndex = nextIndex;
      }
      _Flatlist.scrollToIndex({ index: flatIndex, animated: true }); //아이템이동
      setFlatIndex(flatIndex)
    }
  }
  // renderItems component
  const RenderList = ({ item, index }) => (
    <View style={modal.forList}>
      <TouchableOpacity style={{ flexDirection: 'column' }} onPress={() => { _pagination(0, index) }}>
        <View style={{ position: "absolute", right: 10 }}>
          {item.likedUser.includes(userAdd)
            ? <Image source={img_heart} style={{ width: 30, height: 30 }} />
            : <Image source={img_non_heart} style={{ width: 30, height: 30 }} />
          }
        </View>
        <View style={modal.List_author}>
          <Text style={modal.List_authorText}>{item.authorName}</Text>
        </View>

        <View style={modal.List_title}>
          <Text style={modal.List_titleText}>{item.title}</Text>
        </View>

        <View style={modal.List_contents}>
          <View style={modal.List_contentsLabel}>
            <Image source={require("../../assets/images/rewardcoin.png")} style={{ width: 20, height: 20 }} />
            <Text style={modal.List_contentsLabelText}>보상내용</Text>
          </View>
          <Text style={modal.List_contentsText}>{item.reward}</Text>
        </View>

        <View style={modal.status}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <Ionicons name="md-alarm" size={10} color="white" />
            <Ionicons name="md-people" size={10} color="white" />
            <Ionicons name="md-paper" size={10} color="white" />
            <Ionicons name="md-basket" size={10} color="white" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
  const RenderItems = ({ item }) => (
    <View style={modal.forItem}>
      {/* <Image source={{ uri: item.photo }} style={{ width: 60, height: 60, borderRadius: 30 }} /> */}
      <TouchableOpacity activeOpacity={0.8} style={{ flex: 1 }} onPress={() => { setShowDetail(true) }}>

        <View style={{ flex: 1 }}>
          <View style={modal.Item_author}>
            <Text style={modal.Item_authorText}>{item.authorName}</Text>
          </View>

          <View style={modal.Item_title}>
            <Text style={modal.Item_titleText}>{item.title}</Text>
          </View>

          <View style={modal.Item_likeSection}>
            <TouchableOpacity style={modal.Item_likeButton}
              onPress={(e) => { _likeMission(e, item._id) }}>
              <Image source={item.likedUser.includes(userAdd) ? img_heart : img_non_heart}
                style={{ width: 50, height: 50, padding: 10, }} />
            </TouchableOpacity>
          </View>

          <View style={modal.Item_contents}>
            <View style={modal.Item_contentsRow}>
              <Image source={img_location} style={{ width: 20, height: 20 }} />
              <Text style={modal.Item_contentsText}>{item.address}</Text>
            </View>
            <View style={modal.Item_contentsRow}>
              <Image source={img_ing} style={{ width: 20, height: 20 }} />
              <Text style={modal.Item_contentsText}>{item.likedUser.length} / {item.attendNum} 명</Text>
            </View>
            <View style={modal.Item_contentsRow}>
              <Image source={img_wallet} style={{ width: 20, height: 20 }} />
              <Text style={modal.Item_contentsText}>{item.reward}</Text>
            </View>
            <View style={modal.Item_contentsRow}>
              <Image source={img_clock} style={{ width: 20, height: 20 }} />
              <Text style={modal.Item_contentsText}>{item.startDate.slice(0, 10)} / {item.startDate.slice(11, 16)}
                ~ {item.endDate.slice(0, 10)} / {item.endDate.slice(11, 16)}</Text>
            </View>
          </View>

        </View>
      </TouchableOpacity>
    </View>
  );

  // mission detail
  const [showDetail, setShowDetail] = useState(false);  
  const MissionDetail = ({ data }) => {
    return (
      <>
        {data
          && <View style={[Card.container, { position: "absolute", top: statusBarH + 30, alignSelf: "center" }]}>

            <View style={{ position: "absolute", bottom: -10, right: -10, width: 40, height: 40, borderRadius: 20 }}>
              <TouchableOpacity style={{ flex: 1, backgroundColor: "rgba(220,220,220,0.5)" }} onPress={() => { setShowDetail(false) }}>
                <Image style={{ width: 30, height: 30 }} source={img_close}></Image>
              </TouchableOpacity>
            </View>

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
              <Text style={Card.contents2Text}>{data.startDate.slice(0, 10)} / {data.startDate.slice(11, 16)}
                ~ {data.endDate.slice(0, 10)} / {data.endDate.slice(11, 16)}</Text>
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
          </View>}
      </>
    )
  }

  return (
    <>
      {/** 지도 화면 */}
      <MapView
        ref={ref => _Map = ref}
        provider={PROVIDER_GOOGLE}
        style={[{ width, height: height + statusBarH - 75 }]}
        initialRegion={initialRegion}
        // region={mapRegion}
        showsUserLocation={true}
        showsMyLocationButton={false}
      // followsUserLocation={true}
      >
        {DBdata.map((data, ix) =>
          <Marker key={ix}
            ref={ref => _MarKer = ref}
            coordinate={data.coordinate}
            image={flatIndex === ix ? img_marker : img_marker_defalut}
            onPress={(e) => _markerSelect(e, ix)} />
        )}

      </MapView>

      {/** 왼쪽 상단 버튼 */}
      <Button_LeftTop navigation={navigation} />
      {/* <View style={overStyle.topLeftSection}>
        <TouchableOpacity
          style={overStyle.topLeftButton}
          onPress={navigation.openDrawer}>
          <Image style={overStyle.topLeftImg} source={img_drawer} />
        </TouchableOpacity>
      </View> */}

      {/** 오른쪽 상단 버튼 */}
      <View style={overStyle.topRightSection}>
        <TouchableOpacity
          style={overStyle.topRightButton}
          onPress={_myLocation}>
          <Image style={overStyle.topRightImg} source={img_location} />
        </TouchableOpacity>
      </View>

      {/** 하단에 숨겨진 item 1 */}
      <View style={[modal[`Section_${styleName[click_num % 3]}`], modal[styleName[click_num % 3]]]}>
        {styleName[click_num % 3] === "List"
          && <FlatList
            data={DBdata}
            renderItem={({ item, index }) => <RenderList item={item} index={index} />}
            keyExtractor={item => item._id}
            ref={ref => (_Flatlist = ref)}
          // onScrollEndDrag={e => _pagination(e.nativeEvent.velocity.x)}
          />
        }
        {styleName[click_num % 3] === "Item"
          && <>
            {/* FlatList for Itme 의 상단바 */}
            <View style={{ width, height: 30, backgroundColor: "rgba(220,220,220,0)", flexDirection: "row" }}>
              <View style={{ flex: 1, paddingHorizontal: 5, }}>
                <TouchableOpacity
                  style={{ flex: 1, backgroundColor: "rgb(220,220,220)", justifyContent: "center", alignItems: "center", borderTopLeftRadius: 5, borderTopRightRadius: 5, }}
                  onPress={() => _clicked()}>
                  <Text>닫기</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, paddingHorizontal: 5, }}>
                <TouchableOpacity
                  style={{ flex: 1, backgroundColor: "rgb(220,220,220)", justifyContent: "center", alignItems: "center", borderTopLeftRadius: 5, borderTopRightRadius: 5, }}>
                  <Text>{flatIndex + 1} / {DBdata.length}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, paddingHorizontal: 5, }}>
                <TouchableOpacity
                  style={{ flex: 1, backgroundColor: "rgb(220,220,220)", justifyContent: "center", alignItems: "center", borderTopLeftRadius: 5, borderTopRightRadius: 5, }}
                  onPress={() => _clicked("List")}>
                  <Text>리스트로보기</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* FlatList for Item */}
            <FlatList
              data={DBdata}
              initialScrollIndex={flatIndex}  // 처음 보여주는 page index
              renderItem={({ item }) => <RenderItems item={item} />}
              keyExtractor={item => item._id}
              horizontal={true} // 가로방향
              showsHorizontalScrollIndicator={false} // 스크롤 안보이기
              ref={ref => (_Flatlist = ref)}
              onScrollEndDrag={e => _pagination(e.nativeEvent.velocity.x)}
            />
          </>
        }
      </View>

      {showDetail
        && <MissionDetail data={DBdata[flatIndex]} />
      }


      {/** 하단 네비게이션 버튼 */}
      <View style={overStyle.bottomSection}>
        <TouchableOpacity
          style={overStyle.bottomButton}
          onPress={() => { setIsLike(true), _clicked() }}
        >
          <Image style={overStyle.bottomImg} source={img_heart}></Image>
        </TouchableOpacity>

        <TouchableOpacity
          style={overStyle.bottomButton}>
          <Image style={overStyle.bottomImg} source={img_expect}></Image>
        </TouchableOpacity>

        <TouchableOpacity
          style={overStyle.bottomButton}
          onPress={() => { setIsLike(false), _clicked() }}>
          <Image style={overStyle.bottomImg} source={img_ing}></Image>
        </TouchableOpacity>
      </View>
    </>
  )
};


const modal = StyleSheet.create({
  Base: {
    bottom: -height
  },
  List: {
    bottom: 75
  },
  Item: {
    bottom: 75
  },
  Section_Base: {
    position: "absolute",
    width,
    // height: height - 75,
    backgroundColor: "white",
  },
  Section_List: {
    position: "absolute",
    width,
    height: height - 75,
    backgroundColor: "white",
  },
  Section_Item: {
    position: "absolute",
    width,
    height: width * 0.5,
    backgroundColor: "white",
  },
  // =================================================================================
  //      플렛리스트의 list 부분
  // =================================================================================
  forList: {
    width: "98%",
    marginVertical: 10,
    padding: 10,

    alignSelf: "center",

    borderRadius: 3,
    borderColor: "#3aa0c9",
    borderWidth: 2,

    backgroundColor: "#d5efff",
  },

  List_author: {
    elevation: 3,
    borderTopLeftRadius: 100,
    borderBottomRightRadius: 100,
    backgroundColor: "#fdfeff",

    justifyContent: "center",
    alignItems: "center",

    alignSelf: "flex-start",

    paddingHorizontal: 15,
    // paddingRight: 20,
  },
  List_authorText: {
    color: "#3aa0c9",
    fontWeight: "bold",
  },

  List_title: {
    alignSelf: "center",
    width: "80%",
    borderRadius: 5,
    backgroundColor: "#fdfeff",

    justifyContent: "center",
    alignItems: "center",

    marginVertical: 10,
    paddingHorizontal: 5,
  },
  List_titleText: {
    fontSize: 17,
    color: "#41b5e3",
    fontWeight: "bold",

    textAlign: "center",
    textDecorationLine: "underline",
  },

  List_contents: {
    width: "80%",
    borderRadius: 3,
    backgroundColor: "#73cef2",
    elevation: 2,

    alignSelf: "center",

    justifyContent: "center",
    // alignItems: "center",

    marginVertical: 10,
    paddingHorizontal: 5,
    paddingTop: 15,
    paddingBottom: 10,
  },
  List_contentsLabel: {
    position: "absolute",
    top: -10,
    left: -10,
    elevation: 2,

    borderRadius: 10,
    backgroundColor: "white",

    paddingHorizontal: 7,

    flexDirection: "row"
  },
  List_contentsLabelText: {
    // fontSize: 15,
    color: "#3aa0c9",
    fontWeight: "bold",
  },
  List_contentsText: {
    width: "95%",
    alignSelf: "center",
    // fontSize: 25,
    color: "#247291",
    fontWeight: "bold",

    textAlign: "center",
  },
  List_contents2Text: {
    paddingLeft: 20,

    // fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },

  // =================================================================================
  //      플렛리스트의 item 부분
  // =================================================================================
  forItem: {
    width,

    borderRadius: 3,
    borderColor: "#3aa0c9",
    borderWidth: 2,

    backgroundColor: "#d5efff",
  },

  Item_author: {
    elevation: 3,
    borderRadius: 3,
    backgroundColor: "#fdfeff",

    justifyContent: "center",
    alignItems: "center",

    alignSelf: "flex-start",

    paddingHorizontal: 15,
    // paddingRight: 20,
  },
  Item_authorText: {
    fontSize: 12,
    color: "#3aa0c9",
    fontWeight: "bold",
  },

  Item_title: {
    // alignSelf: "center",
    width: "80%",
    borderRadius: 5,
    backgroundColor: "#fdfeff",

    justifyContent: "center",
    alignItems: "center",

    marginVertical: 10,
    // paddingHorizontal: 5,
  },
  Item_titleText: {
    fontSize: 15,
    color: "#41b5e3",
    fontWeight: "bold",

    textAlign: "center",
    // textDecorationLine: "underline",
  },

  Item_likeSection: {
    position: "absolute",
    top: 10,
    right: 15,
  },
  Item_likeButton: {
    flex: 1
  },

  Item_contents: {
    marginLeft: 15,
  },
  Item_contentsRow: {
    flexDirection: "row",
  },
  Item_contentsText: {
    color: "gray"
  },

});


const overStyle = StyleSheet.create({
  topLeftSection: {
    position: "absolute",
    top: statusBarH + 10,
    left: 10,
    // width: 100,
    // height: 100,
    // backgroundColor: "rgba(220,220,220,0.5)",
  },
  topLeftButton: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(220,220,220,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  topLeftImg: {
    width: 30,
    height: 30,
  },

  topRightSection: {
    position: "absolute",
    top: statusBarH + 10,
    right: 10,
    // backgroundColor: "rgba(220,220,220,0.5)",
    // justifyContent:"flex-end",
    alignItems: "flex-end",
  },
  topRightButton: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(220,220,220,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  topRightImg: {
    width: 30,
    height: 30,
  },

  bottomSection: {
    position: "absolute",
    width,
    height: 75,
    bottom: 0,
    backgroundColor: "white",

    borderRadius: 3,
    borderTopWidth: 0.5,
    borderTopColor: "rgb(220,220,220)",

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

  },
  bottomButton: {
    marginHorizontal: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomImg: {
    width: 50,
    height: 50,
  },

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