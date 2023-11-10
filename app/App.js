import { StyleSheet } from "react-native";

export default function App() {
  const device = useCameraDevice("back");

  if (device == null) return <NoCameraErrorView />;
  return (
    <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
  );
}
