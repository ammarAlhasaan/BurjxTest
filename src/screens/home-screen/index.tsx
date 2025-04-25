import * as React from 'react';
import {Text, View} from 'react-native';
import CoinList from '@/src/screens/home-screen/CoinList.tsx';

const HomeScreen = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <CoinList />
    </View>
  );
};

export default HomeScreen;
