import { IUsersResponse } from '../../types/response.types'
import { api } from './api'

export const usersApi = api.injectEndpoints({
	endpoints: builder => ({
		getUsers: builder.query<IUsersResponse[], any>({
			query: () => ({
				url: '/users',
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}),
		}),
	}),
})

export const { useGetUsersQuery } = usersApi
