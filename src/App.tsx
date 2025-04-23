import React from 'react';
import '../global.css';
import {GluestackUIProvider} from '@/src/components/ui/gluestack-ui-provider';
import {ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View,} from 'react-native';

import {Colors,} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
 
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (

    <GluestackUIProvider mode="light">
      <NavigationContainer>
        <View style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <ScrollView


            style={backgroundStyle}>

            <View>
              <Text>Hello there we are here </Text>
            </View>
          </ScrollView>
        </View>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
