import { Button, Container, ListGroup } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useModal } from '../../../hooks/useModal'
import { useTitle } from '../../../hooks/useTitle'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useGetGroupCoursesQuery } from '../../../store/api/coursesApi'
import { useGetGroupsQuery } from '../../../store/api/groupsApi'
import { Loader } from '../../layouts/loader/Loader'
import NotFoundPage from '../notFoundPage/NotFoundPage'
import { CourseItem } from './CourseItem'
import { CreateCourseModal } from './CreateCourseModal'

export default function GroupCoursesPage() {
	const groupId = useParams()
	const isAdmin = useTypedSelector(state => state.auth.user?.roles?.isAdmin)
	const { data: courses, isLoading: isLoadingCourses } = useGetGroupCoursesQuery({ id: groupId?.id })

	const { isShow, onHide, onShow } = useModal()
	const { data: groups, isLoading: isLoadingGroups } = useGetGroupsQuery('')
	const groupName = groups?.filter(group => group.id === groupId?.id).pop()?.name
	useTitle(`Курсы ${groupName || ''}`)

	if (isLoadingCourses || isLoadingGroups) {
		return <Loader />
	}

	if (!groupName) {
		return <NotFoundPage />
	}

	return (
		<Container>
			<CreateCourseModal isShow={isShow} onHide={onHide} />
			<div className={'fw-bold fs-2'} style={{ textWrap: 'nowrap', overflow: 'auto' }}>
				Группа - {groupName}
			</div>
			{isAdmin && (
				<Button onClick={onShow} className={'mt-1'}>
					Создать курс
				</Button>
			)}
			<ListGroup className={'mt-3'}>
				{!courses?.length && <span className={'fs-2 text-danger'}>Курсы пока что не созданы</span>}
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
