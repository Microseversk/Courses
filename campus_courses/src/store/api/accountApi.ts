import { IUserLogin } from '../../components/pages/loginPage/LoginPage'
import { IEditUserProfile, IUserRegistration } from '../../types/request.types'
import {
	IProfileResponse,
	IRolesResponse,
	ITokenResponse,
} from '../../types/response.types'
import { api } from './api'

export const accountApi = api.injectEndpoints({
	endpoints: builder => ({
		loginUser: builder.mutation<ITokenResponse, IUserLogin>({
			query: (loginTerm: IUserLogin) => ({
				url: '/login',
				body: loginTerm,
				method: 'POST',
			}),
			invalidatesTags: [
				'userProfile',
				'userRoles',
				'coursesMy',
				'coursesTeaching',
			],
		}),
		registerUser: builder.mutation<ITokenResponse, IUserRegistration>({
			query: (registerTerm: IUserRegistration) => ({
				url: '/registration',
				body: registerTerm,
				method: 'POST',
			}),
			invalidatesTags: [
				'userProfile',
				'userRoles',
				'coursesMy',
				'coursesTeaching',
			],
		}),
		logoutUser: builder.mutation<any, any>({
			query: (token: string) => ({
				url: '/logout',
				method: 'POST',
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}),
			invalidatesTags: [
				'userProfile',
				'userRoles',
				'coursesMy',
				'coursesTeaching',
			],
		}),
		editUserProfile: builder.mutation<any, IEditUserProfile>({
			query: (data: IEditUserProfile) => ({
				url: '/profile',
				method: 'PUT',
				body: data,
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}),
			invalidatesTags: ['userProfile'],
		}),
		getUserProfile: builder.query<IProfileResponse, any>({
			query: (token: string) => ({
				url: '/profile',
				method: 'GET',
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}),
			providesTags: ['userProfile'],
		}),
		getUserRoles: builder.query<IRolesResponse, any>({
			query: (token: string) => ({
				url: '/roles',
				method: 'GET',
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}),
			providesTags: ['userRoles'],
		}),
	}),
})

export const {
	useLoginUserMutation,
	useRegisterUserMutation,
	useLogoutUserMutation,
	useGetUserProfileQuery,
	useEditUserProfileMutation,
	useGetUserRolesQuery,
} = accountApi
