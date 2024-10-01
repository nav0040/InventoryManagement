import { createSlice } from '@reduxjs/toolkit';


const initialState ={
    customers:[]
}

const customerSlice = createSlice({
    name: 'customers',
    initialState,
    reducers:{
        setCustomers:(state,action)=>{
            state.customers = action.payload
        },
        addCustomer:(state,action)=>{
            state.customers.push(action.payload)
        },
        updateCustomer:(state,action)=>{
          const index = state.customers.findIndex((item)=> item._id === action.payload._id);
          if (index !== -1) {
            state.customers[index] = action.payload;
          }

        },
        deleteCustomer:(state,action)=>{
            state.customers = state.customers.filter((item)=> item._id !== action.payload);
        }
    }
});


export const { setCustomers,addCustomer,updateCustomer,deleteCustomer } = customerSlice.actions;
export default customerSlice.reducer;