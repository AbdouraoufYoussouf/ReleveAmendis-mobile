import { createSlice } from "@reduxjs/toolkit";

export const rueSecteurSlice = createSlice({
    name:'rueSecreurs',
    initialState:{
        rues:[],
        secteurs:[],
      rueEnlecture:''
    },
    reducers:{
        setRue:(state,{payload}) => {
            state.rues = payload;
        },
        setSecteur:(state,{payload}) => {
            state.secteurs = payload;
        },
       
        setRueEnlecture:(state,{payload}) => {
            state.rueEnlecture = payload;
        },
       
        addRue:{
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
       
    }
});

export const { setRue ,setSecteur,setRueEnlecture,addRue} = rueSecteurSlice.actions;
export default rueSecteurSlice.reducer;