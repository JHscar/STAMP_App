import React, { useState, useEffect } from 'react';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import {
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
  UIManager,
  View,
} from 'react-native';

import img_ing from '../../assets/images/ing.png';
import img_heart from '../../assets/images/heart.png';
import img_expect from '../../assets/images/expect.png';
import img_drawer from '../../assets/images/drawer.png'

const { width, height } = Dimensions.get("window");
const statusBarH = StatusBar.currentHeight;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default function Main(props) {
  const { navigation } = props;
  const [initialRegion, setinitialRegion] = useState();
  const [hasLocationPermissions, setHasLocationPermissions] = useState();
  const [locationResult, setLocationResult] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [isModal, setisModal] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'ios' && Platform.OS !== 'android') {
      setErrorMessage({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      _getLocationAsync();
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
  }

  // map controll
  const DBdata = [
    {
      coordinate: {
        latitude: 37.550214,
        longitude: 127.127516,
      },
      name: "미션명1",
      email: "miyah.myles@gmail.com",
      position: "Data Entry Clerk",
      photo: "https://i.imgur.com/sNam9iJ.jpg"
    },
    {
      coordinate: {
        latitude: 37.538807,
        longitude: 127.123453,
      },
      name: "미션명2",
      email: "june.cha@gmail.com",
      position: "Sales Manager",
      photo: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      coordinate: {
        latitude: 37.515688,
        longitude: 127.09856,
      },
      name: "미션명3",
      email: "iida.niskanen@gmail.com",
      position: "Sales Manager",
      photo: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      coordinate: {
        latitude: 37.498154,
        longitude: 127.027648,
      },
      name: "미션명4",
      email: "renee.sims@gmail.com",
      position: "Medical Assistant",
      photo: "https://randomuser.me/api/portraits/women\/65.jpg"
    },
    {
      coordinate: {
        latitude: 37.598154,
        longitude: 127.07648,
      },
      name: "미션명5",
      email: "jonathan.nu\u00f1ez@gmail.com",
      position: "Clerical",
      photo: "https://randomuser.me/api/portraits/men/43.jpg"
    },
    {
      coordinate: {
        latitude: 37.398154,
        longitude: 127.05648,
      },
      name: "미션명6",
      email: "sasha.ho@gmail.com",
      position: "Administrative Assistant",
      photo: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?h=350&auto=compress&cs=tinysrgb"
    },
    {
      coordinate: {
        latitude: 37.598154,
        longitude: 127.017648,
      },
      name: "미션명7",
      email: "abdullah.hadley@gmail.com",
      position: "Marketing",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=a72ca28288878f8404a795f39642a46f"
    },
    {
      coordinate: {
        latitude: 37.398154,
        longitude: 127.017648,
      },
      name: "미션명8",
      email: "thomas.stock@gmail.com",
      position: "Product Designer",
      photo: "https://tinyfac.es/data/avatars/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg"
    },
    {
      coordinate: {
        latitude: 37.398154,
        longitude: 127.07648,
      },
      name: "미션명9",
      email: "veeti.seppanen@gmail.com",
      position: "Product Designer",
      photo: "https://randomuser.me/api/portraits/men/97.jpg"
    },
    {
      coordinate: {
        latitude: 37.598154,
        longitude: 127.04648,
      },
      name: "미션명10",
      email: "bonnie.riley@gmail.com",
      position: "Marketing",
      photo: "https://randomuser.me/api/portraits/women/26.jpg"
    }
  ];
  const [makers, setMakers] = useState(null);

  // 내위치 조회
  const _myLocation = async () => {
    const myLocation = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = myLocation.coords;
    _Map.animateToRegion({ latitude, longitude, latitudeDelta: 0.0422, longitudeDelta: 0.0121 });
  };

  // const _regionChange = (ix) => {
  //   _Map.animateToRegion({
  //     ...DBdata[ix].coordinate,
  //     latitudeDelta: 0.0322,
  //     longitudeDelta: 0.005
  //   });
  // }

  const _focusCamera = (ix) => {
    const { latitude, longitude } = DBdata[ix].coordinate;
    _Map.animateCamera({
      center: { latitude, longitude },
      zoom: 16 // 0-20 min -max
    })
  }

  // flatlist style controll
  const [click_num, setclick_num] = useState(0);
  const styleName = { 0: "Base", 1: "List", 2: "Item" };

  const _clicked = () => {
    LayoutAnimation.easeInEaseOut();
    setclick_num(click_num => ++click_num);
  };

  // flatlist controll
  let [flatIndex, setFlatIndex] = useState(0)
  // touch drag change index
  const _pagination = (velocity, index) => {
    if (index === 0 || index) {
      setFlatIndex(index);
      _focusCamera(flatIndex);
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
      _Flatlist.scrollToIndex({ index: flatIndex, animated: true });
      _focusCamera(flatIndex);
    }
  }
  // renderItems component
  const RenderList = ({ item, index }) => (
    <View style={modal.Contents}>
      <TouchableOpacity onPress={() => { _pagination(0, index) }}>
        <Image source={{ uri: item.photo }} style={{ width: 60, height: 60, borderRadius: 30 }} />
        <View>
          <Text >{item.name}</Text>
          <Text>{item.position}</Text>
          <Text>평점</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
  const RenderItems = ({ item }) => (
    <View style={modal.Contents}>
      <Image source={{ uri: item.photo }} style={{ width: 60, height: 60, borderRadius: 30 }} />
      <View>
        <Text >{item.name}</Text>
        <Text>{item.position}</Text>
        <Text>평점</Text>
      </View>
    </View>
  );

  return (
    <>
      {/** 지도 화면 */}
      <MapView
        ref={ref => _Map = ref}
        provider={PROVIDER_GOOGLE}
        style={[{ width, height: height + statusBarH - 100 }]}
        initialRegion={initialRegion}
        // region={mapRegion}
        showsUserLocation={true}
        showsMyLocationButton={false}
      // followsUserLocation={true}
      >
        {DBdata.map((data, ix) => <Marker key={ix} coordinate={data.coordinate} />)}

      </MapView>

      {/** 왼쪽 상단 버튼 */}
      <View style={overStyle.topLeftSection}>
        <TouchableOpacity
          style={overStyle.topLeftButton}
          onPress={navigation.openDrawer}>
          <Image style={overStyle.topLeftImg} source={img_drawer} />
        </TouchableOpacity>
      </View>

      {/** 오른쪽 상단 버튼 */}
      <View style={overStyle.topRightSection}>
        <TouchableOpacity
          style={overStyle.topRightButton}
          onPress={_myLocation}>
          <Text>내위치</Text>
        </TouchableOpacity>
      </View>

      {/** 하단에 숨겨진 item 1 */}
      <View style={[modal[`Section_${styleName[click_num % 3]}`], modal[styleName[click_num % 3]]]}>
        {styleName[click_num % 3] === "List"
          && <FlatList
            data={DBdata}
            renderItem={({ item, index }) => <RenderList item={item} index={index} />}
            keyExtractor={item => item.email}
            ref={ref => (_Flatlist = ref)}
          // onScrollEndDrag={e => _pagination(e.nativeEvent.velocity.x)}
          />
        }
        {styleName[click_num % 3] === "Item"
          && <FlatList
            data={DBdata}
            initialScrollIndex={flatIndex}
            renderItem={({ item }) => <RenderItems item={item} />}
            keyExtractor={item => item.name}
            horizontal={true} // 가로방향
            showsHorizontalScrollIndicator={false} // 스크롤 안보이기
            ref={ref => (_Flatlist = ref)}
            onScrollEndDrag={e => _pagination(e.nativeEvent.velocity.x)}
          />
        }
      </View>


      {/** 하단 네비게이션 버튼 */}
      <View style={overStyle.bottomSection}>
        <TouchableOpacity
          style={overStyle.bottomButton}>
          <Image style={overStyle.bottomImg} source={img_heart}></Image>
        </TouchableOpacity>

        <TouchableOpacity
          style={overStyle.bottomButton}>
          <Image style={overStyle.bottomImg} source={img_expect}></Image>
        </TouchableOpacity>

        <TouchableOpacity
          style={overStyle.bottomButton}
          onPress={_clicked}>
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
    bottom: 100
  },
  Item: {
    bottom: 100
  },
  Section_Base: {
    position: "absolute",
    width,
    // height: height - 100,
    backgroundColor: "rgba(111,111,111,0.3)",
  },
  Section_List: {
    position: "absolute",
    width,
    height: height - 100,
    backgroundColor: "rgba(111,111,111,0.3)",
  },
  Section_Item: {
    position: "absolute",
    width,
    height: width * 0.5,
    backgroundColor: "rgba(111,111,111,0.3)",
  },
  Contents: {
    // margin: 10,
    borderColor: "black",
    borderWidth: 1,
    width,
    backgroundColor: "yellow"
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
    width: 100,
    height: 100,
    backgroundColor: "rgba(220,220,220,0.5)",
    // justifyContent:"flex-end",
    alignItems: "flex-end",
  },
  topRightButton: {
    width: 50,
    height: 50,
    backgroundColor: "red",
  },

  bottomSection: {
    position: "absolute",
    width,
    height: 100,
    bottom: 0,
    backgroundColor: "white",

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

  },
  bottomButton: {
    marginHorizontal: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomImg: {
    width: 50,
    height: 50,
  },

});