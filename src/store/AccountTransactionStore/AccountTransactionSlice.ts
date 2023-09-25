import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  IAccountTransactionStore,
  IBankingTransactionMissingID,
} from './AccountTransactionStoreInterface';
import {removeItemByIndex} from '../../utils';

const initialState: IAccountTransactionStore = {
  data: {},
  number: 0,
};

const accountTransactionSlice = createSlice({
  name: 'accountTransaction',
  initialState,
  reducers: {
    addTransaction: (
      state,
      action: PayloadAction<{
        transaction: IBankingTransactionMissingID;
        userName: string;
      }>,
    ) => {
      const {transaction, userName} = action.payload;
      if (!state.data[userName]) {
        state.data[userName] = [];
      }
      console.log(state.data[userName], action.payload);
      state.data[userName].push({...transaction, uniqueId: state.number});
      state.number += 1;
      console.log('state', state);
    },
    deleteTransaction: (
      state,
      action: PayloadAction<{
        uniqueId: number;
        userName: string;
      }>,
    ) => {
      const {userName, uniqueId} = action.payload;
      const location = state.data[userName].findIndex(item => {
        return item.uniqueId === uniqueId;
      });
      const newData = removeItemByIndex(state.data[userName], location);
      if (location) {
        state.data[userName] = newData;
      }
    },
    updateTransaction: (
      state,
      action: PayloadAction<{
        transaction: IBankingTransactionMissingID;
        userName: string;
        uniqueId: number;
      }>,
    ) => {
      const {transaction, userName, uniqueId} = action.payload;
      const location = state.data[userName].findIndex(item => {
        return item.uniqueId === uniqueId;
      });
      console.log('uniqueId', uniqueId, transaction);
      if (location) {
        state.data[userName][location] = {
          ...transaction,
          uniqueId: uniqueId,
        };
      }
    },
    clearData: (
      state,
      action: PayloadAction<{
        userName: string;
      }>,
    ) => {
      const {userName} = action.payload;
      state.data[userName] = [];
    },
  },
});

export const {addTransaction, deleteTransaction, updateTransaction, clearData} =
  accountTransactionSlice.actions;

export default accountTransactionSlice.reducer;
