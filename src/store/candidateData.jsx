import {createSlice} from '@reduxjs/toolkit'




const candidateSlice  = createSlice({
    name : 'candidateList',
    initialState : {
        candidateList : [],
        id:0,
    },
    reducers:{
        addInitialCandidate:(state,action)=>{
            state.candidateList = action.payload.candidateListInitial
        },
        addCandidate : (state,action)=>{
            state.candidateList = [action.payload.candidate,...state.candidateList];
            state.id++;
        },
        removeCandidate : (state,action)=>{
            const removecandidate = action.payload.candidate
            state.candidateList = (state.candidateList).filter(candidate => candidate !==removecandidate )
        },
        increaseId : (state)=>{
            state.id++;
        },
        disconnect : (state)=>{
            state.candidateList = [];
            state.id = 0;
        }

    }
})


export default candidateSlice;
export const candidateActions = candidateSlice.actions;

