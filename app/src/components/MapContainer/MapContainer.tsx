import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
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

    return (
        <View style={styles.page}>
            <View style={styles.container}>


                {location ? (
                    <Mapbox.MapView style={{
                        borderRadius: 10,
                        flex: 1,
                    }} styleURL='mapbox://styles/mbmph/clou6gqg400vg01qm0mttcdpj'>
                        <Mapbox.Camera
                            zoomLevel={16} // Adjust the initial zoom level as desired
                            centerCoordinate={[
                                location.coords.longitude,
                                location.coords.latitude,
                            ]}
                            animationMode="flyTo"
                            animationDuration={500}
                        />
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
    }
});

export default MapContainer