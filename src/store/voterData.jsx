import {createSlice} from '@reduxjs/toolkit'




const voterSlice  = createSlice({
    name : 'voterList',
    initialState : {
        voterList : [],
        id:0,
    },
    reducers:{
        addInitialVoter:(state,action)=>{
            state.voterList = action.payload.voterListInitial
        },
        addVoter : (state,action)=>{
            state.voterList = [action.payload.voter,...state.voterList];
            state.id++;
        },
        removeVoter : (state,action)=>{
            const removeVoter = action.payload.voter
            state.voterList = (state.voterList).filter(voter => voter !==removeVoter )
        },
        increaseId : (state)=>{
            state.id++;
        },
        disconnect : (state)=>{
            state.voterList = [];
            state.id = 0;
        }

    }
})


export default voterSlice;
export const voterActions = voterSlice.actions;

