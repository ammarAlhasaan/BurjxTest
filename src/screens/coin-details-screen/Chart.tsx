import React, { useMemo } from 'react';
import { Dimensions, View } from 'react-native';
import {
  VictoryChart,
  VictoryCandlestick,
  VictoryZoomContainer,
  VictoryTheme,
  VictoryAxis,
} from 'victory-native';
import {useTheme} from '@/src/components/ui';

const E_WIDTH = Dimensions.get('screen').width - 20;
const E_HEIGHT = 300;
const MAX_VISIBLE_ITEMS = 20;

type CandleChartProps = { data: any[] };

const transformCoinHistoryData = (data: any[]) => {
  return data.map(item => ({
    open: item.usd.open,
    close: item.usd.close,
    low: item.usd.low,
    high: item.usd.high,
    x: new Date(item.date),
  }));
};

const Chart = ({ data }: CandleChartProps) => {
  const {getColor} = useTheme();

  const chartData = useMemo(() => {
    return data && data.length > 0 ? transformCoinHistoryData(data) : [];
  }, [data]);

  const defaultZoomDomain = useMemo(() => {
    if (!chartData.length) {return undefined;}
    const start = chartData.length > MAX_VISIBLE_ITEMS
      ? chartData[chartData.length - MAX_VISIBLE_ITEMS].x
      : chartData[0].x;
    const end = chartData[chartData.length - 1].x;
    return { x: [start, end] };
  }, [chartData]);

  return (
    <View style={{ width: E_WIDTH, height: E_HEIGHT }}>
      <VictoryChart
        padding={{ left: 10, right: 50, top: 10, bottom: 50 }} // make left small, right bigger for yAxis
        width={E_WIDTH}
        height={E_HEIGHT}
        theme={VictoryTheme.clean}
        scale={{ x: 'time' }}
        domainPadding={{ x: 10 }} // <-- solve candle cutting issue here!
        containerComponent={
          <VictoryZoomContainer
            zoomDimension="x"
            // @ts-ignore
            zoomDomain={defaultZoomDomain}
            allowZoom={false}
            allowPan={true}
            responsive={false}
          />
        }
      >
        {/* Hide X axis */}
        <VictoryAxis
          style={{
            axis: { stroke: 'transparent' },
            tickLabels: { fill: 'transparent' },
            grid: { stroke: 'none' },
          }}
        />

        {/* Y Axis on the right with dashed grid */}
        <VictoryAxis
          dependentAxis
          orientation="right"
          style={{
            axis: { stroke: 'transparent' },
            tickLabels: { fill: '#ccc', fontSize: 10 },
            grid: { stroke: 'rgba(255,255,255,0.1)', strokeDasharray: '4, 8' },
          }}
        />

        <VictoryCandlestick
          candleRatio={0.4} // wider
          candleWidth={8} // fixed width
          style={{
            data: {
              stroke: ({ datum }) => datum.close > datum.open ? getColor('primary500') : getColor('error500'),
              fill: ({ datum }) => datum.close > datum.open ? getColor('primary500') : getColor('error500'),
              strokeWidth: 2,
            },
          }}
          data={chartData}
        />
      </VictoryChart>
    </View>
  );
};

export default Chart;
