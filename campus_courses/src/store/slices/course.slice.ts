import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ICourseDetailsResponse } from '../../types/response.types'

export enum UserCourseRole {
	Admin = 'Admin',
	MainTeacher = 'MainTeacher',
	Teacher = 'Teacher',
	Accepted = 'Accepted',
	InQueue = 'InQueue',
	Declined = 'Declined',
	Student = 'Student',
}

interface ICourseState {
	course: ICourseDetailsResponse | null
	userCourseRole: UserCourseRole | null
}

const initialState: ICourseState = {
	course: null,
	userCourseRole: null,
}

export const openedCourseSlice = createSlice({
	name: 'openedCourseSlice',
	reducerPath: 'openedCourse',
	initialState: initialState,
	reducers: {
		setCourse(state, { payload }: PayloadAction<ICourseState>) {
			state.course = payload?.course
			state.userCourseRole = payload?.userCourseRole
		},
	},
})

export const { setCourse } = openedCourseSlice.actions
export default openedCourseSlice.reducer
