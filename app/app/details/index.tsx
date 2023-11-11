import { useNavigation } from "expo-router";
import React from "react";
import { Dimensions, SafeAreaView, Text, View, ScrollView } from "react-native"
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

type Props = {}

const DetailsScreen = (props: Props) => {
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Bicycle',
            headerBackTitle: 'instagram',
        });
    }, [navigation]);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const chartConfig = {
        backgroundColor: "rgba(200, 200, 200, 0.2)",
        backgroundGradientFrom: "rgba(200, 200, 200, 0.5)",
        backgroundGradientTo: "rgba(220, 220, 220, 0.5)",
        decimalPlaces: 2,
        color: (opacity = 0.1) => `rgba(10, 10, 10, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16,
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "rgba(220, 220, 220, 1)",
        },
    };

    const style = {
        marginVertical: 8,
        borderRadius: 16,
    }

    const containerPadding = 20
    const chartHeight = 220

    return (
        <SafeAreaView style={{ marginHorizontal: containerPadding }}>
            <ScrollView>
                <View>
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
                </View>
                <View>
                    <PieChart
                        data={[
                            {
                                "name": "Seoul",
                                "population": 21500000,
                                "color": "rgba(210, 210, 210, 1)", //
                            },
                            {
                                "name": "Toronto",
                                "population": 2800000,
                                "color": "rgba(220, 220, 220, 1)",
                            },
                            {
                                "name": "Beijing",
                                "population": 527612,
                                "color": "rgba(180, 180, 180, 0.8)",
                            },
                            {
                                "name": "New York",
                                "population": 8538000,
                                "color": "rgba(200, 200, 200, 0.2)",
                            },
                            {
                                "name": "Moscow",
                                "population": 11920000,
                                "color": "rgba(160, 160, 160, 0.6)",
                            }
                        ]
                        }
                        width={windowWidth - (containerPadding * 2)}
                        height={chartHeight}
                        chartConfig={chartConfig}
                        accessor={"population"}
                        backgroundColor="rgba(200, 200, 200, 1)"
                        paddingLeft="0"
                        style={style}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DetailsScreen