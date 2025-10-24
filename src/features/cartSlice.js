import {createSlice} from '@reduxjs/toolkit';

const loadCart = () => {
    try {
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

const saveCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

const initialItems = typeof window !== 'undefined' ? loadCart() : [];

const initialState = {
    items: initialItems,
    totalPrice: initialItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    ).toFixed(2),
    totalItems: initialItems.length,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existing = state.items.find((i) => i.id === action.payload.id && i.size === action.payload.size);
            if (existing) {
                existing.quantity++;
            } else {
                state.items.push({...action.payload, quantity: 1})
            }
            state.totalPrice = state.items.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            ).toFixed(2);
            state.totalItems = state.items.length;
            saveCart(state.items);

        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                (i) => !(i.id === action.payload.id && i.size === action.payload.size)
            );
            state.totalPrice = state.items.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            ).toFixed(2);
            state.totalItems = state.items.length;
            saveCart(state.items);
        },
        addQuantity: (state, action) => {
            const item = state.items.find((i) => i.id === action.payload.id && i.size === action.payload.size);
            if (item) {
                item.quantity += 1;
            }
            state.totalPrice = state.items.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            ).toFixed(2);
            saveCart(state.items);
        },

        removeQuantity: (state, action) => {
            const item = state.items.find((i) => i.id === action.payload.id && i.size === action.payload.size);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    // remove the item completely if quantity is 1
                    state.items = state.items.filter(
                        (i) => !(i.id === action.payload.id && i.size === action.payload.size)
                    );
                    state.totalItems = state.items.length;
                }
            }
            state.totalPrice = state.items.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            ).toFixed(2);
            saveCart(state.items);
        },
    }
})

export const {initializeCart, addToCart, removeFromCart,removeQuantity,addQuantity} = cartSlice.actions;
export default cartSlice.reducer;