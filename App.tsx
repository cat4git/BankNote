import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';

import {Header} from 'react-native/Libraries/NewAppScreen';
import {GStyle} from './src/utils';
import MainScreen from './src/screen/MainScreen/MainScreen';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={GStyle.GStyle.colors.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <MainScreen />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
