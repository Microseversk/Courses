import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRolesResponse } from '../../types/response.types'

interface IUser {
	fullName: string
	email: string
	birthDate: string
	roles: IRolesResponse
}

interface IAuthState {
	isAuth: boolean
	user: IUser | null
}

const initialState: IAuthState = {
	isAuth: false,
	user: null,
}

export const authSlice = createSlice({
	name: 'authSlice',
	reducerPath: 'auth',
	initialState: initialState,
	reducers: {
		setAuth(state, { payload }: PayloadAction<boolean>) {
			state.isAuth = payload
		},
		setUser(state, { payload }: PayloadAction<IUser | null>) {
			state.user = payload
		},
	},
})

export const { setAuth, setUser } = authSlice.actions
export default authSlice.reducer
