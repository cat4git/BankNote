import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GStyle} from '../../utils';
import {useAppDispatch, useAppSelector} from '../../store/hooks/redux';
import {setUserName} from '../../store/AppConfigStore/AppConfigSlice';
import {currentUserNameSelector} from '../../store/selectors';
import {clearData} from '../../store/AccountTransactionStore/AccountTransactionSlice';

interface ILogOutSection {
  length: number;
}

const LogOutSectionModal = (props: ILogOutSection) => {
  const {length} = props;
  const dispatch = useAppDispatch();
  const userName = useAppSelector(currentUserNameSelector) || '';
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <View style={styles.lineContainer}>
          <Text style={styles.text}>Total Expenses Items</Text>
          <Text style={styles.boldText}>{length}</Text>
        </View>
        <TouchableOpacity
          style={styles.lineContainer}
          onPress={() => {
            dispatch(clearData({userName: userName}));
            dispatch(setUserName(undefined));
          }}>
          <Text style={styles.text}>Sing Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    lineHeight: 20,
    color: GStyle.colors.black,
  },
  boldText: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '700',
    color: GStyle.colors.black,
  },
  lineContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: GStyle.colors.gray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginStart: 20,
    marginEnd: 28,
    paddingVertical: 12,
  },
});
export default LogOutSectionModal;
