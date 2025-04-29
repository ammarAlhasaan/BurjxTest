import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import HomeScreen from '@/src/screens/home-screen';
import CoinDetailsScreen from '@/src/screens/coin-details-screen';
import BiometricAuthScreen from '@/src/screens/signin-biometric-screen';
import { selectIsAuthenticated } from '../state/slices/authSlice';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated && (
        <Stack.Screen name="BiometricAuth" component={BiometricAuthScreen} />
      )}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CoinDetails" component={CoinDetailsScreen} />
    </Stack.Navigator>
  );
};
