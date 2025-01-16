import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface UserInputs {
    name?: string;
    email: string;
    password: string;
    userId?: number;
    authenticated?: boolean;
  };
  

  const initialState  = {
    name: "",
    email: "",
    password: "",
    userId: 0,
    authenticated: false
  }

  const userSlice  = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUser(state, action: PayloadAction<UserInputs>) {
        console.log("Action dispatched: ", action);
        state.name = action.payload.name || state.name;
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.userId = action.payload.userId || state.userId;
        state.authenticated = action.payload.authenticated || state.authenticated;
      },
      clearUser(state) {
        state.name = "";
        state.email = "";
        state.password = "";
        state.userId = 0;
        state.authenticated = false;
      }
    }
  })

    export const { setUser, clearUser } = userSlice.actions;  
    export default userSlice.reducer;