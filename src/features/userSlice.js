
import {createSlice} from "@reduxjs/toolkit";


const authSlice=createSlice({
    name:"auth",
    initialState:{user:null,loading:false,name:{},error:null,loggedIn:false},
    reducers:{
        setUser(state,action){
            state.user=action.payload;
            state.name=action.payload.name;
        },
        clearUser(state){
            state.user=null;
            state.name.firstname=null;
            state.name.lastname=null;

        },
        setLogin(state,action){
            state.loggedIn = action.payload;
        }
    }
})

export const {setUser,clearUser,setLogin} = authSlice.actions;
export default authSlice.reducer;