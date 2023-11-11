import { BlurView } from "expo-blur";
import { View, Text, TouchableOpacity } from "react-native";
import { BoundingBoxResult } from "../../BoundingBoxResult";
import { FC } from "react";
import { Link } from "expo-router";

type Props = {
  boundingBox: BoundingBoxResult;
};

const DetailsCard: FC<Props> = ({ boundingBox }) => {
  const { classification } = boundingBox;

  if (!classification) return null;

  const center = {
    x: boundingBox.left + boundingBox.width / 2,
    y: boundingBox.top + boundingBox.height / 2,
    width: 200,
    height: 180,
  };

  return (
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
        <Link href="/details">
          <View style={{ padding: 10, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              {classification.item_name}
            </Text>
            <Text style={{ fontSize: 16 }}>
              recycle {classification.saved_CO2_kg} kg CO2
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 8 }}>
              {classification.comparision}
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 8 }}>
              {classification.saved_CO2_kg.toFixed()} Points
            </Text>
            <View
              style={{
                backgroundColor: "#006CA5",
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
  );
};

export default DetailsCard;
