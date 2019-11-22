import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { FontAwesome5 } from "@expo/vector-icons";

const StatusBarH = StatusBar.currentHeight;

export default class MainMap extends Component {

    state = {
        mapRegion: null,
        hasLocationPermissions: false,
        locationResult: null
    };


    componentDidMount() {
        this.getLocationAsync();
    }

    async getLocationAsync() {
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

        this.setState({ mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0422, longitudeDelta: 0.0121 } });
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{ alignItems: "flex-start" }}>
                    <TouchableOpacity
                        style={{ alignItems: "flex-start", margin: 16 }}
                        onPress={this.props.navigation.openDrawer}
                    >
                        <FontAwesome5 name="bars" size={24} color="#161924" />
                    </TouchableOpacity>
                </View>

                <MapView
                    style={styles.mapStyle}
                    region={this.state.mapRegion}
                    showsUserLocation={true}
                    followsUserLocation={true}
                >
                </MapView>

            </View>
        );
    }

}

MainMap.navigationOptions = {
    header: null,
};


const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        marginTop: 50,
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        marginTop: StatusBarH,
    },
});