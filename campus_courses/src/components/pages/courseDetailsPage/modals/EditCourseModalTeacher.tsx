import { FormEvent } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useInput } from '../../../../hooks/useInput'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useEditCourseTeacherMutation } from '../../../../store/api/coursesApi'
import { EditCourseTeacherType } from '../../../../types/request.types'
import { TextEditToolbar } from '../../groupCoursesPage/TextEditToolbar'

interface IEditCourseModalProps {
	isShow: boolean
	onHide: () => void
}

export function EditCourseModalTeacher(props: IEditCourseModalProps) {
	const course = useTypedSelector(state => state.openedCourse.course)
	const [editCourse] = useEditCourseTeacherMutation()
	const { data, handleOnChange } = useInput<EditCourseTeacherType>({
		annotations: course?.annotations!,
		requirements: course?.requirements!,
	})

	const handleEditCourse = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		editCourse({
			courseId: course?.id!,
			body: { annotations: data.annotations, requirements: data.requirements },
		})
		props.onHide()
	}
	return (
		<Modal size='lg' show={props.isShow} onHide={props.onHide}>
			<Modal.Header closeButton>Редактировать курс</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleEditCourse} id='editCourseTeacherForm'>
					<Form.Label>Требования</Form.Label>
					<TextEditToolbar
						value={data.requirements}
						handleChange={(value: string) =>
							handleOnChange('requirements', value)
						}
					/>
					<Form.Label className='mt-3'>Аннотации</Form.Label>
					<TextEditToolbar
						value={data.annotations}
						handleChange={(value: string) =>
							handleOnChange('annotations', value)
						}
					/>
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
