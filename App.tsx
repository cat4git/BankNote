import React from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import {GStyle} from './src/utils';
import {Provider} from 'react-redux';
import appStore, {persistor} from './src/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import Main from './src/screen/Main';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={appStore}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={GStyle.colors.backgroundColor}
        />
        <PersistGate loading={null} persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
}

export default App;
