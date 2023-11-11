import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Image, Linking, TouchableOpacity } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import * as Location from 'expo-location';

Mapbox.setAccessToken('pk.eyJ1IjoibWJtcGgiLCJhIjoiY2tya2F0OTJvMGk1YjJwbGZ1bDJ1eGU0dCJ9.fLJp01SsIpdhGmWdBzaSnQ');

type Props = {}

const MapContainer = (props: Props) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location);
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    const openGoogleMaps = (lat: number, lon: number) => {
        console.log(location.coords.latitude, location.coords.longitude)

        const sourceLatitude = location.coords.latitude;
        const sourceLongitude = location.coords.longitude;

        const destinationLatitude = lat;
        const destinationLongitude = lon;

        const url = `https://www.google.com/maps/dir/?api=1&origin=${sourceLatitude},${sourceLongitude}&destination=${destinationLatitude},${destinationLongitude}`;

        Linking.openURL(url);
    };


    return (
        <View style={styles.page}>
            <View style={styles.container}>


                {location ? (
                    <Mapbox.MapView style={{
                        borderRadius: 10,
                        flex: 1,
                    }} styleURL='mapbox://styles/mbmph/clou6gqg400vg01qm0mttcdpj'>
                        <Mapbox.Camera
                            zoomLevel={14} // Adjust the initial zoom level as desired
                            centerCoordinate={[
                                location.coords.longitude,
                                location.coords.latitude,
                            ]}
                            animationMode="flyTo"
                            animationDuration={500}
                        />

                        {/* marker */}
                        <Mapbox.MarkerView coordinate={[24.9029299, 60.1620133]}>
                            <TouchableOpacity onPress={() => openGoogleMaps(60.1620133, 24.9029299)}>
                                <Image source={require('../../../assets/map/location.png')} style={{ width: 30, height: 30 }} />
                            </TouchableOpacity>
                        </Mapbox.MarkerView>
                        <Mapbox.MarkerView coordinate={[24.902275, 60.163625]}>
                            <TouchableOpacity onPress={() => openGoogleMaps(60.163625, 24.902275)}>
                                <Image source={require('../../../assets/map/location.png')} style={{ width: 30, height: 30 }} />
                            </TouchableOpacity>
                        </Mapbox.MarkerView>
                        <Mapbox.MarkerView coordinate={[24.906664, 60.163417]}>
                            <TouchableOpacity onPress={() => openGoogleMaps(60.163417, 24.906664)}>
                                <Image source={require('../../../assets/map/location.png')} style={{ width: 30, height: 30 }} />
                            </TouchableOpacity>
                        </Mapbox.MarkerView>

                    </Mapbox.MapView>
                ) : <View style={{ backgroundColor: "#C0E3C0", borderRadius: 20, padding: 20 }}>
                    <ActivityIndicator style={{ transform: [{ scale: 2 }], margin: 20, }} color={"darkgreen"} size={50} />
                    <Text style={{ textAlign: "center", fontSize: 26 }}>Loading Map</Text>
                </View>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        borderRadius: 20,
        marginBottom: 100
    },
    container: {
        height: 300,
        // width: "100%",
        borderRadius: 20,
        overflow: 'hidden'
    },
    map: {
        flex: 1,
        borderRadius: 20,
    },
    calloutContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 2,
    },
    calloutText: {
        fontSize: 16,
        color: '#333',
    },
});

export default MapContainer