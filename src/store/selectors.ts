import {RootState} from './store';

export const currentUserName = (state: RootState) =>
  state.AppConfigStorReducer.userName;

export const allAccountTransaction = (state: RootState) =>
  state.AccountTransactionReducer.data;
