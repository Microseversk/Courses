import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setAuth, setUser } from '../slices/auth.slice'

const baseQuery = fetchBaseQuery({ baseUrl: 'https://camp-courses.api.kreosoft.space/' })
const baseQueryWithInterceptor: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
	args,
	api,
	extraOptions
) => {
	let result = await baseQuery(args, api, extraOptions)
	if (result.error && result.error?.status === 401) {
		console.log('auth error')
		localStorage.clear()
		api.dispatch(setAuth(false))
		api.dispatch(setUser(null))
		window.location.href = '/login'
	}
	return result
}

export const api = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithInterceptor,
	endpoints: () => ({}),
	//keepUnusedDataFor: 0,
	tagTypes: ['userProfile', 'userRoles', 'groupCourses', 'groups', 'courseDetails'],
})
