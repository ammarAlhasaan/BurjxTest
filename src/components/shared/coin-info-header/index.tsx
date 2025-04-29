import React, {memo} from 'react';
import {Avatar, AvatarFallbackText, AvatarImage, HStack, Text, VStack} from '@/src/components/ui';
import {Coin} from '@/src/types';


type CoinInfoHeaderProps = Pick<Coin, 'image' | 'name' | 'symbol'>
const CoinInfoHeader = ({image, name, symbol}: CoinInfoHeaderProps) => (
  <HStack space="sm" align="center">
    <Avatar size="sm" className="bg-transparent">
      <AvatarFallbackText className="text-typography-500">{name}</AvatarFallbackText>
      <AvatarImage
        source={{
          uri: image,
        }}
      />
    </Avatar>
    <VStack>
      <Text>{name} <Text className="uppercase">({symbol})</Text></Text>
    </VStack>
  </HStack>
);
const arePropsEqual = (prevProps: CoinInfoHeaderProps, nextProps: CoinInfoHeaderProps) => {
  return (
    prevProps.image === nextProps.image &&
    prevProps.name === nextProps.name &&
    prevProps.symbol === nextProps.symbol
  );
};
export default memo(CoinInfoHeader, arePropsEqual);
