import React, {memo} from 'react';
import {Pressable, View} from 'react-native';
import {Badge, BadgeText, Card, Col, Row, Text} from '@/src/components/ui';
import {Coin} from '@/src/types';
import {formatPrice} from '@/src/utils/price';
import {CoinInfo, TrendChart} from '@/src/components/shared';

const CoinRow = ({item, onPress}: { item: Coin, onPress: () => void }) => (
  <Pressable onPress={onPress}>
    <Card size="md" variant="filled" >
      <Col >
        <Row justifyContent="space-between" alignItems="flex-start" fullWidth>
          <CoinInfo image={item.image} name={item.name} symbol={item.symbol}/>
          <View>
            <Badge size="md" variant="solid" className="bg-white/10 rounded-md" action={item.priceChangePercentage24h > 0 ? 'success' : 'error'}>
              <BadgeText>{item?.priceChangePercentage24h?.toFixed(2)} %</BadgeText>
            </Badge>
          </View>
        </Row>
        <Row justifyContent="space-between" alignItems="flex-end" fullWidth>
          <Text>{formatPrice(item?.currentPrice)}</Text>
          {!!item.sparkline?.length && (
            <TrendChart data={item.sparkline} status={item.priceChangePercentage24h > 0 ? 'success' : 'error'}/>
          )}
        </Row>
      </Col>
    </Card>
  </Pressable>
);

export default memo(CoinRow);
