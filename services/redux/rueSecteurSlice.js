import { createSlice } from "@reduxjs/toolkit";

export const rueSecteurSlice = createSlice({
    name:'rueSecreurs',
    initialState:{
        rues:[],
        secteurs:[],
      
    },
    reducers:{
        setRue:(state,{payload}) => {
            state.rues = payload;
        },
        setSecteur:(state,{payload}) => {
            state.secteurs = payload;
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

export const { setRue ,setSecteur} = rueSecteurSlice.actions;
export default rueSecteurSlice.reducer;