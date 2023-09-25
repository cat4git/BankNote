import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  IAccountTransactionStore,
  IBankingTransactionMissingID,
} from './AccountTransactionStoreInterface';
import {removeItemByIndex} from '../../utils';

const initialState: IAccountTransactionStore = {
  data: {},
  number: 0,
  filterByText: undefined,
  filterByDate: undefined,
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
      state.data[userName].push({...transaction, uniqueId: state.number});
      state.number += 1;
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
    setFilters: (
      state,
      action: PayloadAction<{
        date: string | undefined;
        text: string | undefined;
      }>,
    ) => {
      const {text, date} = action.payload;
      const filterEmpty = text === '' ? undefined : text;
      return {...state, filterByDate: date, filterByText: filterEmpty};
    },
  },
});

export const {
  addTransaction,
  deleteTransaction,
  updateTransaction,
  clearData,
  setFilters,
} = accountTransactionSlice.actions;

export default accountTransactionSlice.reducer;
