import { useEffect } from 'react'
import { Button, Form, FormCheck, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useToastMutate } from '../../../../hooks/useToastMutate'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useEditCourseStatusMutation } from '../../../../store/api/coursesApi'
import { ICourseEditStatus } from '../../../../types/request.types'
import { ButtonCustom } from '../../../shared/ButtonCustom'

interface IChangeStatusModalProps {
	isShow: boolean
	onHide: () => void
}

export function ChangeStatusModal(props: IChangeStatusModalProps) {
	const [editStatus, { isSuccess, isError, isLoading }] = useEditCourseStatusMutation()
	const { status, id } = useTypedSelector(state => state.openedCourse.course!)

	const onChangeCourseStatus: SubmitHandler<ICourseEditStatus> = data => {
		editStatus(data)
	}

	const { register, handleSubmit, setValue, reset } = useForm<ICourseEditStatus>({
		defaultValues: {
			courseId: id,
			status: status,
		},
	})

	useToastMutate(isSuccess, isError, 'Статус изменён')

	setValue('status', status)
	useEffect(() => {
		if (!isLoading) {
			props.onHide()
		}
	}, [isLoading])

	return (
		<Modal
			show={props.isShow}
			onHide={() => {
				props.onHide()
				reset()
			}}
			size={'lg'}>
			<ModalHeader closeButton>Изменение статуса курса</ModalHeader>
			<ModalBody>
				<Form
					onSubmit={handleSubmit(onChangeCourseStatus)}
					className={'d-flex gap-3 flex-column  flex-md-row'}
					id={'formChangeStatus'}>
					<FormCheck
						{...register('status')}
						name={'status'}
						value={'Created'}
						type={'radio'}
						label={'Создан'}
						disabled={status !== 'Created'}
						id={'status_1'}
					/>
					<FormCheck
						{...register('status')}
						value={'OpenForAssigning'}
						name={'status'}
						type={'radio'}
						label={'Открыт для записи'}
						disabled={status === 'Started' || status === 'Finished'}
						id={'status_2'}
					/>
					<FormCheck
						{...register('status')}
						name={'status'}
						value={'Started'}
						type={'radio'}
						label={'В процессе'}
						disabled={status === 'Finished'}
						id={'status_3'}
					/>
					<FormCheck
						{...register('status')}
						name={'status'}
						value={'Finished'}
						type={'radio'}
						label={'Завершен'}
						disabled={status === 'Finished'}
						id={'status_4'}
					/>
				</Form>
			</ModalBody>
			<ModalFooter>
				<Button className={'btn-secondary'} onClick={props.onHide}>
					Отмена
				</Button>
				<ButtonCustom type={'submit'} form={'formChangeStatus'} isLoading={isLoading} text={'Сохранить'}>
					Сохранить
				</ButtonCustom>
			</ModalFooter>
		</Modal>
	)
}
