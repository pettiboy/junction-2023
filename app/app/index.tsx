import { useCallback, useEffect, useState } from "react";
import { Camera, CameraPermissionStatus } from "react-native-vision-camera";
import { CameraView } from "../src/CameraView";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DetailsScreen from "./details";
import { InstagramOverlay } from "./instagram/instagram";

export default function App() {
    const [cameraPermission, setCameraPermission] =
        useState<CameraPermissionStatus>();

    useEffect(() => {
        Camera.getCameraPermissionStatus().then(setCameraPermission);
    }, []);

    if (cameraPermission == null) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <InstagramOverlay />
            {/* <DetailsScreen /> */}
        </SafeAreaProvider>
    );
}
