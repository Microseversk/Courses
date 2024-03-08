import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ICourseDetailsResponse } from '../../types/response.types'

interface ICourseState {
	course: ICourseDetailsResponse | null
}
const initialState: ICourseState = {
	course: null,
}

export const openedCourseSlice = createSlice({
	name: 'openedCourseSlice',
	reducerPath: 'openedCourse',
	initialState: initialState,
	reducers: {
		setCourse(
			state,
			{ payload }: PayloadAction<ICourseDetailsResponse | null>
		) {
			state.course = payload
		},
	},
})

export const { setCourse } = openedCourseSlice.actions
export default openedCourseSlice.reducer
