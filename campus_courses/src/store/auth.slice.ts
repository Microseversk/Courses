import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IAuthState{
    isAuth: boolean,
    user: IUser
}

interface IUser{
    fullName: string,
    email: string,
    birthDate: string,
}

const initialState : IAuthState = {
    isAuth: false,
    user: {
        fullName: "",
        email: "",
        birthDate: "",
    }
}

export const authSlice = createSlice({
    name: 'authSlice',
    reducerPath: 'auth',
    initialState: initialState,
    reducers: {
        setAuth(state, {payload} : PayloadAction<boolean>){
            state.isAuth = payload
        },
        setUser(state,{payload} : PayloadAction<IUser>){
            state.user = payload
        }
    }
})


export const {setAuth, setUser} = authSlice.actions
export default  authSlice.reducer