import { FormEvent, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useCreateNotificationMutation } from '../../../../store/api/coursesApi'

type ICreateNotificationModalProps = {
	isShow: boolean
	onHide: () => void
}

export function CreateNotificationModal(props: ICreateNotificationModalProps) {
	const courseId = useTypedSelector(state => state.openedCourse.course?.id!)
	const [createNotify] = useCreateNotificationMutation()
	const [text, setText] = useState('')
	const [isImportant, setIsImportant] = useState(false)

	const handleCreateNotification = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		createNotify({ courseId, body: { text, isImportant } })
		props.onHide()
		setText('')
		setIsImportant(false)
	}
	return (
		<Modal show={props.isShow} onHide={props.onHide}>
			<Modal.Header closeButton>Создание уведомления</Modal.Header>
			<Modal.Body>
				<Form id='createNotifyForm' onSubmit={handleCreateNotification}>
					<Form.Control
						as='textarea'
						rows={4}
						value={text}
						onChange={e => setText(e.target.value)}
					/>
					<Form.Check
						checked={isImportant}
						onChange={() => {
							setIsImportant(!isImportant)
						}}
						className='mt-2'
						type='checkbox'
						label='Важное'
					></Form.Check>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button className='btn-secondary' onClick={props.onHide}>
					Отмена
				</Button>
				<Button form='createNotifyForm' type='submit'>
					Сохранить
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
