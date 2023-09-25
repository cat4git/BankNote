import {RootState} from './store';

export const currentUserNameSelector = (state: RootState) =>
  state.AppConfigStorReducer.userName;

export const allAccountTransactionSelector = (state: RootState) =>
  state.AccountTransactionReducer.data;

export const filterByTextSelector = (state: RootState) =>
  state.AccountTransactionReducer.filterByText;

export const filterByDateSelector = (state: RootState) =>
  state.AccountTransactionReducer.filterByDate;
