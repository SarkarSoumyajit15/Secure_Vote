import { combineReducers, configureStore } from "@reduxjs/toolkit";
import accountSlice from "./connection"
import voterSlice from "./voterData";
import candidateSlice from "./candidateData.jsx";
import {persistReducer,persistStore} from "redux-persist"
import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers({
    account : accountSlice.reducer,
    voterList : voterSlice.reducer,
    candidateList : candidateSlice.reducer,
})


const persistConfig = {
    key : 'root',
    storage,
    version : 1
}

const persistedState = persistReducer(persistConfig,rootReducer);



const accountStore = configureStore({
    reducer : persistedState,
    middleware : (getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck : false,
    }),
})

export const persistor = persistStore(accountStore);


export default accountStore;
