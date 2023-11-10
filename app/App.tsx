import { useEffect, useState } from "react";
import { Camera, CameraPermissionStatus } from "react-native-vision-camera";
import { InstagramOverlay } from "./src/InstagramOverlay";
import { CameraView } from "./src/CameraView";

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
    <>
      {/* <CameraView /> */}
      <InstagramOverlay />
    </>
  );
}
