import { useEffect } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useToastMutate } from '../../../../hooks/useToastMutate'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useEditCourseTeacherMutation } from '../../../../store/api/coursesApi'
import { EditCourseTeacher } from '../../../../types/request.types'
import { ButtonCustom } from '../../../shared/ButtonCustom'
import { TextEditToolbar } from '../../../shared/TextEditToolbar'

interface IEditCourseModalProps {
	isShow: boolean
	onHide: () => void
}

export function EditCourseModalTeacher(props: IEditCourseModalProps) {
	const course = useTypedSelector(state => state.openedCourse.course)
	const [editCourse, { isLoading, isSuccess, isError }] =
		useEditCourseTeacherMutation()

	const { setValue, getValues, handleSubmit } = useForm<EditCourseTeacher>()

	useToastMutate(isSuccess, isError, 'Курс изменён')

	const onEditCourseByTeacher: SubmitHandler<EditCourseTeacher> = data => {
		editCourse({
			courseId: course?.id!,
			body: { annotations: data.annotations, requirements: data.requirements },
		})
	}

	useEffect(() => {
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

	return (
		<Modal size='lg' show={props.isShow} onHide={props.onHide}>
			<Modal.Header closeButton>Редактировать курс</Modal.Header>
			<Modal.Body>
				<Form
					onSubmit={handleSubmit(onEditCourseByTeacher)}
					id='editCourseTeacherForm'
				>
					<Form.Label>Требования</Form.Label>
					<TextEditToolbar
						value={getValues('requirements')}
						handleChange={(value: string) => setValue('requirements', value)}
					/>
					<Form.Label className='mt-3'>Аннотации</Form.Label>
					<TextEditToolbar
						value={getValues('annotations')}
						handleChange={(value: string) => setValue('annotations', value)}
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button className='btn-secondary' onClick={props.onHide}>
					Отмена
				</Button>
				<ButtonCustom
					type='submit'
					form='editCourseTeacherForm'
					isLoading={isLoading}
					text='Сохранить'
				/>
			</Modal.Footer>
		</Modal>
	)
}
