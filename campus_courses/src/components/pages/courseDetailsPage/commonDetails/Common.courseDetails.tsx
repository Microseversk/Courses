import { Button, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useModal } from '../../../../hooks/useModal'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useSignUpToCourseMutation } from '../../../../store/api/coursesApi'
import { UserCourseRole } from '../../../../store/slices/course.slice'
import { ChangeStatusModal } from '../modals/ChangeStatusModal'

export function CommonCourseDetails() {
	const { course, userCourseRole } = useTypedSelector(
		state => state?.openedCourse
	)
	const [signUp] = useSignUpToCourseMutation()
	const { isShow, onHide, onShow } = useModal()

	if (!course || !userCourseRole) {
		return <>Ошибка данных курса</>
	}

	console.log(course, userCourseRole)

	return (
		<>
			<ChangeStatusModal
				status={course.status}
				onHide={onHide}
				isShow={isShow}
				courseId={course.id}
			/>
			<div className={'fs-2 fw-bold'}>{course.name}</div>
			<div className={'d-flex align-items-end justify-content-between'}>
				<div className={'fw-bold mt-1'}>Основные данные курса</div>
				{[
					UserCourseRole.Admin,
					UserCourseRole.MainTeacher,
					UserCourseRole.Teacher,
				].includes(userCourseRole) && (
					<Button className={'btn-warning'}>РЕДАКТИРОВАТЬ</Button>
				)}
			</div>
			<ListGroup className={'mt-2'}>
				<ListGroupItem>
					<Row className={'d-flex align-content-stretch'}>
						<Col>
							<div className={'fw-bold'}>Статус курса</div>
							<div className={'text-success'}>
								{course.status === 'Started' ? (
									<span className={'text-primary'}>в процессе обучения</span>
								) : course.status === 'OpenForAssigning' ? (
									<span className={'text-success'}>Открыт для записи</span>
								) : course.status === 'Created' ? (
									<span className={'text-secondary'}>Создан</span>
								) : course.status === 'Finished' ? (
									<span className={'text-danger'}>Закрыт</span>
								) : (
									<></>
								)}
							</div>
						</Col>
						<Col className={'text-end'}>
							{[
								UserCourseRole.Admin,
								UserCourseRole.MainTeacher,
								UserCourseRole.Teacher,
							].includes(userCourseRole) && (
								<Button className={'btn-warning h-100'} onClick={onShow}>
									ИЗМЕНИТЬ
								</Button>
							)}
							{course.status === 'OpenForAssigning' &&
								userCourseRole === UserCourseRole.Student && (
									<Button className='btn-success h-100'>
										ЗАПИСАТЬСЯ НА КУРС
									</Button>
								)}
							{course.status === 'OpenForAssigning' &&
								userCourseRole === UserCourseRole.InQueue && (
									<Button className='btn-primary h-100'>В ОЧЕРЕДИ</Button>
								)}
							{course.status === 'OpenForAssigning' &&
								userCourseRole === UserCourseRole.Declined && (
									<Button className='btn-danger h-100'>ОТКАЗАНО</Button>
								)}
						</Col>
					</Row>
				</ListGroupItem>
				<ListGroupItem>
					<Row className={'d-flex align-content-stretch'}>
						<Col>
							<div className={'fw-bold'}>Учебный год</div>
							<div>{course?.startYear}</div>
						</Col>
						<Col>
							<div className={'fw-bold'}>Семестр</div>
							<div>
								{course?.semester === 'Autumn' ? 'Осенний' : 'Весенний'}
							</div>
						</Col>
					</Row>
				</ListGroupItem>
				<ListGroupItem>
					<Row className={'d-flex align-content-stretch'}>
						<Col>
							<div className={'fw-bold'}>Всего мест</div>
							<div>{course.maximumStudentsCount}</div>
						</Col>
						<Col>
							<div className={'fw-bold'}>Студентов зачислено</div>
							<div>{course.studentsEnrolledCount}</div>
						</Col>
					</Row>
				</ListGroupItem>
				<ListGroupItem>
					<Row className={'d-flex align-content-stretch'}>
						<Col>
							<div className={'fw-bold'}>Заявок на рассмотрении</div>
							<div>{course.studentsInQueueCount}</div>
						</Col>
					</Row>
				</ListGroupItem>
			</ListGroup>
		</>
	)
}
