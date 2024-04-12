import { useEffect } from 'react'
import { Button, Form, FormCheck, FormLabel, Modal } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import ReactSelect from 'react-select'
import { ValidateHelper } from '../../../../helpers/ValidateHelper'
import { useToastMutate } from '../../../../hooks/useToastMutate'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useEditCourseAdminMutation } from '../../../../store/api/coursesApi'
import { useGetUsersQuery } from '../../../../store/api/usersApi'
import { IModalProps } from '../../../../types/common.types'
import { CourseCreateType } from '../../../../types/request.types'
import { ButtonCustom } from '../../../shared/ButtonCustom'
import { ErrorMessage } from '../../../shared/ErrorMessage'
import { InputCustom } from '../../../shared/InputCustom'
import { TextEditToolbar } from '../../../shared/TextEditToolbar'

export function EditCourseModalAdmin(props: IModalProps) {
	const course = useTypedSelector(state => state.openedCourse.course)
	const { data: users } = useGetUsersQuery('')
	const [editCourse, { isLoading, isSuccess, isError }] = useEditCourseAdminMutation()

	const {
		register,
		clearErrors,
		control,
		setValue,
		formState: { errors },
		handleSubmit,
	} = useForm<CourseCreateType>({
		mode: 'onChange',
	})

	useEffect(() => {
		if (!isLoading) {
			props.onHide()
		}
	}, [isLoading])

	useToastMutate(isSuccess, isError, 'Курс изменён')

	useEffect(() => {
		clearErrors()
		register('annotations', { required: 'Обязательное поле' })
		register('requirements', { required: 'Обязательное поле' })
		register('mainTeacherId', { required: 'Обязательное поле' })
		if (props.isShow) {
			setValue('name', course?.name!)
			setValue('startYear', course?.startYear!)
			setValue('maximumStudentsCount', course?.maximumStudentsCount!)
			setValue('mainTeacherId', '')
			setValue('semester', course?.semester!)
			setValue('annotations', course?.annotations!)
			setValue('requirements', course?.requirements!)
		}
	}, [props.isShow])

	const onEditCourseByAdmin: SubmitHandler<CourseCreateType> = data => {
		editCourse({ courseId: course?.id!, body: data })
	}

	return (
		<Modal size='lg' show={props.isShow} onHide={props.onHide}>
			<Modal.Header closeButton>Редактировать курс</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit(onEditCourseByAdmin)} id='editCourseTeacherForm'>
					<InputCustom
						name='name'
						label={'Название курса'}
						register={register}
						validateFn={ValidateHelper.courseName}
						messageError={errors?.name?.message}
					/>
					<InputCustom
						name='startYear'
						label={'Год начала курса'}
						labelClassName='mt-3'
						register={register}
						validateFn={ValidateHelper.courseStartYear}
						messageError={errors?.startYear?.message}
						type='number'
					/>
					<InputCustom
						name='maximumStudentsCount'
						label={'Общее количество мест'}
						labelClassName='mt-3'
						register={register}
						validateFn={ValidateHelper.courseMaximumStudentsCount}
						messageError={errors?.maximumStudentsCount?.message}
						type='number'
					/>
					<FormLabel className={'mt-3'}>Семестр</FormLabel>
					<div className={'d-flex gap-3'}>
						<FormCheck
							{...register('semester')}
							name={'semester'}
							type={'radio'}
							value={'Autumn'}
							label={'Осенний'}
							id='semester_1'
						/>
						<FormCheck
							{...register('semester')}
							name={'semester'}
							type={'radio'}
							value={'Spring'}
							label={'Весенний'}
							id='semester_2'
						/>
					</div>
					<FormLabel className={'mt-3'}>Требования</FormLabel>
					<TextEditToolbar name='requirements' control={control} />
					{errors.requirements && <ErrorMessage text={errors.requirements.message} />}
					<FormLabel className={'mt-3'}>Аннотации</FormLabel>
					<TextEditToolbar name='annotations' control={control} />

					{errors.annotations && <ErrorMessage text={errors.annotations.message} />}
					<FormLabel className={'mt-3'}>Основной преподаватель курса</FormLabel>
					<ReactSelect
						defaultValue={{ label: 'Не выбрано', value: '' }}
						options={users?.map(u => ({ label: u.fullName, value: u.id }))}
						onChange={e => setValue('mainTeacherId', e?.value || '')}
					/>
					{errors.mainTeacherId && <ErrorMessage text={errors.mainTeacherId.message} />}
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button className='btn-secondary' onClick={props.onHide}>
					Отмена
				</Button>
				<ButtonCustom type='submit' text='Сохранить' form='editCourseTeacherForm' isLoading={isLoading} />
			</Modal.Footer>
		</Modal>
	)
}
