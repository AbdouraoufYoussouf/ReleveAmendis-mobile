import { createSlice } from "@reduxjs/toolkit";

export const anomalieSlice = createSlice({
    name:'anomalie',
    initialState:{
        anomalies:[],
        designationAnomalie:null,
        fluides:[],
        isInsert:false

    },
    reducers:{
        setAnomalies:(state,{payload}) => {
            state.anomalies = payload;
        },
        addAnomalieStore:(state,{payload}) => {
            state.anomalies.push(payload);
        },
        
        setFluides:(state,{payload}) => {
            state.fluides = payload;
        },
        updatedAnomalieStore(state, action) {
        
          },
        setDesignationAnomalies:(state,{payload}) => {
            state.designationAnomalie = payload;
        },
        deleteAnomalieStore: (state, { payload }) => {
            const itemId = payload;
            state.anomalies = state.anomalies.filter((anomal) => anomal.anomalieId !== itemId);
        },
        isInsertAnomalie: (state, { payload }) => {
            state.isInsert = true
        },
        notIsInsertAnomalie: (state, { payload }) => {
            state.isInsert = false
        },
    }
});

export const {isInsertAnomalie,notIsInsertAnomalie,deleteAnomalieStore, setAnomalies,addAnomalieStore ,setDesignationAnomalies,updatedAnomalieStore,setFluides } = anomalieSlice.actions;
export default anomalieSlice.reducer;