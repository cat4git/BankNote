import React, {useState} from 'react';
import {Text, View} from 'react-native';

const MainScreen = () => {
  const [view, setView] = useState('login');
  switch (view) {
    case 'login':
      return <Login />;
    // code block
    case 'main':
      return <Main />;
    default:
      return <Login />;
    // code block
  }
};

const Main = () => {
  return (
    <View>
      <Text>main page</Text>
    </View>
  );
};
const Login = () => {
  return (
    <View>
      <Text>Login</Text>
    </View>
  );
};

export default MainScreen;
