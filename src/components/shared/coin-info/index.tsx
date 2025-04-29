import React, {memo} from 'react';
import {Avatar, AvatarFallbackText, AvatarImage, HStack, Text, VStack} from '@/src/components/ui';
import {Coin} from '@/src/types';


type CoinInfoProps = Pick<Coin, 'image' | 'name' | 'symbol'>
const CoinInfo = ({image, name, symbol}: CoinInfoProps) => (
  <HStack space="sm" justify="between">
    <Avatar size="md" className="bg-transparent">
      <AvatarFallbackText className="text-typography-500">{name}</AvatarFallbackText>
      <AvatarImage
        source={{
          uri: image,
        }}
      />
    </Avatar>
    <VStack justify="between">
      <Text>{name}</Text>
      <Text size="xs" className="uppercase">{symbol}</Text>
    </VStack>
  </HStack>
);
const arePropsEqual = (prevProps: CoinInfoProps, nextProps: CoinInfoProps) => {
  return (
    prevProps.image === nextProps.image &&
    prevProps.name === nextProps.name &&
    prevProps.symbol === nextProps.symbol
  );
};
export default memo(CoinInfo, arePropsEqual);
