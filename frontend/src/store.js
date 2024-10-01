import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "./slices/inventorySlice";
import customerReducer from "./slices/customerSlice.js";
import salesReducer from "./slices/salesSlice.js";
import userReducer from "./slices/userSlice.js";

const store = configureStore({
    reducer:{
        inventories:inventoryReducer,
        customers:customerReducer,
        sales:salesReducer,
        user:userReducer,
        
    }
})


export default store;