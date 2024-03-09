import { Container, ListGroup } from 'react-bootstrap'
import { useGetCoursesMyQuery } from '../../../store/api/coursesApi'
import { Loader } from '../../layouts/loader/Loader'
import { CourseItem } from '../groupCoursesPage/CourseItem'

export default function MyCoursesPage() {
	const { data: courses, isLoading } = useGetCoursesMyQuery('')

	if (isLoading) {
		return <Loader />
	}

	return (
		<Container>
			<ListGroup className={'mt-3'}>
				{!courses?.length ? (
					<span className={'fs-2 text-danger'}>Вы никуда не записаны</span>
				) : (
					<span className={'fs-2 mb-3'}>Мои курсы</span>
				)}
				{courses?.map(course => (
					<CourseItem
						key={course.id}
						id={course.id}
						name={course.name}
						startYear={course.startYear}
						maximumStudentsCount={course.maximumStudentsCount}
						remainingSlotsCount={course.remainingSlotsCount}
						status={course.status}
						semester={course.semester}
					/>
				))}
			</ListGroup>
		</Container>
	)
}
