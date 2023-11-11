import { Link, router, useNavigation } from "expo-router";
import React from "react";
import {
  Dimensions,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
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

type Props = {};

const DetailsScreen = (props: Props) => {
  const navigation = useNavigation();

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

  const points = 15;

  return (
    <SafeAreaView style={{ marginHorizontal: containerPadding }}>
      <ScrollView>
        {/* header */}
        <View style={{ display: "flex", flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => router.replace("/wallet")}
            style={{
              position: "relative",
              flex: 0.6,
              height: chartHeight + containerPadding,
            }}
          >
            <ProgressChart
              data={{
                labels: ["Swim"],
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
              }}
            >
              Points
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
              }}
            >
              15
            </Text>
            <Text style={{ textAlign: "center" }}>kg of</Text>
            <Text
              style={{ textAlign: "center", fontSize: 24, marginVertical: 10 }}
            >
              CO2
            </Text>
            <Text style={{ textAlign: "center" }}>reduced</Text>
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
          <PieChart
            data={[
              {
                name: "Lithium",
                population: 25,
                color: "#4CAF50", // Green color
              },
              {
                name: "Cobalt",
                population: 10,
                color: "#689F38", // Dark green color
              },
              {
                name: "Nickel",
                population: 15,
                color: "#8BC34A", // Light green color
              },
              {
                name: "Copper",
                population: 20,
                color: "#CDDC39", // Lime color
              },
              {
                name: "Aluminium",
                population: 30,
                color: "#FFEB3B", // Yellow color
              },
            ]}
            width={windowWidth - containerPadding * 2 - 20}
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
        </View>

        <View
          style={{
            backgroundColor: chartConfig.backgroundGradientTo,
            borderRadius: 20,
            padding: 15,
            marginTop: 10,

          }}
        >
          <Text style={{ fontSize: 36, marginBottom: 10 }}>
            Why recycle?
          </Text>
          <Text style={{ fontSize: 18 }}>
            Saves CRM (Critical Raw Materials) extraction by 30%, prevents 80 kWh energy use, and cuts 15 kg CO2 emissions per ton, forging a sustainable future.
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
          <Text style={{ fontSize: 36, marginBottom: 10 }}>How to recycle</Text>
          <Text style={{ fontSize: 18 }}>
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

export default DetailsScreen;
