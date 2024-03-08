import {
	CourseCreateType,
	EditCourseTeacherType,
	ICourseEditStatus,
	ICourseNotificationCreate,
	SetMarkType,
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
			providesTags: ['groupCourses', 'courseDetails'],
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
			invalidatesTags: ['groupCourses', 'courseDetails'],
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
			invalidatesTags: ['courseDetails'],
		}),
		signUpToCourse: builder.mutation<any, { courseId: string }>({
			query: ({ courseId }) => ({
				url: `courses/${courseId}/sign-up`,
				method: 'POST',
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}),
		}),
		editCourseTeacher: builder.mutation<
			any,
			{ courseId: string; body: EditCourseTeacherType }
		>({
			query: ({ courseId, body }) => ({
				url: `/courses/${courseId}`,
				body: body,
				method: 'PUT',
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}),
			invalidatesTags: ['courseDetails'],
		}),
		//TODO Проверить необходимость эндпоинта
		editCourseAdmin: builder.mutation<
			any,
			{ courseId: string; body: CourseCreateType }
		>({
			query: ({ courseId, body }) => ({
				url: `/courses/${courseId}`,
				body: body,
				method: 'PUT',
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}),
			invalidatesTags: ['courseDetails'],
		}),
		setNewStudentStatus: builder.mutation<
			any,
			{ status: 'Accepted' | 'Declined'; courseId: string; userId: string }
		>({
			query: ({ courseId, userId, status }) => ({
				url: `/courses/${courseId}/student-status/${userId}`,
				body: { status },
				method: 'POST',
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}),
			invalidatesTags: ['courseDetails'],
		}),
		addTeacher: builder.mutation<any, { courseId: string; userId: string }>({
			query: ({ courseId, userId }) => ({
				url: `courses/${courseId}/teachers`,
				body: { userId },
				method: 'POST',
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}),
			invalidatesTags: ['courseDetails'],
		}),
		setMark: builder.mutation<
			any,
			{ courseId: string; studentId: string; body: SetMarkType }
		>({
			query: ({ courseId, studentId, body }) => ({
				url: `/courses/${courseId}/marks/${studentId}`,
				body: body,
				method: 'POST',
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}),
			invalidatesTags: ['courseDetails'],
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
	useEditCourseTeacherMutation,
	useSetNewStudentStatusMutation,
	useAddTeacherMutation,
	useSetMarkMutation,
} = coursesApi
