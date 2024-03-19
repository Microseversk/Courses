import { useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useToastMutate } from '../../../hooks/useToastMutate'
import { useCreateGroupMutation } from '../../../store/api/groupsApi'
import { ButtonCustom } from '../../shared/ButtonCustom'
import { ErrorMessage } from '../../shared/ErrorMessage'

interface ICreateGroup {
	name: string
}

interface CreateGroupItemModalProps {
	isShow: boolean
	onHide: () => void
}

export function CreateGroupItemModal(props: CreateGroupItemModalProps) {
	const [createGroup, { isLoading, isSuccess, isError }] = useCreateGroupMutation()
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ICreateGroup>()

	useToastMutate(isSuccess, isError, 'Группа создана')

	const onCreateGroup: SubmitHandler<ICreateGroup> = data => {
		createGroup(data)
	}

	const onHideModal = () => {
		if (!isLoading) {
			props.onHide()
			reset()
		}
	}

	useEffect(() => {
		if (isLoading === false) {
			onHideModal()
		}
	}, [isLoading])

	return (
		<Modal show={props.isShow} onHide={onHideModal} size={'lg'}>
			<Modal.Header closeButton>
				<Modal.Title>Создание группы</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit(onCreateGroup)} id='createGroupForm'>
					<Form.Label>Название новой группы</Form.Label>
					<Form.Control {...register('name', { required: 'Введите название группы' })} />
					{errors.name && <ErrorMessage text={errors.name.message} />}
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button className={'btn-secondary'} onClick={onHideModal}>
					Отмена
				</Button>
				<ButtonCustom text='Создать' type='submit' isLoading={isLoading} form='createGroupForm' />
			</Modal.Footer>
		</Modal>
	)
}
