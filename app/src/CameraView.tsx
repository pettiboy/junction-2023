import { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MlkitOdt, {
  ObjectDetectionResult,
  ObjectDetectorMode,
} from "react-native-mlkit-odt";
import {
  Camera,
  PhotoFile,
  useCameraDevice,
  useCameraFormat,
} from "react-native-vision-camera";

type BoundingBoxResult = {
  top: number;
  left: number;
  width: number;
  height: number;
};

const getObjectDetectionResult = (photo: PhotoFile) => {
  return MlkitOdt.detectFromUri("file:///" + photo.path, {
    detectorMode: ObjectDetectorMode.SINGLE_IMAGE,
    shouldEnableClassification: false,
    shouldEnableMultipleObjects: false,
  });
};

const getBoundingBox = (
  photo: PhotoFile,
  res: ObjectDetectionResult | undefined
) => {
  if (!res) return;
  const bounding = res.bounding;

  const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
  const { width: photoWidth, height: photoHeight } = photo;
  const normalized = {
    top: bounding.originX / photoWidth,
    leftEdgeFromRight: bounding.originY / photoHeight,
    height: bounding.width / photoWidth,
    width: bounding.height / photoHeight,
  };
  return {
    top: normalized.top * windowHeight,
    left:
      windowWidth -
      normalized.width * windowWidth -
      normalized.leftEdgeFromRight * windowWidth,
    height: normalized.height * windowHeight,
    width: normalized.width * windowWidth,
  };
};

export const CameraView = () => {
  const device = useCameraDevice("back");
  const format = useCameraFormat(device, [
    {
      photoResolution: {
        width: 1920,
        height: 1080,
      },
    },
  ]);
  const ref = useRef<Camera>(null);
  const [boundingBox, setBoundingBox] = useState<BoundingBoxResult>();

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
        const result = await getObjectDetectionResult(photo);
        const boundingBox = getBoundingBox(photo, result[0]);
        setBoundingBox(boundingBox);

        // await FileSystem.deleteAsync(photo.path);

        runLoop();
      }, 1000);
    };
    runLoop();
    return () => {
      ended = true;
    };
  }, []);

  return (
    <>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        format={format}
        isActive={true}
        ref={ref}
        photo={true}
        orientation="portrait"
      />
      {boundingBox && (
        <View
          style={{
            position: "absolute",
            top: boundingBox.top,
            left: boundingBox.left,
            width: boundingBox.width,
            height: boundingBox.height,
            borderWidth: 2,
            borderColor: "red",
          }}
        />
      )}
      {/* {boundingBoxes?.map((box, index) => (
        <View
          key={index}
          style={{
            borderWidth: 2,
            borderColor: "red",
          }}
        />
      ))} */}
    </>
  );
};
