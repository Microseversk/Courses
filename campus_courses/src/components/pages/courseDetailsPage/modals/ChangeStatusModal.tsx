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
import { CourseStatus } from '../../../../types/response.types'

interface IChangeStatusModalProps {
	isShow: boolean
	onHide: () => void
	status: 'Started' | 'OpenForAssigning' | 'Created' | 'Finished'
}

export function ChangeStatusModal(props: IChangeStatusModalProps) {
	const [newStatus, setNewStatus] = useState<
		'Started' | 'OpenForAssigning' | 'Created' | 'Finished'
	>(props.status)
	const handleChangeStatus = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log(newStatus)
	}

	return (
		<Modal
			show={props.isShow}
			onHide={() => {
				props.onHide()
				setNewStatus(props.status)
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
					/>
					<FormCheck
						onChange={() => setNewStatus(CourseStatus.OpenForAssigning)}
						checked={newStatus === 'OpenForAssigning'}
						name={'status'}
						type={'radio'}
						label={'Открыт для записи'}
					/>
					<FormCheck
						onChange={() => setNewStatus(CourseStatus.Started)}
						name={'status'}
						checked={newStatus === 'Started'}
						type={'radio'}
						label={'В процессе'}
					/>
					<FormCheck
						onChange={() => setNewStatus(CourseStatus.Finished)}
						name={'status'}
						checked={newStatus === 'Finished'}
						type={'radio'}
						label={'Завершен'}
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
