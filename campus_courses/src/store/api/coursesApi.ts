import {
	CourseCreateType,
	ICourseEditStatus,
	ICourseNotificationCreate,
} from '../../types/request.types'
import {
	ICourseDetailsResponse,
	IGroupCoursesResponse,
} from '../../types/response.types'
import { api } from './api'

export const coursesApi = api.injectEndpoints({
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
			{ body: CourseCreateType; groupId: string | undefined }
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
			query: ({ courseId, status }) => ({
				url: `/courses/${courseId}/status`,
				body: { status },
				method: 'POST',
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}),
			invalidatesTags: ['groupCourses'],
		}),
		createNotification: builder.mutation<
			any,
			{ courseId: string; body: ICourseNotificationCreate }
		>({
			query: ({ courseId, body }) => ({
				url: `/courses/${courseId}/notifications`,
				body: body,
				method: 'POST',
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}),
			invalidatesTags: ['groupCourses'],
		}),
		signUpToCourse: builder.mutation<any, { courseId: string }>({
			query: ({ courseId }) => ({
				url: `courses/${courseId}/sign-up`,
				method: 'POST',
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}),
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
	useCreateNotificationMutation,
	useSignUpToCourseMutation,
} = coursesApi
