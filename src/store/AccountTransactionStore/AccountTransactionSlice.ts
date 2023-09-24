import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  IAccountTransactionStore,
  IBankingTransaction,
} from './AccountTransactionStoreInterface';

const initialState: IAccountTransactionStore = {
  data: {},
};

const accountTransactionSlice = createSlice({
  name: 'accountTransaction',
  initialState,
  reducers: {
    addTransaction: (
      state,
      action: PayloadAction<{
        transaction: IBankingTransaction;
        userName: string;
      }>,
    ) => {
      const {transaction, userName} = action.payload;
      if (!state.data[userName]) {
        state.data[userName] = [];
      }
      state.data[userName].push(transaction);
    },
  },
});

export const {addTransaction} = accountTransactionSlice.actions;

export default accountTransactionSlice.reducer;
