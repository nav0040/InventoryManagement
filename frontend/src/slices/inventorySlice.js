import { createSlice } from '@reduxjs/toolkit';


const initialState ={
    items:[]
}

const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers:{
        setInventory:(state,action)=>{
            state.items = action.payload
        },
        addItem:(state,action)=>{
            state.items.push(action.payload)
        },
        updateItem:(state,action)=>{
          const index = state.items.findIndex((item)=> item._id === action.payload._id);
          if (index !== -1) {
            state.items[index] = action.payload;
          }

        },
        deleteItem:(state,action)=>{
            state.items = state.items.filter((item)=> item._id !== action.payload);
        }
    }
});


export const { setInventory,addItem,updateItem,deleteItem } = inventorySlice.actions;
export default inventorySlice.reducer;