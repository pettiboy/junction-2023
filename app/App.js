import { StyleSheet } from "react-native";

import MlkitOdt, { ObjectDetectorMode } from "react-native-mlkit-odt";

import {
  Camera,
  CameraPermissionStatus,
  useFrameProcessor,
} from "react-native-vision-camera";

const CameraView = () => {
  const device = useCameraDevice("back");

  const frameProcessor = useFrameProcessor((frame) => {
    "worklet";
    if (frame.pixelFormat === "rgb") {
      const data = frame.toArrayBuffer();
      console.log(`Pixel at 0,0: RGB(${data[0]}, ${data[1]}, ${data[2]})`);
    }
  }, []);

  if (device == null) return <NoCameraErrorView />;
  return (
    <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
  );
};

export default function App() {
  const [cameraPermission, setCameraPermission] = useState();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
  }, []);

  console.log(
    `Re-rendering Navigator. Camera: ${cameraPermission} | Microphone: ${microphonePermission}`
  );

  if (cameraPermission == null || microphonePermission == null) {
    return null;
  }

  return <CameraView />;
}
