import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {BlurView} from '@react-native-community/blur';

interface BlurCardProps {
  children: React.ReactNode;
  blurAmount?: number;
}

const BlurCard = ({children, blurAmount = 15}: BlurCardProps) => {
  return (
    <>
      {Platform.OS === 'ios' && <BlurView
        style={styles.blurBackground}
        blurAmount={blurAmount}
        blurType="light"
        blurRadius={20}
      />}
      <View className="rounded-b-3xl overflow-hidden bg-black/60">
        {children}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  blurBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 22,
    elevation: Platform.OS === 'android' ? -1 : 0,
  },

});

export default BlurCard;
