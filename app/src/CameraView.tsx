import { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MlkitOdt, {
  ObjectDetectionResult,
  ObjectDetectorMode,
} from "react-native-mlkit-odt";
import { Camera, useCameraDevice } from "react-native-vision-camera";

export const CameraView = () => {
  const device = useCameraDevice("back");
  const ref = useRef<Camera>(null);
  const [boundingBoxes, setBoundingBoxes] = useState<ObjectDetectionResult[]>();

  useEffect(() => {
    let ended = false;
    const runLoop = () => {
      setTimeout(async () => {
        if (ended) return;
        const photo = await ref.current.takePhoto({
          flash: "off",
          qualityPrioritization: "speed",
          enableShutterSound: false,
        });
        console.log(Dimensions.get("window"), photo);
        const result = await MlkitOdt.detectFromUri("file:///" + photo.path, {
          detectorMode: ObjectDetectorMode.SINGLE_IMAGE,
          shouldEnableClassification: false,
          shouldEnableMultipleObjects: false,
        });
        console.log(result);
        setBoundingBoxes(result);
        // await FileSystem.deleteAsync(photo.path);
        runLoop();
      }, 1000);
    };
    runLoop();
    return () => {
      ended = true;
    };
  }, []);

  if (device == null) return null;
  return (
    <>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        ref={ref}
        photo={true}
      />
      {boundingBoxes?.map((box, index) => (
        <View
          key={index}
          style={{
            top:
              (box.bounding.originX / 1920) * Dimensions.get("window").height,
            left:
              Dimensions.get("window").width -
              (box.bounding.height / 1080) * Dimensions.get("window").width -
              (box.bounding.originY / 1080) * Dimensions.get("window").width,
            height:
              (box.bounding.width / 1920) * Dimensions.get("window").height,
            width:
              (box.bounding.height / 1080) * Dimensions.get("window").width,
            borderWidth: 2,
            borderColor: "red",
          }}
        />
      ))}
    </>
  );
};
