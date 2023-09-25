import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IAppConfigStore} from './AppConfigInterface';

const initialState: IAppConfigStore = {
  userName: undefined,
};

export const AppConfigStoreSlice = createSlice({
  name: 'AppConfigStore',
  initialState,
  reducers: {
    resetConfig: () => initialState,
    setUserName: (state, action: PayloadAction<string | undefined>) => {
      return {
        ...state,
        userName: action.payload,
      };
    },
  },
});
export const {setUserName} = AppConfigStoreSlice.actions;

export default AppConfigStoreSlice.reducer;
