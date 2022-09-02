
import { createSlice, nanoid } from "@reduxjs/toolkit";

export const tourneSlice = createSlice({
    name: 'tourne',
    initialState: {
        tournes: [],
        tourneCourant: null,
        isInsert: false
    },
    reducers: {

       
        getAllTourne: (state, { payload }) => {
            state.tournes = payload;
        },

        setTourneCourant: (state, { payload }) => {
            state.tourneCourant = payload;
        },

        setAllTourne: (state, { payload }) => {
            state.tournes.push(payload);
        },
     
       
        isInsertTourne: (state, { payload }) => {
            state.isInsert = true
        },
        NotIsInsertTourne: (state, { payload }) => {
            state.isInsert = false
        },
    },
});

export const { setTourneCourant, isInsertTourne, NotIsInsertTourne, getAllTourne, setAllTourne } = tourneSlice.actions;
export default tourneSlice.reducer;