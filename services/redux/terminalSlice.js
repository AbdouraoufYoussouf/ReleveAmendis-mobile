import { createSlice } from "@reduxjs/toolkit";

export const terminalSlice = createSlice({
    name: 'terminals',
    initialState: {
        terminals: [],
        terminal: [],
        terminalLocal: {},
        idTerminal: null,
        isCreatec: false,
        isDbExist: false
    },
    reducers: {
        getAllterminals: (state, { payload }) => {
            state.terminals = payload;
        },

        getTerminal: (state, { payload }) => {
            state.terminal = payload;
        },
        getTerminalLocal: (state, { payload }) => {
            state.terminalLocal = payload;
        },


        editTerminalStore: (state, { payload }) => {
            state.terminals.map((term) => {
                if (term.terminalNumber === payload.terminalNumber) {
                    term.isOccupy = payload.isOccupy
                }
            })
        },
        editTerminalLocalStore: (state, { payload }) => {
            const termianl = state.terminalLocal;
            termianl.terminalId = payload.idTerminal;
            termianl.isCreatec = payload.isCreatec;
            console.log('paylod',payload)
        },

        isCreateCompteur: (state, { payload }) => {
            state.isCreatec = payload;
        },
        isDbExist: (state, { payload }) => {
            state.isDbExist = true;
        },
        isDbNotExist: (state, { payload }) => {
            state.isDbExist = false;
        },
        NotisCreateCompteur: (state, { payload }) => {
            state.isCreatec = false
        },
    },
});

export const {isDbNotExist,isDbExist, isCreateCompteur,editTerminalLocalStore, getTerminalLocal, isCreatecTerminal, NotisCreatecTerminal, getTerminal, getAllterminals, editTerminalStore } = terminalSlice.actions;
export default terminalSlice.reducer;