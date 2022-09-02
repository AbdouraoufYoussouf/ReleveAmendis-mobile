import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: 0, matricule: '', nom: '', role: '', emailu: '', passwordu: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: initialState,
    },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
            //console.log('action',action)
        },
        logout: (state, action) => {
            state.value = initialState
        },
       
        
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;