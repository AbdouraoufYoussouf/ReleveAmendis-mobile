import { createSlice } from "@reduxjs/toolkit";
const initialState= {
    anomalies:[],
    designationAnomalie:null,
}
export const anomalieSlice = createSlice({
    name:'anomalie',
    initialState:{
        anomalies:{
            codeAnomalie:null,designation:'',codeFluide:'',libele:''
        },
        designationAnomalie:null,
    },
    reducers:{
        setAnomalies:(state,{payload}) => {
            state.anomalies = payload;
        },
        updatedAnomalieStore(state, action) {
            const { codeAnomalie, codeFluide, designation ,libele} = action.payload
            const anomalieData = state.anomalies
            //anomalieData.find((item)=>console.log('state:',item))
            // const existingAnomalie = anomalieData.find((post) => post.codeAnomalie === codeAnomalie)
            // if (existingAnomalie) {
            //   existingAnomalie.codeFluide = codeFluide
            //   existingAnomalie.designation = designation
            //   existingAnomalie.libele = libele
            // }
          },
        setDesignationAnomalies:(state,{payload}) => {
            state.designationAnomalie = payload;
        }
    }
});

export const { setAnomalies ,setDesignationAnomalies,updatedAnomalieStore } = anomalieSlice.actions;
export default anomalieSlice.reducer;