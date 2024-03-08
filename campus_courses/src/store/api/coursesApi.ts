import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICourseCreate, ICourseEditStatus } from '../../types/request.types'
import {
	ICourseDetailsResponse,
	IGroupCoursesResponse,
} from '../../types/response.types'

export const coursesApi = createApi({
	reducerPath: 'coursesApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://camp-courses.api.kreosoft.space/',
	}),
	tagTypes: ['groupCourses', 'coursesMy', 'coursesTeaching'],
	endpoints: builder => ({
		getGroupCourses: builder.query<
			IGroupCoursesResponse[],
			{ id: string | undefined }
		>({
			query: ({ id }) => ({
				url: `/groups/${id}`,
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}),
			providesTags: ['groupCourses'],
		}),
		getCourseDetails: builder.query<
			ICourseDetailsResponse,
			{ id: string | undefined }
		>({
			query: ({ id }) => ({
				url: `/courses/${id}/details`,
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}),
			providesTags: ['groupCourses'],
		}),
		getCoursesMy: builder.query<IGroupCoursesResponse[], any>({
			query: () => ({
				url: `/courses/my`,
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}),
			providesTags: ['coursesMy'],
		}),
		getCoursesTeaching: builder.query<IGroupCoursesResponse[], any>({
			query: () => ({
				url: `/courses/teaching`,
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}),
			providesTags: ['coursesTeaching'],
		}),
		createCourse: builder.mutation<
			any,
			{ body: ICourseCreate; groupId: string | undefined }
		>({
			query: data => ({
				url: `courses/${data.groupId}`,
				body: data.body,
				method: 'POST',
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}),
			invalidatesTags: ['groupCourses'],
		}),
		editCourseStatus: builder.mutation<any, ICourseEditStatus>({
			query: ({ courseId: courseId, status: status }) => ({
				url: `/courses/${courseId}/status`,
				body: { status },
				method: 'POST',
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}),
			invalidatesTags: ['groupCourses'],
		}),
	}),
})

export const {
	useCreateCourseMutation,
	useGetGroupCoursesQuery,
	useGetCoursesMyQuery,
	useGetCoursesTeachingQuery,
	useGetCourseDetailsQuery,
	useEditCourseStatusMutation,
} = coursesApi
