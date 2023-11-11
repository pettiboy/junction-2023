import { BlurView } from "expo-blur";
import { View, Text, TouchableOpacity } from "react-native";
import { BoundingBoxResult } from "../../BoundingBoxResult";
import { FC, useDeferredValue } from "react";
import { Link } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type Props = {
  boundingBox: BoundingBoxResult;
};

const DetailsCard: FC<Props> = ({ boundingBox }) => {
  const { classification } = boundingBox;

  const parentHeight = useSharedValue(0);
  if (Math.abs(parentHeight.value - boundingBox.height) > 100)
    parentHeight.value = boundingBox.height - 5;
  const style = useAnimatedStyle(() => {
    return {
      width: "100%",
      height: 5,
      backgroundColor: "#fff",
      top: withRepeat(
        withSequence(
          withTiming(parentHeight.value, { duration: 500 }),
          withTiming(0, { duration: 500 })
        ),
        -1,
        true
      ),
    };
  }, []);

  const border = (
    <View
      style={{
        position: "absolute",
        // borderWidth: 2,
        // borderColor: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        top: boundingBox.top,
        left: boundingBox.left,
        width: boundingBox.width,
        height: boundingBox.height,
      }}
    >
      <Animated.View style={style}></Animated.View>
    </View>
  );
  if (!classification) return border;

  const center = {
    x: boundingBox.left + boundingBox.width / 2,
    y: boundingBox.top + boundingBox.height / 2,
    width: 200,
    height: 180,
  };

  return (
    <>
      {/* {border} */}
      <View
        style={{
          position: "absolute",
          top: center.y,
          left: center.x,

          width: center.width,
          height: center.height,

          borderRadius: 16,
          overflow: "hidden",
          transform: [
            { translateX: -center.width / 2 },
            { translateY: -center.height / 2 },
            { scale: boundingBox.width / center.width },
          ],
        }}
      >
        <BlurView
          style={{
            // position: "absolute",
            flex: 1,
          }}
          tint="light"
          intensity={15}
        >
          {/* Card content */}
          <Link href="/details" style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                padding: 10,
                alignItems: "center",
                width: center.width,
                height: center.height,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: 8,
                  color: "#fff",
                }}
              >
                {classification.item_name}
              </Text>
              <Text style={{ fontSize: 16, color: "#fff" }}>
                recycle {classification.saved_CO2_kg} kg CO2
              </Text>
              <Text style={{ fontSize: 16, marginBottom: 8, color: "#fff" }}>
                {classification.comparision}
              </Text>
              <Text style={{ fontSize: 16, marginBottom: 16, color: "#fff" }}>
                {classification.saved_CO2_kg.toFixed()} Points
              </Text>
              <View
                style={{
                  backgroundColor: "#97d197",
                  padding: 8,
                  alignSelf: "stretch",
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14 }}>Details...</Text>
              </View>
            </View>
          </Link>
        </BlurView>
      </View>
    </>
  );
};

export default DetailsCard;
