import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Animated, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';



let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;


export default class MissionView extends Component {

    state = {
        mapRegion: null,
        hasLocationPermissions: false,
        locationResult: null,
        data: this.props.navigation.state.params.data,
        region: {
            latitudeDelta: 0.04864195044303443,
            longitudeDelta: 0.040142817690068,
        },
    };


    componentWillMount() {
        this.index = 0;
        this.animation = new Animated.Value(0);
    }


    componentDidMount() {

        this._getLocationAsync();


        // We should detect when scrolling has stopped then animate
        // We should just debounce the event listener here
        this.animation.addListener(({ value }) => {
            let index = Math.floor(value / screenWidth + 0.3); // animate 30% away from landing on the next item
            if (index >= this.state.data.length) {
                index = this.state.data.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(this.regionTimeout);
            this.regionTimeout = setTimeout(() => {
                if (this.index !== index) {
                    this.index = index;
                    const { coordinate } = this.state.data[index];
                    this.map.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: this.state.region.latitudeDelta,
                            longitudeDelta: this.state.region.longitudeDelta,
                        },
                        350
                    );
                }
            }, 10);
        });


    }


    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                locationResult: 'Permission to access location was denied',
            });
        } else {
            this.setState({ hasLocationPermissions: true });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ locationResult: JSON.stringify(location) });

        // Center the map on the location we just fetched.
        this.setState({
            mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },

        });
        // console.log(this.state.mapRegion);
        // console.log(this.state.data);
        // console.log(this.props.navigate.getParam("data"));


    };


    render() {

        return (
            <>

                <MapView
                    ref={map => this.map = map}
                    region={this.state.mapRegion}
                    style={{ flex: 1 }}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    zoomEnabled={true}
                    initialRegion={this.state.mapRegion}
                >
                    {this.state.data.map((data, index) => {
                        return (
                            <Marker key={index} coordinate={data.coordinate}>
                                {/* <Animated.View style={[styles.markerWrap, opacityStyle]}>
                                <Animated.View style={[styles.ring, scaleStyle]} />
                                <View style={styles.marker} />
                            </Animated.View> */}
                            </Marker>
                        );
                    })}
                </MapView>

                <Animated.ScrollView
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={true}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        x: this.animation,
                                    },
                                },
                            },
                        ],
                        { useNativeDriver: true }
                    )}
                >
                    {this.state.data.map((data, index) => (
                        <View style={{
                            backgroundColor: '#fff',
                            flex: 1,
                            flexDirection: 'row',
                            width: screenWidth,
                        }} key={index}>
                            <Image source={{ uri: data.photo }} style={[styles.company_profile,{alignItems: "flex-start"}]} />
                            {/* <Image
                                source={{ uri: data.photo }}
                                style={styles.cardImage}
                                resizeMode="cover"
                            /> */}
                            <View style={styles.textContent}>
                                <Text numberOfLines={1} style={styles.cardtitle}>{data.name}</Text>
                                <Text numberOfLines={1} style={styles.cardDescription}>
                                    {data.email}
                                </Text>
                                <Text numberOfLines={1} style={styles.cardDescription}>
                                    {data.position}
                                </Text>
                            </View>
                        </View>
                    ))}
                </Animated.ScrollView>

            </>

        )
    }
}







const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        overflow: "hidden",
    },
    cardImage: {
        flex: 1,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 1,
        margin: 15
    },
    cardtitle: {
        fontSize: 25,
        marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 15,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(130,4,150, 0.9)",
    },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(130,4,150, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(130,4,150, 0.5)",
    },
    company_profile: {
        width: 100,
        height: 100,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#FFF",
        margin: 15
    },
});

