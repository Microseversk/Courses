import { MDBListGroupItem } from 'mdb-react-ui-kit'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { IGroupCoursesResponse } from '../../../types/response.types'

export function CourseItem(props: IGroupCoursesResponse) {
	const nav = useNavigate()
	return (
		<MDBListGroupItem action onClick={() => nav(`/courses/${props.id}`)}>
			<Row>
				<Col lg={10}>
					<div className={' fw-bold fs-5 overflow-auto '}>{props.name}</div>
				</Col>
				<Col lg={2} className={'text-success text-end'}>
					{props.status === 'Started' ? (
						<span className={'text-primary'}>В процессе обучения</span>
					) : props.status === 'OpenForAssigning' ? (
						<span className={'text-success'}>Открыт для записи</span>
					) : props.status === 'Created' ? (
						<span className={'text-secondary'}>Создан</span>
					) : props.status === 'Finished' ? (
						<span className={'text-danger'}>Закрыт</span>
					) : (
						<></>
					)}
				</Col>
			</Row>
			<div className={'mt-1'}>
				Учебный год - <span>{props.startYear}</span>
			</div>
			<div>Семестр - {props.semester === 'Autumn' ? <span> Осенний </span> : <span> Весенний </span>}</div>
			<div className={'text-muted mt-1'}>Мест всего - {props.maximumStudentsCount}</div>
			<div className={'text-muted'}>Мест свободно - {props.remainingSlotsCount}</div>
		</MDBListGroupItem>
	)
}
