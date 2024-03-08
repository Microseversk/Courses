import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { accountApi } from './api/accountApi'
import { coursesApi } from './api/coursesApi'
import { groupsApi } from './api/groupsApi'
import { usersApi } from './api/usersApi'
import { authSlice } from './slices/auth.slice'
import { openedCourseSlice } from './slices/course.slice'

const rootReducer = combineReducers({
	//Server store
	[accountApi.reducerPath]: accountApi.reducer,
	[groupsApi.reducerPath]: groupsApi.reducer,
	[coursesApi.reducerPath]: coursesApi.reducer,
	[usersApi.reducerPath]: usersApi.reducer,
	//Local store
	[authSlice.reducerPath]: authSlice.reducer,
	[openedCourseSlice.reducerPath]: openedCourseSlice.reducer,
})

export const store = configureStore({
	reducer: rootReducer,
	devTools: true,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(accountApi.middleware)
			.concat(groupsApi.middleware)
			.concat(coursesApi.middleware)
			.concat(usersApi.middleware),
})

export type RootReducer = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
