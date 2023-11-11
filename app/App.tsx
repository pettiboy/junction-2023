import { useCallback, useEffect, useState } from "react";
import { Camera, CameraPermissionStatus } from "react-native-vision-camera";
import { InstagramOverlay } from "./src/InstagramOverlay";
import { CameraView } from "./src/CameraView";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DetailsScreen from "./src/components/DetailsScreen/DetailsScreen";

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
      {/* <CameraView /> */}
      {/* <InstagramOverlay /> */}
      <DetailsScreen />
    </SafeAreaProvider>
  );
}
