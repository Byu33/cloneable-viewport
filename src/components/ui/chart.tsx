import React from 'react';
import { View, StyleSheet, ViewStyle, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

type ChartType = 'line' | 'bar' | 'pie';

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    color?: (opacity: number) => string;
    colors?: ((opacity: number) => string)[];
    strokeWidth?: number;
  }[];
  legend?: string[];
}

interface ChartProps {
  type: ChartType;
  data: ChartData;
  width?: number;
  height?: number;
  containerStyle?: ViewStyle;
  chartConfig?: {
    backgroundColor?: string;
    backgroundGradientFrom?: string;
    backgroundGradientTo?: string;
    decimalPlaces?: number;
    color?: (opacity: number) => string;
    labelColor?: (opacity: number) => string;
    style?: {
      borderRadius?: number;
    };
    propsForDots?: {
      r?: string;
      strokeWidth?: string;
      stroke?: string;
    };
  };
}

const defaultChartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

export function Chart({
  type,
  data,
  width = Dimensions.get('window').width - 32,
  height = 220,
  containerStyle,
  chartConfig = defaultChartConfig,
}: ChartProps) {
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart
            data={data}
            width={width}
            height={height}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        );
      case 'bar':
        return (
          <BarChart
            data={data}
            width={width}
            height={height}
            chartConfig={chartConfig}
            style={styles.chart}
            yAxisLabel=""
            yAxisSuffix=""
          />
        );
      case 'pie':
        return (
          <PieChart
            data={data.datasets[0].data.map((value, index) => ({
              name: data.labels[index],
              value,
              color: data.datasets[0].colors?.[index] || `rgba(0, 0, 0, ${0.1 * (index + 1)})`,
              legendFontColor: '#7F7F7F',
              legendFontSize: 12,
            }))}
            width={width}
            height={height}
            chartConfig={chartConfig}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="15"
            style={styles.chart}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {renderChart()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
