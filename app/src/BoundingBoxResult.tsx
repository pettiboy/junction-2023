import { ObjectDetectionResult } from "react-native-mlkit-odt";
import { PhotoFile } from "react-native-vision-camera";

export type GptClassification = {
  item_name: string;
  saved_CO2_kg: number;
  comparision: string;
};

export type BoundingBoxResult = {
  top: number;
  left: number;
  width: number;
  height: number;
  photo: PhotoFile;
  detection: ObjectDetectionResult;
  sameIdRepetition: number;
  classification?: GptClassification;
};
