import { FormEvent, useState } from 'react'
import {
	Button,
	Form,
	FormCheck,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from 'react-bootstrap'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useEditCourseStatusMutation } from '../../../../store/api/coursesApi'
import { CourseStatus } from '../../../../types/response.types'

interface IChangeStatusModalProps {
	isShow: boolean
	onHide: () => void
}

export function ChangeStatusModal(props: IChangeStatusModalProps) {
	const { status, id } = useTypedSelector(state => state.openedCourse.course!)
	const [editStatus] = useEditCourseStatusMutation()
	const [newStatus, setNewStatus] = useState<
		'Started' | 'OpenForAssigning' | 'Created' | 'Finished'
	>(status)
	const handleChangeStatus = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		editStatus({ courseId: id, status: newStatus })
		props.onHide()
	}

	return (
		<Modal
			show={props.isShow}
			onHide={() => {
				props.onHide()
				setNewStatus(status)
			}}
			size={'lg'}
		>
			<ModalHeader closeButton>Изменение статуса курса</ModalHeader>
			<ModalBody>
				<Form
					onSubmit={handleChangeStatus}
					className={'d-flex gap-3'}
					id={'formChangeStatus'}
				>
					<FormCheck
						onChange={() => setNewStatus(CourseStatus.Created)}
						name={'status'}
						checked={newStatus === 'Created'}
						type={'radio'}
						label={'Создан'}
						disabled={status !== 'Created'}
					/>
					<FormCheck
						onChange={() => setNewStatus(CourseStatus.OpenForAssigning)}
						checked={newStatus === 'OpenForAssigning'}
						name={'status'}
						type={'radio'}
						label={'Открыт для записи'}
						disabled={status === 'Started' || status === 'Finished'}
					/>
					<FormCheck
						onChange={() => setNewStatus(CourseStatus.Started)}
						name={'status'}
						checked={newStatus === 'Started'}
						type={'radio'}
						label={'В процессе'}
						disabled={status === 'Finished'}
					/>
					<FormCheck
						onChange={() => setNewStatus(CourseStatus.Finished)}
						name={'status'}
						checked={newStatus === 'Finished'}
						type={'radio'}
						label={'Завершен'}
						disabled={status === 'Finished'}
					/>
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button className={'btn-secondary'} onClick={props.onHide}>
					Отмена
				</Button>
				<Button type={'submit'} form={'formChangeStatus'}>
					Сохранить
				</Button>
			</ModalFooter>
		</Modal>
	)
}
