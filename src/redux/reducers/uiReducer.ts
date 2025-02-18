import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export  interface UiProps {
    DarkMode:boolean
    listView:boolean

}

const initialState = {
    DarkMode:false,
    listView:false
}

const UiSlice = createSlice({
    name: "UiInputs",
    initialState,
    reducers: {
      toggleDarkMode(state, action: PayloadAction<boolean>) {
        state.DarkMode = action.payload;
        console.log('State before toggleDarkMode....:', state);
console.log('Action payload toggleDarkMode.....:', action.payload);
      },
      toggleListView(state, action: PayloadAction<boolean>) {
        state.listView = action.payload;
        console.log('State before toggleListview...:', state);
console.log('Action payload togglelistvevw....:', action.payload);
      },
    },
  });
  
  export const { toggleDarkMode, toggleListView } = UiSlice.actions;
  export default UiSlice.reducer;

