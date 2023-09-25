import React, {useEffect} from 'react';
import {BackHandler, View} from 'react-native';
import {useAppSelector} from '../store/hooks/redux';
import {currentUserNameSelector} from '../store/selectors';
import MainScreen from './MainScreen/MainScreen';
import {LoginScreen} from './LoginScreen';

const Main = () => {
  const userName = useAppSelector(currentUserNameSelector);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);
  return (
    <View style={{flex: 1}}>
      {!userName ? <LoginScreen /> : <MainScreen />}
    </View>
  );
};

export default Main;
