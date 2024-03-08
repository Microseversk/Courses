import { useState } from 'react'
import { Button, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { ChangeStatusModal } from '../modals/ChangeStatusModal'

interface ICommonCourseDetailsProps {
	name: string
	startYear: number
	semester: 'Autumn' | 'Spring'
	status: 'Started' | 'OpenForAssigning' | 'Created' | 'Finished'
	maximumStudentsCount: number
	studentsEnrolledCount: number
	studentsInQueueCount: number
}

export function CommonCourseDetails() {
	const courseDetails = useTypedSelector(state => state.openedCourse.course)
	const [isChangingStatus, setIsChangingStatus] = useState(false)

	if (!courseDetails) {
		return <>Ошибка данных курса</>
	}

	return (
		<>
			<ChangeStatusModal
				status={courseDetails.status}
				onHide={() => setIsChangingStatus(false)}
				isShow={isChangingStatus}
			/>
			<div className={'fs-2 fw-bold'}>{courseDetails?.name}</div>
			<div className={'d-flex align-items-end justify-content-between'}>
				<div className={'fw-bold'}>Основные данные курса</div>
				<Button className={'btn-warning'}>РЕДАКТИРОВАТЬ</Button>
			</div>
			<ListGroup className={'mt-2'}>
				<ListGroupItem>
					<Row className={'d-flex align-content-stretch'}>
						<Col>
							<div className={'fw-bold'}>Статус курса</div>
							<div className={'text-success'}>
								{courseDetails?.status === 'Started' ? (
									<span className={'text-primary'}>в процессе обучения</span>
								) : courseDetails?.status === 'OpenForAssigning' ? (
									<span className={'text-success'}>Открыт для записи</span>
								) : courseDetails?.status === 'Created' ? (
									<span className={'text-secondary'}>Создан</span>
								) : courseDetails?.status === 'Finished' ? (
									<span className={'text-danger'}>Закрыт</span>
								) : (
									<></>
								)}
							</div>
						</Col>
						<Col className={'text-end'}>
							<Button
								className={'btn-warning h-100'}
								onClick={() => setIsChangingStatus(true)}
							>
								ИЗМЕНИТЬ
							</Button>
						</Col>
					</Row>
				</ListGroupItem>
				<ListGroupItem>
					<Row className={'d-flex align-content-stretch'}>
						<Col>
							<div className={'fw-bold'}>Учебный год</div>
							<div>{courseDetails?.startYear}</div>
						</Col>
						<Col>
							<div className={'fw-bold'}>Семестр</div>
							<div>
								{courseDetails?.semester === 'Autumn' ? 'Осенний' : 'Весенний'}
							</div>
						</Col>
					</Row>
				</ListGroupItem>
				<ListGroupItem>
					<Row className={'d-flex align-content-stretch'}>
						<Col>
							<div className={'fw-bold'}>Всего мест</div>
							<div>{courseDetails?.maximumStudentsCount}</div>
						</Col>
						<Col>
							<div className={'fw-bold'}>Студентов зачислено</div>
							<div>{courseDetails?.studentsEnrolledCount}</div>
						</Col>
					</Row>
				</ListGroupItem>
				<ListGroupItem>
					<Row className={'d-flex align-content-stretch'}>
						<Col>
							<div className={'fw-bold'}>Заявок на рассмотрении</div>
							<div>{courseDetails?.studentsInQueueCount}</div>
						</Col>
					</Row>
				</ListGroupItem>
			</ListGroup>
		</>
	)
}
