import React from 'react';
import '../global.css';
import {GluestackUIProvider} from '@/src/components/ui/gluestack-ui-provider';

import {Navigation} from '@/src/navigation';
import {Provider} from 'react-redux';
import {store} from '@/src/state/store.ts';

function App(): React.JSX.Element {


  return (
    <Provider store={store}>

      <GluestackUIProvider mode="light">
        {/*<NavigationContainer>*/}
        <Navigation/>
        {/*</NavigationContainer>*/}
      </GluestackUIProvider>
    </Provider>
  );
}

export default App;
