import { BlurView } from "expo-blur";
import { FlipType, SaveFormat, manipulateAsync } from "expo-image-manipulator";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, View, Text } from "react-native";
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
import DetailsCard from "./components/DetailsCard/DetailsCard";
import { convertToObject } from "typescript";

type BoundingBoxResult = {
  top: number;
  left: number;
  width: number;
  height: number;
  photo: PhotoFile;
  detection: ObjectDetectionResult;
  sameIdRepetition: number;
  classification?: GptClassification;
};

const getObjectDetectionResult = (photo: PhotoFile) => {
  console.log("asking MLKit");
  return MlkitOdt.detectFromUri("file:///" + photo.path, {
    detectorMode: ObjectDetectorMode.STREAM,
    shouldEnableClassification: false,
    shouldEnableMultipleObjects: false,
  });
};

const getBoundingBox = (
  photo: PhotoFile,
  detection: ObjectDetectionResult | undefined,
  lastBox: BoundingBoxResult | undefined
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
    sameIdRepetition:
      lastBox?.detection.trackingID === detection.trackingID
        ? lastBox.sameIdRepetition + 1
        : 0,
    classification:
      lastBox?.detection.trackingID === detection.trackingID
        ? lastBox.classification
        : undefined,
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

type GptClassification = {
  label: string;
};

const uploadToGpt = async (imageBase64: string) => {
  // TODO
  // return { label: "TODO" };
  console.log("asking GPT");
  // console.log(imageBase64)
  // return

  const res = await fetch(
    "https://c895-2001-14bb-111-af71-7807-c07b-b06e-d28b.ngrok-free.app/generate-response",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: imageBase64,
      }),
    }
  );
  if (!res.ok) {
    console.log(res.status);
    throw new Error("Failed to upload to GPT");
  }

  console.log("got GPT response");

  return (await res.json()) as GptClassification;
};

const takeAndProcessPhoto = async (
  camera: Camera,
  lastBox: BoundingBoxResult | undefined,
  setBoundingBox: Dispatch<SetStateAction<BoundingBoxResult | undefined>>
) => {
  const photo = await camera.takePhoto({
    flash: "off",
    qualityPrioritization: "speed",
    enableShutterSound: false,
  });
  const result = await getObjectDetectionResult(photo);
  const boundingBox = getBoundingBox(photo, result[0], lastBox);

  setBoundingBox(boundingBox);
  console.log(boundingBox?.sameIdRepetition);

  // on second screenshot of the same object, take a screenshot and get GPT result from it
  if (boundingBox && boundingBox.sameIdRepetition === 1) {
    const image = await cropBoundingBox(boundingBox);

    console.log("got cropped image");
    console.log(image.base64.substring(0, 50) + "...");

    const classification = await uploadToGpt(image.base64);

    console.log(classification);

    setBoundingBox((b) => {
      // only set bounding box if it's still the same object we're tracking
      if (b.detection.trackingID !== boundingBox.detection.trackingID) return b;

      return {
        ...b,
        classification,
      };
    });
  }
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
        await takeAndProcessPhoto(ref.current!, boundingBox, setBoundingBox);

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

      <DetailsCard boundingBox={boundingBox} />
    </>
  );
};
