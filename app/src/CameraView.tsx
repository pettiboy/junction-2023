import { FlipType, SaveFormat, manipulateAsync } from "expo-image-manipulator";
import { useEffect, useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
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
  photo: PhotoFile;
  detection: ObjectDetectionResult;
};

const getObjectDetectionResult = (photo: PhotoFile) => {
  return MlkitOdt.detectFromUri("file:///" + photo.path, {
    detectorMode: ObjectDetectorMode.STREAM,
    shouldEnableClassification: false,
    shouldEnableMultipleObjects: false,
  });
};

const getBoundingBox = (
  photo: PhotoFile,
  detection: ObjectDetectionResult | undefined
): BoundingBoxResult | undefined => {
  if (!detection) return;
  const { bounding } = detection;

  const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
  const { width: photoWidth, height: photoHeight } = photo;
  const normalized = {
    top: bounding.originX / photoWidth,
    leftEdgeFromRight: bounding.originY / photoHeight,
    height: bounding.width / photoWidth,
    width: bounding.height / photoHeight,
  };
  return {
    photo,
    detection,
    top: normalized.top * windowHeight,
    left:
      windowWidth -
      normalized.width * windowWidth -
      normalized.leftEdgeFromRight * windowWidth,
    height: normalized.height * windowHeight,
    width: normalized.width * windowWidth,
  };
};

const cropBoundingBox = async ({ photo, detection }: BoundingBoxResult) => {
  const originY = Math.max(
    0,
    detection.bounding.originX - detection.bounding.width * 0.1
  );
  const originX = Math.max(
    0,
    photo.height -
      detection.bounding.height -
      detection.bounding.originY -
      detection.bounding.height * 0.1
  );
  const height = Math.min(
    photo.width - originX,
    detection.bounding.width * 1.2
  );
  const width = Math.min(
    photo.height - originY,
    detection.bounding.height * 1.2
  );

  const manipResult = await manipulateAsync(
    photo.path,
    [
      {
        crop: {
          originX,
          originY,
          width,
          height,
        },
      },
    ],
    { base64: true, compress: 1, format: SaveFormat.JPEG }
  );
  return manipResult;
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

  const [image, setImage] = useState<{
    uri: string;
    width: number;
    height: number;
  }>();
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

        if (boundingBox) {
          const image = await cropBoundingBox(boundingBox);
          setImage(image);
        }

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
      {/* {image && (
        <View>
          <Image
            source={{ uri: image.uri }}
            width={image.width / 3}
            height={image.height / 3}
          />
        </View>
      )} */}
    </>
  );
};
