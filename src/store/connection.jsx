import {createSlice} from '@reduxjs/toolkit'




const accountSlice  = createSlice({
    name : 'account',
    initialState : {account : null},
    reducers:{
        connect : (state,action)=>{
            state.account = action.payload.acc;
        },
        change : (state,action)=>{
            state.account = action.payload.acc;
        },
        disconnect : (state)=>{
            state.account = null;
        }
    }
})


export default accountSlice;
export const accountActions = accountSlice.actions;


