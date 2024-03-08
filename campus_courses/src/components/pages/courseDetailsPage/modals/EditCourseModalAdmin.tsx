import { FormEvent } from 'react'
import {
	Button,
	Form,
	FormCheck,
	FormControl,
	FormLabel,
	FormSelect,
	Modal,
} from 'react-bootstrap'
import { DateHelper } from '../../../../helpers/DateHelper'
import { useInput } from '../../../../hooks/useInput'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useGetUsersQuery } from '../../../../store/api/usersApi'
import { CourseCreateType } from '../../../../types/request.types'
import { TextEditToolbar } from '../../groupCoursesPage/TextEditToolbar'

interface IEditCourseModalProps {
	isShow: boolean
	onHide: () => void
}

export function EditCourseModalAdmin(props: IEditCourseModalProps) {
	const course = useTypedSelector(state => state.openedCourse.course)
	const { data: users } = useGetUsersQuery('')
	const { data, handleOnChange } = useInput<CourseCreateType>({
		name: course?.name!,
		startYear: course?.startYear!,
		semester: course?.semester!,
		annotations: course?.annotations!,
		requirements: course?.requirements!,
		mainTeacherId: '',
		maximumStudentsCount: course?.maximumStudentsCount!,
	})

	const handleEditCourse = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		props.onHide()
	}
	return (
		<Modal size='lg' show={props.isShow} onHide={props.onHide}>
			<Modal.Header closeButton>Редактировать курс</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleEditCourse} id='editCourseTeacherForm'>
					<FormLabel>Название курса</FormLabel>
					<FormControl
						value={data.name}
						onChange={e => handleOnChange('name', e.target.value)}
					/>
					<FormLabel className={'mt-3'}>Год начала курса</FormLabel>
					<FormControl
						type={'number'}
						min={DateHelper.get_current_year()}
						value={data.startYear}
						onChange={e =>
							handleOnChange(
								'startYear',
								e.target.value,
								e.target.value.length <= 4
							)
						}
					/>
					<FormLabel className={'mt-3'}>Общее количество мест</FormLabel>
					<FormControl
						type={'number'}
						min={1}
						value={data.maximumStudentsCount}
						onChange={e =>
							handleOnChange(
								'maximumStudentsCount',
								e.target.value,
								e.target.value.length <= 4 && e.target.value[0] !== '0'
							)
						}
					/>
					<FormLabel className={'mt-3'}>Семестр</FormLabel>
					<div className={'d-flex gap-3'}>
						<FormCheck
							name={'semester'}
							type={'radio'}
							label={'Осенний'}
							checked={data.semester === 'Autumn'}
							onChange={() => handleOnChange('semester', 'Autumn')}
						/>
						<FormCheck
							name={'semester'}
							type={'radio'}
							label={'Весенний'}
							checked={data.semester === 'Spring'}
							onChange={() => handleOnChange('semester', 'Spring')}
						/>
					</div>
					<FormLabel className={'mt-3'}>Требования</FormLabel>
					<TextEditToolbar
						value={data.requirements}
						handleChange={(value: string) =>
							handleOnChange('requirements', value)
						}
					/>
					<FormLabel className={'mt-3'}>Аннотации</FormLabel>
					<TextEditToolbar
						value={data.annotations}
						handleChange={(value: string) =>
							handleOnChange('annotations', value)
						}
					/>
					<FormLabel className={'mt-3'}>Основной преподаватель курса</FormLabel>
					<FormSelect
						onChange={e => handleOnChange('mainTeacherId', e.target.value)}
					>
						{users?.map(user => (
							<option key={user.id} value={user.id}>
								{user.fullName}
							</option>
						))}
					</FormSelect>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button className='btn-secondary'>Отмена</Button>
				<Button type='submit' form='editCourseTeacherForm'>
					Сохранить
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
