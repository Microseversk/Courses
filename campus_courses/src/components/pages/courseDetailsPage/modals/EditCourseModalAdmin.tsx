import { useEffect } from 'react'
import {
	Button,
	Form,
	FormCheck,
	FormControl,
	FormLabel,
	FormSelect,
	Modal,
} from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useEditCourseAdminMutation } from '../../../../store/api/coursesApi'
import { useGetUsersQuery } from '../../../../store/api/usersApi'
import { CourseCreateType } from '../../../../types/request.types'
import { ButtonCustom } from '../../../shared/ButtonCustom'
import { TextEditToolbar } from '../../../shared/TextEditToolbar'

interface IEditCourseModalProps {
	isShow: boolean
	onHide: () => void
}

export function EditCourseModalAdmin(props: IEditCourseModalProps) {
	const course = useTypedSelector(state => state.openedCourse.course)
	const { data: users } = useGetUsersQuery('')
	const [editCourse, { isLoading }] = useEditCourseAdminMutation()

	const { register, reset, getValues, setValue, handleSubmit } =
		useForm<CourseCreateType>({
			defaultValues: course!,
		})

	useEffect(() => {
		reset(course!)
		if (course?.annotations && course.requirements) {
			setValue('annotations', course?.annotations)
			setValue('requirements', course?.requirements)
		}
	}, [props.onHide])

	useEffect(() => {
		if (!isLoading) {
			props.onHide()
		}
	}, [isLoading])

	const onEditCourseByAdmin: SubmitHandler<CourseCreateType> = data => {
		editCourse({ courseId: course?.id!, body: data })
	}
	return (
		<Modal size='lg' show={props.isShow} onHide={props.onHide}>
			<Modal.Header closeButton>Редактировать курс</Modal.Header>
			<Modal.Body>
				<Form
					onSubmit={handleSubmit(onEditCourseByAdmin)}
					id='editCourseTeacherForm'
				>
					<FormLabel>Название курса</FormLabel>
					<FormControl {...register('name')} />
					<FormLabel className={'mt-3'}>Год начала курса</FormLabel>
					<FormControl {...register('startYear')} type={'number'} />
					<FormLabel className={'mt-3'}>Общее количество мест</FormLabel>
					<FormControl {...register('maximumStudentsCount')} type={'number'} />
					<FormLabel className={'mt-3'}>Семестр</FormLabel>
					<div className={'d-flex gap-3'}>
						<FormCheck
							{...register('semester')}
							name={'semester'}
							type={'radio'}
							value={'Autumn'}
							label={'Осенний'}
						/>
						<FormCheck
							{...register('semester')}
							name={'semester'}
							type={'radio'}
							value={'Spring'}
							label={'Весенний'}
						/>
					</div>
					<FormLabel className={'mt-3'}>Требования</FormLabel>
					<TextEditToolbar
						value={getValues('requirements')}
						handleChange={(value: string) => setValue('requirements', value)}
					/>
					<FormLabel className={'mt-3'}>Аннотации</FormLabel>
					<TextEditToolbar
						value={getValues('annotations')}
						handleChange={(value: string) => setValue('annotations', value)}
					/>
					<FormLabel className={'mt-3'}>Основной преподаватель курса</FormLabel>
					<FormSelect {...register('mainTeacherId')}>
						<option value=''>Не выбрано</option>
						{users?.map(user => (
							<option key={user.id} value={user.id}>
								{user.fullName}
							</option>
						))}
					</FormSelect>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button className='btn-secondary' onClick={props.onHide}>
					Отмена
				</Button>
				<ButtonCustom
					type='submit'
					text='Сохранить'
					form='editCourseTeacherForm'
					isLoading={isLoading}
				/>
			</Modal.Footer>
		</Modal>
	)
}
