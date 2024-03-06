import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {accountApi} from "./api/accountApi";
import {authSlice} from "./auth.slice";
import {groupsApi} from "./api/groupsApi";
import {coursesApi} from "./api/coursesApi";
import {usersApi} from "./api/usersApi";


const rootReducer = combineReducers({
    [accountApi.reducerPath] : accountApi.reducer,
    [groupsApi.reducerPath] : groupsApi.reducer,
    [coursesApi.reducerPath] : coursesApi.reducer,
    [usersApi.reducerPath] : usersApi.reducer,
    [authSlice.reducerPath]: authSlice.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(accountApi.middleware)
        .concat(groupsApi.middleware)
        .concat(coursesApi.middleware)
        .concat(usersApi.middleware)
})


export type RootReducer = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
