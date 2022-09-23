import { createSlice } from "@reduxjs/toolkit";

export const compteurSlice = createSlice({
    name: 'compteurs',
    initialState: {
        ancienCompteurs: [],
        compteurs: [],
        idCompteur: 0,
        isLoding: false,
        isMiniLoding: false,
        isInsert: false,
        lu: 0
    },
    reducers: {
        setCompteurs: (state, { payload }) => {
            state.compteurs = payload;

            //console.log('action',payload)
        },
        setAncienCompteurs: (state, { payload }) => {
            state.ancienCompteurs = payload;
        },
        addAncienCompteurs: (state, { payload }) => {
            state.ancienCompteurs.push(payload)
        },
        addCompteurs: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(numeroCompteur, idGeographique, nomAbonne, adresse) {
                return {
                    payload: {
                        numeroCompteur, idGeographique, nomAbonne, adresse
                    }
                }
            }
        },
        setIdCompteur: (state, { payload }) => {
            state.idCompteur = payload;
        },
        loding: (state) => {
            state.isLoding = true;
        },
        notLoding: (state) => {
            state.isLoding = false;
        },

        minLoding: (state) => {
            state.isMiniLoding = true;
        },
        notMinLoding: (state) => {
            state.isMiniLoding = false;
        },
        isInsertCompteur: (state, { payload }) => {
            state.isInsert = true
        },
        NotIsInsertCompteur: (state, { payload }) => {
            state.isInsert = false
        },
        setLu: (state, { payload }) => {
            state.lu = state.lu + 1
        },

    }
});

export const { setLu,isInsertCompteur, NotIsInsertCompteur, addAncienCompteurs, setCompteurs, setIdCompteur, loding, notLoding, setAncienCompteurs, minLoding, notMinLoding, goCreate, notGoCreate } = compteurSlice.actions;
export default compteurSlice.reducer;