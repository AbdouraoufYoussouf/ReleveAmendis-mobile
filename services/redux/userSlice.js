import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: 0, matricule: '', nom: '', role: '', emailu: '', passwordu: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: initialState,
        users : []
    },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
            //console.log('action',action)
        },
        logout: (state, action) => {
            state.value = initialState
        },
       
        getAllUsers: (state, { payload }) => {
            state.users = payload;
        },
    },
});

export const { login, logout ,getAllUsers} = userSlice.actions;
export default userSlice.reducer;