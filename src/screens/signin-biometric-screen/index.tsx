import React from 'react';
import {Alert, Image, Linking, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, ButtonText, Center, Text, VStack} from '@/src/components/ui';
import ReactNativeBiometrics from 'react-native-biometrics';
import {setAuthenticated} from '@/src/state/slices/authSlice';
import {useAppDispatch} from '@/src/state/hooks';
import {GlowingBackground} from '@/src/components/shared';

const rnBiometrics = new ReactNativeBiometrics();

const BiometricAuthScreen = () => {
  const dispatch = useAppDispatch();
  const handleBiometricAuth = async () => {
    dispatch(setAuthenticated(true));
    return;
    const {available} = await rnBiometrics.isSensorAvailable();

    if (!available) {
      Alert.alert(
        'Biometric Not Available',
        'Your device does not have biometrics set up. Please configure Face ID or Fingerprint.',
        [
          {
            text: 'Go to Settings',
            onPress: () => Linking.openSettings(),
          },
          {text: 'Cancel', style: 'cancel'},
        ],
        {cancelable: true}
      );
      return;
    }

    rnBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint'})
      .then((resultObject) => {
        const {success} = resultObject;

        if (success) {
          dispatch(setAuthenticated(true));
        } else {
          Alert.alert(
            'Authentication Failed',
            'You need to authenticate to continue.',
            [
              {text: 'Try Again', onPress: handleBiometricAuth},
              {text: 'Cancel', style: 'cancel'},
            ],
            {cancelable: true}
          );
        }
      })
      .catch(() => {
        console.log('Biometrics prompt cancelled or failed');
      });
  };

  return (
    <SafeAreaView className="flex-1 p-3">
      <GlowingBackground/>
      <VStack className="flex-1 justify-between">
        <View className="w-[70%]">
          <Text size="5xl">Use Biometric to log in?</Text>
        </View>
        <Center>
          <Image
            source={require('@/src/assets/images/biometric.png')}
            style={{width: 300, height: 300}}
            resizeMode="contain"
          />
        </Center>
        <Button className="rounded-full" size="lg" onPress={handleBiometricAuth}>
          <ButtonText>Set Up</ButtonText>
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default BiometricAuthScreen;
