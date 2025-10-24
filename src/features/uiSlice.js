import {createSlice} from '@reduxjs/toolkit'

const loadTheme = () => {
    if (typeof window === 'undefined') {
        return false;
    } else {
        const stored = localStorage.getItem('darkmode');
        return stored ? JSON.parse(stored) : false;
    }
}

const saveTheme = (value) => {
    localStorage.setItem('darkmode', JSON.stringify(value));
}
const initialState = {
    darkmode:loadTheme(),

}

const uiSlice=createSlice({
    name:'ui',
    initialState,
reducers:{
toggleTheme:(state)=>{
    state.darkmode=!state.darkmode;
    saveTheme(state.darkmode);
}
}})

export const {toggleTheme}=uiSlice.actions;
export default uiSlice.reducer;


