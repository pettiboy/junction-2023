import { BlurView } from 'expo-blur'
import { View, Text } from 'react-native'

type Props = {
    boundingBox: any
}

const DetailsCard = ({ boundingBox }: Props) => {
    return (
        boundingBox ? (
            <>
                <View
                    style={{
                        position: "absolute",
                        top: boundingBox.top,
                        left: boundingBox.left,
                        width: boundingBox.width,
                        height: boundingBox.height,
                    }}
                />
                {/* Frosted glass card */}
                <View
                    style={{
                        position: "absolute",

                        //--------------------- on the side of the object
                        // top: boundingBox.top,
                        // left: boundingBox.left + boundingBox.width,
                        // width: 150,
                        // height: "auto",

                        //--------------------- covering the object
                        top: boundingBox.top,
                        left: boundingBox.left,
                        width: boundingBox.width,
                        height: boundingBox.height,

                        borderRadius: 10, // Adjust the value as needed
                        overflow: "hidden", // This is important for the borderRadius to take effect
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
                            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
                                Bicycle
                            </Text>
                            <Text style={{ fontSize: 14, marginBottom: 5 }}>
                                Recyclability: 3/5
                            </Text>
                            <Text style={{ fontSize: 14, marginBottom: 5 }}>
                                Materials to recycle: ???
                            </Text>
                            <Text style={{ fontSize: 14 }}>
                                How to recycle: Go to ...
                            </Text>
                        </View>
                    </BlurView>
                </View>
            </>
        ) : null
    )
}

export default DetailsCard