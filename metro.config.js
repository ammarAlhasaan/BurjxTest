const { withNativeWind } = require('nativewind/metro');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = mergeConfig(getDefaultConfig(__dirname), {});

// Wrap the config with Reanimated and NativeWind
module.exports = withNativeWind(wrapWithReanimatedMetroConfig(config), {
 input: './global.css',  // Specify your CSS file for NativeWind
});
