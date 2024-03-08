import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setCourse } from '../../../store/api/course.slice'
import { useGetCourseDetailsQuery } from '../../../store/api/coursesApi'
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
				<CommonCourseDetails
					name={courseDetails.name}
					startYear={courseDetails.startYear}
					semester={courseDetails.semester}
					status={courseDetails.status}
					maximumStudentsCount={courseDetails.maximumStudentsCount}
					studentsEnrolledCount={courseDetails.studentsEnrolledCount}
					studentsInQueueCount={courseDetails.studentsInQueueCount}
				/>
				<InfoTabsCourseDetails
					requirements={courseDetails.requirements}
					annotations={courseDetails.annotations}
					notifications={courseDetails.notifications}
					className={'mt-3'}
				/>
				<MemberTabsDetails
					students={courseDetails.students}
					teachers={courseDetails.teachers}
					className={'mt-3'}
				/>
			</Container>
		)
	} else {
		return <>Что-то пошло не так...</>
	}
}
