import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {accountApi} from "./api/accountApi";
import {authSlice} from "./auth.slice";


const rootReducer = combineReducers({
    [accountApi.reducerPath] : accountApi.reducer,
    [authSlice.reducerPath]: authSlice.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(accountApi.middleware)
})


export type RootReducer = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
