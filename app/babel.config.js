module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      "react-native-reanimated/plugin",
      "react-native-worklets-core/plugin",
      "expo-router/babel",
    ],
    presets: ["babel-preset-expo"],
  };
};
