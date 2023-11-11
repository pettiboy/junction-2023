import { BlurView } from "expo-blur";
import { View, Text } from "react-native";
import { BoundingBoxResult } from "../../BoundingBoxResult";
import { FC } from "react";

type Props = {
  boundingBox: BoundingBoxResult;
};

const DetailsCard: FC<Props> = ({ boundingBox }) => {
  const { classification } = boundingBox;

  if (!classification) return null;

  return (
    <View
      style={{
        position: "absolute",
        top: boundingBox.top - 50,
        left: boundingBox.left - 50,
        width: boundingBox.width + 50,
        height: boundingBox.height + 50,

        borderRadius: 16,
        overflow: "hidden",
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
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 12, marginBottom: 8 }}>Recycle Impact</Text>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>
            {classification.item_name}
          </Text>
          <Text style={{ fontSize: 14 }}>
            {classification.saved_CO2_kg} kg CO2 saved
          </Text>
          <Text style={{ fontSize: 14, marginBottom: 8 }}>
            equivalent to {classification.comparision}
          </Text>
          <Text style={{ fontSize: 18, marginBottom: 8 }}>
            {classification.saved_CO2_kg.toFixed()} Points
          </Text>
          <View style={{ backgroundColor: '#006CA5'}}>
            <Text style={{ fontSize: 14 }}>Details...</Text>
          </View>
        </View>
      </BlurView>
    </View>
  );
};

export default DetailsCard;
