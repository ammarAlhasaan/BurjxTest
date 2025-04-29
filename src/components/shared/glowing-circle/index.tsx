import React, {useEffect} from 'react';
import {Dimensions, ImageBackground, Platform, StyleSheet, View} from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {BlurView} from '@react-native-community/blur';
const SCREEN_WIDTH = Dimensions.get('screen').width - 20;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

interface GlowingBackgroundProps {
  colors?: string[];
  duration?: number;
  blurAmount?: number;
}

const {width, height} = Dimensions.get('window');

const DEFAULT_COLORS = [
  'rgba(0,32,94, 1)',
  'rgba(52, 122, 255, 0.7)',
  'rgba(52, 122, 255, 0.5)',
  'rgb(122,173,255)',
];

const BACKGROUND_COLOR = '#000';
const GlowingBackground = (
  {
    colors = DEFAULT_COLORS,
    duration = 4000,
    blurAmount = 40,
  }: GlowingBackgroundProps) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {duration, easing: Easing.linear}),
      -1,
      true
    );
  }, [duration]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 0.5, 0.7, 1],
      colors
    );

    return {
      backgroundColor,
    };
  });
  if (Platform.OS === 'ios') {
    return (
      <>
        <BlurView style={[StyleSheet.absoluteFill, {backgroundColor: BACKGROUND_COLOR}]} blurAmount={blurAmount}>
          <Animated.View style={[styles.circle, animatedStyle]}/>
        </BlurView>
      </>
    );
  }
  return (
    <>
      <View style={[StyleSheet.absoluteFill, {backgroundColor: BACKGROUND_COLOR}]}>
        <ImageBackground
          style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}
          resizeMode="contain"
          source={require('@/src/assets/images/blur.png')}
        />

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    top: height * 0.33,
    left: width * 0.1,
    borderRadius: (width * 0.8) / 2,
    opacity: 0.7,
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 50,
    elevation: 20,
  },
});

export default GlowingBackground;
