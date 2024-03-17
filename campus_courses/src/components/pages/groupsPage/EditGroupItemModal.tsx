import { useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useEditGroupMutation } from '../../../store/api/groupsApi'
import { ButtonCustom } from '../../shared/ButtonCustom'
import { ErrorMessage } from '../../shared/ErrorMessage'

interface EditGroupItemModalProps {
	isShow: boolean
	onHide: () => void
	name: string
	id: string
}

interface IGroupeEdit {
	id: string
	name: string
}

export function EditGroupItemModal(props: EditGroupItemModalProps) {
	const [editGroup, { isLoading }] = useEditGroupMutation()
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<IGroupeEdit>()

	useEffect(() => {
		if (props.isShow) {
			setValue('id', props.id)
			setValue('name', props.name)
		}
	}, [props.name, props.isShow])

	const onHideModal = () => {
		if (!isLoading) {
			props.onHide()
		}
	}

	useEffect(() => {
		if (isLoading === false) {
			onHideModal()
		}
	}, [isLoading])

	const onEditGroup: SubmitHandler<IGroupeEdit> = data => {
		editGroup(data)
	}

	return (
		<Modal show={props.isShow} onHide={onHideModal} size={'lg'}>
			<Modal.Header closeButton>
				<Modal.Title>Редактирование группы</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit(onEditGroup)} id='editGroupForm'>
					<Form.Label>Название группы</Form.Label>
					<Form.Control
						{...register('name', { required: 'Введите новое имя группы' })}
					/>
					{errors.name && <ErrorMessage text={errors.name.message} />}
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button className={'btn-secondary'} onClick={onHideModal}>
					Отмена
				</Button>
				<ButtonCustom
					type='submit'
					isLoading={isLoading}
					text='Сохранить'
					form='editGroupForm'
				>
					Сохранить
				</ButtonCustom>
			</Modal.Footer>
		</Modal>
	)
}
