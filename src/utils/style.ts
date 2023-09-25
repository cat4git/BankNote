import {StyleProp, TextStyle, ViewStyle} from 'react-native';

const colors = {
  backgroundColor: '#118AB2',
  purple: '#5B58AD',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#D9D9D9',
  darkGray: '#696969',
  darkGray_70: 'rgba(105, 105, 105,0.7)',
  lightGray: '#F4EEEE',
  blue: '#455EFF',
  dark: '#3E3E3E',
};

interface IStyle {
  textTitle: StyleProp<TextStyle>;
  center: StyleProp<ViewStyle>;
  flexRow: StyleProp<ViewStyle>;
  alignEnd: StyleProp<ViewStyle>;
  alignCenter: StyleProp<ViewStyle>;
}
const generalStyle: IStyle = {
  textTitle: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Helvetica',
    lineHeight: 21,
    letterSpacing: 0.03,
    color: colors.black,
    textAlign: 'center',
  },
  center: {flexDirection: 'row', justifyContent: 'center'},
  flexRow: {flexDirection: 'row'},
  alignEnd: {alignItems: 'flex-end'},
  alignCenter: {alignItems: 'center'},
};

export default {colors: colors, generalStyle: generalStyle};
