import { Container, ListGroup } from 'react-bootstrap'
import { useTitle } from '../../../hooks/useTitle'
import { useGetCoursesTeachingQuery } from '../../../store/api/coursesApi'
import { Loader } from '../../layouts/loader/Loader'
import { CourseItem } from '../groupCoursesPage/CourseItem'

export default function TeachingCoursesPage() {
	useTitle('Преподаваемые курсы')
	const { data: courses, isLoading } = useGetCoursesTeachingQuery('')
	if (isLoading) {
		return <Loader />
	}

	return (
		<Container>
			<ListGroup className={'mt-3'}>
				{!courses?.length ? (
					<span className={'fs-2 text-danger'}>Вы никуда не записаны</span>
				) : (
					<span className={'fs-2 mb-3'}>Преподаваемые курсы</span>
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
