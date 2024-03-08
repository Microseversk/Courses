import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://camp-courses.api.kreosoft.space/',
	}),
	endpoints: () => ({}),
	keepUnusedDataFor: 0,
	tagTypes: [
		'userProfile',
		'userRoles',
		'coursesMy',
		'coursesTeaching',
		'groupCourses',
		'groups',
		'courseDetails',
	],
})
