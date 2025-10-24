import {configureStore} from '@reduxjs/toolkit';
import cartReducer from "@/features/cartSlice";
import UiReducer from "@/features/uiSlice";
export const store=configureStore({
    reducer:{
        cart:cartReducer,
        ui:UiReducer,

    }
})