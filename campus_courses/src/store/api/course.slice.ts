import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ICourseDetailsResponse } from '../../types/response.types'

interface ICourseState {
	course: ICourseDetailsResponse | null
}
const initialState: ICourseState = {
	course: null,
}

export const courseSlice = createSlice({
	name: 'courseSlice',
	reducerPath: 'course',
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

export const { setCourse } = courseSlice.actions
export default courseSlice.reducer
