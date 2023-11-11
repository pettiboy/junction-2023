export default {
  name: "Junction 2023",
  slug: "junction2023",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.yonom.junction2023",
    infoPlist: {
      NSCameraUsageDescription: "$(PRODUCT_NAME) needs access to your Camera.",
    },
  },
  android: {
    package: "com.yonom.junction2023",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    permissions: ["android.permission.CAMERA"],
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: [
    [
      "react-native-vision-camera",
      {
        cameraPermissionText: "$(PRODUCT_NAME) needs access to your Camera.",
      },
    ],
    [
      "expo-location",
      {
        locationWhenInUsePermission: "Show current location on map.",
      },
    ],
    [
      "@rnmapbox/maps",
      {
        RNMapboxMapsImpl: "mapbox",
        RNMapboxMapsDownloadToken: process.env.MAPBOX_DOWNLOAD_KEY,
      },
    ],
    "expo-router",
  ],
  extra: {
    eas: {
      projectId: "d15f3a65-ecf5-49c7-9cc7-9075cc02c726",
    },
  },
};
