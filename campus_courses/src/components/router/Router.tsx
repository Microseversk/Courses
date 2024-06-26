import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { PrivateLayout } from '../layouts/PrivateLayout'
import { PublicLayout } from '../layouts/PublicLayout'
import { Header } from '../layouts/header/Header'
import { Loader } from '../layouts/loader/Loader'
import CourseDetailsPage from '../pages/courseDetailsPage/CourseDetailsPage'
import GreetingPage from '../pages/greetingPage/GreetingPage'
import GroupCoursesPage from '../pages/groupCoursesPage/GroupCoursesPage'
import GroupsPage from '../pages/groupsPage/GroupsPage'
import LoginPage from '../pages/loginPage/LoginPage'
import MyCoursesPage from '../pages/myCoursesPage/MyCoursesPage'
import NotFoundPage from '../pages/notFoundPage/NotFoundPage'
import ProfilePage from '../pages/profilePage/ProfilePage'
import RegistrationPage from '../pages/registrationPage/RegistrationPage'
import TeachingCoursesPage from '../pages/teachingCoursesPage/TeachingCoursesPage'

export function Router() {
	const isAuth = useTypedSelector(state => state.auth.isAuth)
	return (
		<Suspense
			fallback={
				<>
					<Header />
					<Loader />
				</>
			}>
			<Routes>
				<Route
					path='/'
					element={
						window.localStorage.getItem('token') || isAuth ? (
							<PrivateLayout children={<GreetingPage />} />
						) : (
							<PublicLayout children={<GreetingPage />} />
						)
					}
				/>
				<Route path='/login' element={<PublicLayout children={<LoginPage />} />} />
				<Route path='/registration' element={<PublicLayout children={<RegistrationPage />} />} />
				<Route path='/groups' element={<PrivateLayout children={<GroupsPage />} />} />
				<Route path='/groups/:id' element={<PrivateLayout children={<GroupCoursesPage />} />} />
				<Route path='/courses/my' element={<PrivateLayout children={<MyCoursesPage />} />} />
				<Route path='/courses/teaching' element={<PrivateLayout children={<TeachingCoursesPage />} />} />
				<Route path='/courses/:id' element={<PrivateLayout children={<CourseDetailsPage />} />} />
				<Route path='/profile' element={<PrivateLayout children={<ProfilePage />} />} />
				<Route path='*' element={<PrivateLayout children={<NotFoundPage />} />} />)
			</Routes>
		</Suspense>
	)
}
