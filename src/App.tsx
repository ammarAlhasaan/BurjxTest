import React from 'react';

import {Navigation} from '@/src/navigation';
import {Provider} from 'react-redux';
import {store} from '@/src/state/store';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MyTheme} from './theme';
import {GluestackUIProvider} from '@/src/components/ui/gluestack-ui-provider';
import '../global.css';
import {NavigationContainer} from '@react-navigation/native';

function App(): React.JSX.Element {


  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <GluestackUIProvider mode="dark">
          <NavigationContainer theme={MyTheme}>
            <Navigation/>
          </NavigationContainer>
        </GluestackUIProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
