import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useGetCourseDetailsQuery } from '../../../store/api/coursesApi'
import { setCourse } from '../../../store/slices/course.slice'
import { AppDispatch } from '../../../store/store'
import { Loader } from '../../layouts/loader/Loader'
import { CommonCourseDetails } from './commonDetails/Common.courseDetails'
import { InfoTabsCourseDetails } from './infoTabsDetails/InfoTabs.courseDetails'
import { MemberTabsDetails } from './memberTabsDetails/MemberTabsDetails'

export function CourseDetailsPage() {
	const dispatch = useDispatch<AppDispatch>()
	const { id: courseId } = useParams<{ id: string }>()
	const {
		data: courseDetails,
		isLoading,
		error,
	} = useGetCourseDetailsQuery({ id: courseId })

	useEffect(() => {
		if (courseDetails) {
			dispatch(setCourse(courseDetails))
		} else {
			dispatch(setCourse(null))
		}
	}, [courseDetails])

	if (isLoading) {
		return <Loader />
	}
	if (error) {
		return (
			<Container className={'text-center text-danger'}>
				Такого курса не существует
			</Container>
		)
	}

	if (courseDetails) {
		return (
			<Container>
				<CommonCourseDetails />
				<InfoTabsCourseDetails className={'mt-3'} />
				<MemberTabsDetails className={'mt-3'} />
			</Container>
		)
	} else {
		return <>Что-то пошло не так...</>
	}
}
