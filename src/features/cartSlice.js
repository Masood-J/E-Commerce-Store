
import {createSlice} from '@reduxjs/toolkit';

const loadCart=()=>{
    try{
        const stored=localStorage.getItem('cart');
        return stored?JSON.parse(stored):[];
    }
    catch{
        return [];
    }
};

const saveCart=(cart)=>{
    localStorage.setItem('cart',JSON.stringify(cart));
}

const initialState={
    items:[],
    totalPrice:0,
};

const cartSlice=createSlice({
    name: 'cart',
    initialState,
    reducers:{
        initializeCart:(state)=>{
            state.items=loadCart();
            state.totalPrice = state.items.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );
        },
        addToCart:(state,action)=>{
            const existing=state.items.find((i)=>i.id===action.payload.id);
            if(existing){
                existing.quantity++;
            }
            else{
                state.items.push({...action.payload,quantity:1})
            }
            state.totalPrice = state.items.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );
            saveCart(state.items);

        },
        removeFromCart:(state,action)=>{
            state.items=state.items.filter((i)=>i.id!==action.payload.id);
            state.totalPrice=state.items.reduce(
                (acc, item) => acc + item.price * item.quantity,0
            )
            saveCart(state.items);
        }
    }
})

export const {initializeCart,addToCart,removeFromCart}=cartSlice.actions;
export default cartSlice.reducer;