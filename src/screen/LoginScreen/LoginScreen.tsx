import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store/hooks/redux';
import {GStyle} from '../../utils';
import {setUserName} from '../../store/AppConfigStore/AppConfigSlice';
import {currentUserNameSelector} from '../../store/selectors';

const LoginScreen = () => {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const handleTextChange = (username: string) => {
    setText(username);
  };

  const userName = useAppSelector(currentUserNameSelector);
  return (
    <View style={styles.container}>
      <Text>userName {userName} </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        onChangeText={handleTextChange}
        value={text}
        textAlignVertical="bottom"
        placeholderTextColor="gray"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          dispatch(setUserName(text));
        }}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
    height: Dimensions.get('screen').height,
  },
  input: {
    width: 200,
    height: 55,
    borderColor: GStyle.colors.purple,
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth * 2,
    backgroundColor: GStyle.colors.white,
  },
  button: {
    position: 'absolute',
    bottom: Dimensions.get('screen').height * 0.15,
    backgroundColor: GStyle.colors.purple,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  buttonText: {
    // backgroundColor: GStyle.colors.white,
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Helvetica',
    color: GStyle.colors.white,
  },
});

export default LoginScreen;
