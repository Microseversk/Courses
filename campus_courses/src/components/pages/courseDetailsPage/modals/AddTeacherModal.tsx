import { FormEvent, useEffect, useState } from 'react'
import { Button, Form, FormLabel, Modal } from 'react-bootstrap'
import ReactSelect from 'react-select'
import { useToastMutate } from '../../../../hooks/useToastMutate'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useAddTeacherMutation } from '../../../../store/api/coursesApi'
import { useGetUsersQuery } from '../../../../store/api/usersApi'
import { ButtonCustom } from '../../../shared/ButtonCustom'

type AddTeacherModalProps = {
	isShow: boolean
	onHide: () => void
}

export function AddTeacherModal(props: AddTeacherModalProps) {
	const courseId = useTypedSelector(state => state.openedCourse?.course?.id)
	const students = useTypedSelector(state => state.openedCourse?.course?.students)
	const { data: users } = useGetUsersQuery('')
	const [addTeacher, { isSuccess, isError, isLoading }] = useAddTeacherMutation()
	const [teacher, setTeacher] = useState('')
	useToastMutate(isSuccess, isError, 'Учитель добавлен')

	const onAddTeacher = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		addTeacher({ courseId: courseId!, userId: teacher })
	}

	useEffect(() => {
		if (!isLoading) {
			props.onHide()
		}
	}, [isLoading])

	return (
		<Modal
			size='lg'
			show={props.isShow}
			onHide={() => {
				props.onHide()
				setTeacher('')
			}}>
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body>
				<Form id='addTeacherModal' onSubmit={onAddTeacher}>
					<FormLabel>Выберите преподавателя</FormLabel>
					<ReactSelect
						defaultValue={{ label: 'Не выбрано', value: teacher }}
						options={users
							?.slice()
							.filter(u => !students?.some(s => s.id === u.id))
							.map(user => ({ label: user.fullName, value: user.id }))}
						onChange={e => {
							e && setTeacher(e.value)
						}}
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button className='btn-secondary' onClick={props.onHide}>
					Отмена
				</Button>
				<ButtonCustom
					type={'submit'}
					form='addTeacherModal'
					disabled={teacher === ''}
					text={'Сохранить'}
					isLoading={isLoading}
				/>
			</Modal.Footer>
		</Modal>
	)
}
