import { createSlice } from "@reduxjs/toolkit";

export const compteurSlice = createSlice({
    name:'compteurs',
    initialState:{
        ancienCompteurs:[],
        compteurs:[],
        idCompteur:0,
        isLoding:false,
        isMiniLoding:false,
    },
    reducers:{
        setCompteurs:(state,{payload}) => {
            state.compteurs = payload;
            
            //console.log('action',payload)
        },
        setAncienCompteurs:(state,{payload}) => {
            state.ancienCompteurs = payload;
        },
        addCompteurs:{
            reducer(state,action){
                state.push(action.payload)
            },
            prepare(numeroCompteur,idGeographique,nomAbonne,adresse){
                return{
                    payload:{
                        numeroCompteur,idGeographique,nomAbonne,adresse
                    }
                }
            }
        },
        setIdCompteur:(state,{payload}) => {
            state.idCompteur = payload;
        },
        loding:(state) => {
            state.isLoding = true;
        },
        notLoding:(state) => {
            state.isLoding = false;
        },

        minLoding:(state) => {
            state.isMiniLoding = true;
        },
        notMinLoding:(state) => {
            state.isMiniLoding = false;
        },
        
     
    }
});

export const { setCompteurs ,setIdCompteur,loding ,notLoding,setAncienCompteurs,minLoding,notMinLoding,goCreate,notGoCreate} = compteurSlice.actions;
export default compteurSlice.reducer;