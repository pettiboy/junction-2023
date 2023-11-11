import { StyleSheet, View, Text, Image } from "react-native";
import { CameraView } from "./CameraView";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const InstagramOverlay = () => {
  const { top, bottom, left, right } = useSafeAreaInsets();
  return (
    <View
      style={{ paddingBottom: bottom, paddingLeft: left, paddingRight: right }}
    >
      {/* the top conatiner containing the camera */}
      <View
        style={{
          // backgroundColor: 'red',
          height: "90%",
          width: "100%",
          borderRadius: 20,
          position: "relative",
        }}
      >
        <CameraView />
        {/* the top container */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
            marginHorizontal: 20,
            paddingTop: top,
          }}
        >
          <Image
            source={require("../assets/insta/icons/close.png")}
            fadeDuration={0}
            style={styles.topContainerIcon}
          />
          <Image
            source={require("../assets/insta/icons/flash.png")}
            fadeDuration={0}
            style={styles.topContainerIcon}
          />
          <Image
            source={require("../assets/insta/icons/settings.png")}
            fadeDuration={0}
            style={styles.topContainerIcon}
          />
        </View>

        {/* camera shuttur button */}
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle}>
            <View style={styles.innerInnerCircle}></View>
          </View>
        </View>
      </View>

      {/* the bottom container */}
      <View
        style={{
          backgroundColor: "transparent",
          height: "10%",
          width: "100%",
          borderRadius: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/insta/photo.avif")}
          fadeDuration={0}
          style={{
            width: 30,
            height: 30,
            borderRadius: 10,
            borderColor: "black",
            borderWidth: 3,
          }}
        />

        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              // fontWeight: "bold",
              marginRight: 10,
            }}
          >
            POST
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              marginRight: 10,
            }}
          >
            STORY
          </Text>
          <Text
            style={{
              fontSize: 15,
            }}
          >
            REEL
          </Text>
        </View>

        <View>
          <Image
            source={require("../assets/insta/icons/refresh.png")}
            fadeDuration={0}
            style={{ width: 25, height: 25 }}
          />
        </View>
      </View>
    </View>
  );
};

const circleSize = 50;
const styles = StyleSheet.create({
  topContainerIcon: { width: 25, height: 25, tintColor: "white" },

  outerCircle: {
    width: circleSize + 4,
    height: circleSize + 4,
    borderRadius: circleSize,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: "45%",
  },
  innerCircle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize,
    backgroundColor: "black",
  },
  innerInnerCircle: {
    width: circleSize - 4,
    height: circleSize - 4,
    marginTop: 2,
    marginLeft: 2,
    borderRadius: circleSize,
    backgroundColor: "white",
  },
});
