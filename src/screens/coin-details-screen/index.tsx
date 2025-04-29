import * as React from 'react';
import {selectCoinById, useGetCoinHistoryQuery} from '@/src/state/slices/coinSlice';
import {useRoute} from '@react-navigation/native';
import Chart from '@/src/screens/coin-details-screen/Chart';
import {useAppSelector} from '@/src/state/hooks';
import {formatPrice} from '@/src/utils/price';
import {View} from 'react-native';
import {Coin} from '@/src/types';
import {BlurCard, CoinInfoHeader, GlowingBackground, Header} from '@/src/components/shared';
import {Badge, BadgeText, Col, Row, Text, ToggleButtonGroup} from '@/src/components/ui';


const CoinDetails = ({coin}: { coin: Coin }) => {
  const [days, setDays] = React.useState('1');

  const {data} = useGetCoinHistoryQuery({productId: coin.productId, days}, {
    pollingInterval: 10000,
  });

  const handleTabChange = (tabValue: string) => {
    setDays(tabValue); // Update the selected tab value
  };

  return (
    <View className="w-full">
      <View className="px-3">
        <Col justifyContent="flex-start" alignItems={'flex-start'}>
          <Text size="4xl">
            {formatPrice(coin?.currentPrice)}
          </Text>
          <Badge size="md" variant="solid" className="bg-white/10 rounded-md"
                 action={coin?.priceChangePercentage24h > 0 ? 'success' : 'error'}>
            <BadgeText>{coin?.priceChangePercentage24h?.toFixed(2)} %</BadgeText>
          </Badge>
        </Col>
      </View>

      {data && <Chart data={data}/>}
      <Row justifyContent="center">
        <ToggleButtonGroup
          onTabChange={handleTabChange}
          tabs={[
            {
              value: '1',
              label: '1D',
            },
            {
              value: '7',
              label: '1W',
            },
            {value: '30', label: '1M'},
            {value: '365', label: '1Y'},
            {value: 'max', label: 'ALL'},
          ]}/>
      </Row>
    </View>
  );
};

const CoinDetailsScreen = () => {
  const route = useRoute<any>();
  const coin = useAppSelector((state) => selectCoinById(state, route.params.id));

  return (
    <>
      <GlowingBackground/>
      <BlurCard>
        {coin && <Header
          title={<CoinInfoHeader
            image={coin.image}
            name={coin.name}
            symbol={coin.symbol}
          />}
          showBack
        />}

        <View className="py-5">
          {coin && <CoinDetails coin={coin}/>}
        </View>
      </BlurCard>
    </>
  );
};

export default CoinDetailsScreen;
