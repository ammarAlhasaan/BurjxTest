import React, {memo, useMemo} from 'react';
import {VictoryAxis, VictoryChart, VictoryLine} from 'victory-native';
import {View} from 'react-native';


const TrendChart = ({data, status}: { data: number[], status: 'error'|'success' }) => {
  const chartData = useMemo(() =>
      data.map((y, x) => ({x, y})),
    [data]
  );

  return (
    <View>
      <VictoryChart
        padding={0}
        height={50}
        width={150}
        domainPadding={0}
        animate={false}
      >
        <VictoryLine
          style={{
            data: {strokeWidth: 2, stroke: status === 'success' ? '#CDFF00' : '#FF3440'},
          }}
          data={chartData}
        />
        <VictoryAxis style={{axis: {stroke: 'none'}, tickLabels: {fill: 'none'}, grid: {stroke: 'none'}}}/>
      </VictoryChart>
    </View>
  );
};


export default memo(TrendChart);
