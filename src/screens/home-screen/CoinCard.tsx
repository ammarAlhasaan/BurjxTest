import React, {memo} from 'react';
import { Pressable, View} from 'react-native';

import {Badge, BadgeText, Card, Col, Row, Text} from '@/src/components/ui';

import {Coin} from '@/src/types';

import {formatPrice} from '@/src/utils/price';
import {CoinInfo, TrendChart} from '@/src/components/shared';

const CoinCard = ({item, onPress}: { item: Coin, onPress: () => void }) => (
  <Pressable onPress={onPress}>
    <Card size="md" variant="filled" className="rounded-3xl border border-background-light/10">
      <Col>
        <Row justifyContent="space-between" alignItems="flex-start" fullWidth>
          <CoinInfo image={item.image} name={item.name} symbol={item.symbol}/>
        </Row>
        <Row justifyContent="space-between" alignItems="flex-start" fullWidth>
          {!!item.sparkline?.length && (
            <TrendChart data={item.sparkline} status={item.priceChangePercentage24h > 0 ? 'success' : 'error'}/>
          )}
        </Row>
        <Row justifyContent="space-between" alignItems="flex-start">
          <Col>
            <Text>{formatPrice(item?.currentPrice)}</Text>
          </Col>
          <Col>
            <View>
              <Badge size="md" variant="solid" className="bg-white/10 rounded-md" action={item.priceChangePercentage24h > 0 ? 'success' : 'error'}>
                <BadgeText>{item?.priceChangePercentage24h?.toFixed(2)} %</BadgeText>
              </Badge>
            </View>
          </Col>
        </Row>
      </Col>
    </Card>
  </Pressable>
);

export default memo(CoinCard);
