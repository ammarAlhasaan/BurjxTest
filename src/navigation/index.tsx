import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "@/src/screens/home-screen";



const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
  },
});

export const Navigation = createStaticNavigation(RootStack);
