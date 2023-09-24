import React from 'react';
import {View} from 'react-native';
import {useAppSelector} from '../store/hooks/redux';
import {currentUserName} from '../store/selectors';
import MainScreen from './MainScreen/MainScreen';
import {LoginScreen} from './LoginScreen';

const Main = () => {
  const userName = useAppSelector(currentUserName);
  console.log('userName', userName);
  return (
    <View style={{flex: 1}}>
      {!userName ? <LoginScreen /> : <MainScreen />}
    </View>
  );
};

export default Main;
