import React from 'react';
import {Text, View} from 'react-native';

interface IExpenseModal {
  id: number;
  close: () => undefined;
}

const ExpenseModal = (props: IExpenseModal) => {
  const {id} = props;
  return (
    <View>
      <Text>456{id}</Text>
    </View>
  );
};

export default ExpenseModal;
