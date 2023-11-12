import { Link, router, useNavigation } from "expo-router";
import React, { useContext, useEffect } from "react";
import {
  Dimensions,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import MapContainer from "../../src/components/MapContainer/MapContainer";
import MaterialContext from "../../src/contexts/MaterialContext";

type Props = {};

const DetailsScreen = (props: Props) => {
  const { currentObjectInfo } = useContext(MaterialContext)

  const [resourcesChartData, setResourcesChartData] = React.useState<OutputData[]>([]);

  const navigation = useNavigation();


  useEffect(() => {
    if (!currentObjectInfo) return

    (async () => {
      const res = await fetch(
        `https://1758-2001-14bb-111-af71-7129-ba19-4a5b-3a55.ngrok-free.app/get-item-recycle-info?item_name=${currentObjectInfo.item_name}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        console.log(res.status);
        throw new Error("Failed to upload to GPT");
      }

      console.log("got GPT response");

      const json = await res.json() as ResourcesResponseData;

      setResourcesChartData(transformData(json))
      console.log(json, "rm data json");
    })()
  }, [])



  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Power Bank (Redmi)",
      headerBackTitle: "Instagram",
    });
  }, [navigation]);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const chartConfig = {
    backgroundColor: "#EAF9E1", // Light green background
    backgroundGradientFrom: "#C0E3C0", // Light green gradient start
    backgroundGradientTo: "#C0E3C0", // Darker green gradient end
    decimalPlaces: 2,
    color: (opacity = 0.8) => `rgba(0, 100, 0, ${opacity})`, // Green color
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#008000", // Dark green stroke
    },
  };

  const style = {
    marginVertical: 8,
    borderRadius: 16,
  };

  const containerPadding = 20;
  const chartHeight = 220;

  const points = currentObjectInfo?.saved_CO2_kg || 0;


  const transformData = (inputData: ResourcesResponseData): OutputData[] => {
    const colorPalette = ["#4CAF50", "#689F38", "#8BC34A", "#CDDC39", "#FFEB3B"];

    return inputData.rm_data.map((item, index) => ({
      name: item.material.length > 7 ? item.material.slice(0, 7) + "..." : item.material,
      population: item.percentage,
      color: colorPalette[index] || "#000000", // Use a default color if colorPalette is exhausted
    }));
  };

  return (
    <SafeAreaView style={{ marginHorizontal: containerPadding }}>
      <ScrollView>
        {/* header */}
        <View style={{ display: "flex", flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => router.push("/wallet")}
            style={{
              position: "relative",
              flex: 0.6,
              height: chartHeight + containerPadding,
            }}
          >
            <ProgressChart
              data={{
                labels: ["Points"],
                data: [points / 100],
              }}
              width={windowWidth / 2}
              height={chartHeight}
              strokeWidth={16}
              radius={72}
              chartConfig={chartConfig}
              hideLegend={true}
              style={{ ...style, paddingBottom: 30 }}
            />

            <Text
              style={{
                position: "absolute",
                top: "44%",
                left: "40%",
                fontSize: 36,
                fontFamily: "Poppins_500Medium",
              }}
            >
              {points}
            </Text>
            <Text
              style={{
                position: "absolute",
                top: "35%",
                left: "42%",
                fontSize: 12,
                fontFamily: "Poppins_500Medium",
              }}
            >
              points
            </Text>
          </TouchableOpacity>
          <View
            style={{
              marginLeft: 10,
              marginVertical: 10,
              padding: 10,
              backgroundColor: chartConfig.backgroundGradientTo,
              borderRadius: style.borderRadius,
              flex: 0.4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 48,
                fontWeight: "bold",
                marginBottom: 10,
                fontFamily: "Poppins_700Bold",
              }}
            >
              {points}
            </Text>
            <Text
              style={{ textAlign: "center", fontFamily: "Poppins_500Medium" }}
            >
              kg of
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 24,
                marginVertical: 10,
                fontFamily: "Poppins_500Medium",
              }}
            >
              CO2
            </Text>
            <Text
              style={{ textAlign: "center", fontFamily: "Poppins_500Medium" }}
            >
              reduced
            </Text>
          </View>
        </View>

        {/* pie chart */}
        <View
          style={{
            backgroundColor: chartConfig.backgroundGradientTo,
            borderRadius: 20,
            paddingLeft: 10,
          }}
        >
          {resourcesChartData.length < 1 ? <View> <PieChart
            data={resourcesChartData}
            width={windowWidth - containerPadding * 2 - 30}
            height={chartHeight}
            chartConfig={{
              ...chartConfig,
            }}
            backgroundColor={chartConfig.backgroundGradientTo}
            accessor="population"
            paddingLeft="10"
            style={{
              borderRadius: 20,
              paddingLeft: 10,
            }}
          />

          </View> : <View>
            <ActivityIndicator style={{ transform: [{ scale: 2 }], margin: 20, }} color={"darkgreen"} size={50} /><Text style={{ textAlign: "center", marginBottom: 20 }}>Crunching in the latest data for you</Text>
          </View>}
        </View>

        <View
          style={{
            backgroundColor: chartConfig.backgroundGradientTo,
            borderRadius: 20,
            padding: 15,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 36,
              marginBottom: 10,
              fontFamily: "Poppins_500Medium",
            }}
          >
            Why recycle?
          </Text>
          <Text style={{ fontSize: 18, fontFamily: "Poppins_500Medium" }}>
            Saves CRM (Critical Raw Materials) extraction by 30%, prevents 80
            kWh energy use, and cuts 15 kg CO2 emissions per ton, forging a
            sustainable future.
          </Text>
        </View>

        <View
          style={{
            backgroundColor: chartConfig.backgroundGradientTo,
            borderRadius: 20,
            padding: 15,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              fontSize: 36,
              marginBottom: 10,
              fontFamily: "Poppins_500Medium",
            }}
          >
            How to recycle
          </Text>
          <Text style={{ fontSize: 18, fontFamily: "Poppins_500Medium" }}>
            Bring it to the nearest recycling station
          </Text>
        </View>

        {/* <View>
                    <LineChart
                        data={{
                            labels: ["January", "February", "March", "April", "May", "June"],
                            datasets: [
                                {
                                    data: [
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100
                                    ]
                                }
                            ]
                        }}
                        width={windowWidth - containerPadding * 2}
                        height={chartHeight}
                        yAxisLabel="$"
                        yAxisSuffix="k"
                        yAxisInterval={1}
                        chartConfig={chartConfig}
                        bezier
                        style={style}
                    />
                </View>
                <View>
                    <ProgressChart
                        data={{
                            labels: ["Swim", "Bike", "Run"],
                            data: [0.4, 0.6, 0.8]
                        }}
                        width={windowWidth - (containerPadding * 2)}
                        height={chartHeight}
                        strokeWidth={16}
                        radius={32}
                        chartConfig={chartConfig}
                        hideLegend={false}
                        style={style}
                    />
                </View>
                <View>
                    <BarChart
                        style={style}
                        data={{
                            labels: ["A", "B", "C", "D", "E", "F"],
                            datasets: [
                                {
                                    data: [20, 45, 28, 80, 99, 43]
                                }
                            ]
                        }}
                        width={windowWidth - (containerPadding * 2)}
                        height={220}
                        yAxisLabel="$"
                        yAxisSuffix="k"
                        chartConfig={chartConfig}
                    />
                </View> */}

        <View style={{ marginTop: 10 }}>
          <MapContainer />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


interface ResourcesResponseData {
  rm_data: {
    material: string;
    percentage: number;
  }[];
}

interface OutputData {
  name: string;
  population: number;
  color: string;
}

export default DetailsScreen;
