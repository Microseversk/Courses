import { useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ValidateHelper } from '../../../helpers/ValidateHelper'
import { useToastMutate } from '../../../hooks/useToastMutate'
import { useEditGroupMutation } from '../../../store/api/groupsApi'
import { IModalProps } from '../../../types/common.types'
import { ButtonCustom } from '../../shared/ButtonCustom'
import { InputCustom } from '../../shared/InputCustom'

interface IEditGroupItemModalProps extends IModalProps {
	name: string
	id: string
}

interface IGroupeEdit {
	id: string
	name: string
}

export function EditGroupItemModal(props: IEditGroupItemModalProps) {
	const [editGroup, { isLoading, isSuccess, isError }] = useEditGroupMutation()
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

	useToastMutate(isSuccess, isError, 'Группа изменена')

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
					<InputCustom
						name='name'
						label={'Название группы'}
						register={register}
						validateFn={ValidateHelper.required}
						messageError={errors?.name?.message}
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button className={'btn-secondary'} onClick={onHideModal}>
					Отмена
				</Button>
				<ButtonCustom type='submit' isLoading={isLoading} text='Сохранить' form='editGroupForm'>
					Сохранить
				</ButtonCustom>
			</Modal.Footer>
		</Modal>
	)
}
