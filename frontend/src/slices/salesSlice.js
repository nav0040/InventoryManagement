import { createSlice } from '@reduxjs/toolkit';

const salesSlice = createSlice({
    name:'sales',
    initialState:{
        sales:[],
    },
    reducers:{
        createSale:(state,action)=>{
            state.sales.push(action.payload);
        },
        fetchSales:(state,action)=>{
            state.sales = action.payload
        }
    }
})


export const {createSale,fetchSales } = salesSlice.actions;
export default salesSlice.reducer;