import { useEffect, useState } from "react";

import * as FileSystem from "expo-file-system";
import {
  Camera,
  CameraPermissionStatus,
  useCameraFormat,
} from "react-native-vision-camera";
import { InstagramOverlay } from "./InstagramOverlay";
import { CameraView } from "./CameraView";

export default function App() {
  const [cameraPermission, setCameraPermission] =
    useState<CameraPermissionStatus>();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
  }, []);

  console.log(`Re-rendering Navigator. Camera: ${cameraPermission}`);

  if (cameraPermission == null) {
    return null;
  }

  return (
    <>
      <CameraView />
      <InstagramOverlay />
    </>
  );
}
