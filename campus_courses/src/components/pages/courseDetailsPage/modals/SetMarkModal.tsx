import { FormEvent, useEffect, useState } from 'react'
import { Button, Form, FormCheck, FormLabel, Modal } from 'react-bootstrap'
import { useToastMutate } from '../../../../hooks/useToastMutate'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useSetMarkMutation } from '../../../../store/api/coursesApi'
import { IModalProps } from '../../../../types/common.types'
import { MarkTime, MarkType } from '../../../../types/request.types'
import { IStudent } from '../../../../types/response.types'
import { ButtonCustom } from '../../../shared/ButtonCustom'

interface ISetMarkModalProps extends IModalProps {
	markTime: MarkTime
	student: IStudent
}

export function SetMarkModal(props: ISetMarkModalProps) {
	const courseId = useTypedSelector(state => state.openedCourse.course?.id)
	const [setStudentMark, { isSuccess, isError, isLoading }] = useSetMarkMutation()
	const [mark, setMark] = useState<MarkType>()

	useToastMutate(isSuccess, isError, 'Оценка поставлена')

	useEffect(() => {
		if (!isLoading) {
			props.onHide()
		}
	}, [isLoading])

	const onSetMark = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!mark) return
		setStudentMark({
			courseId: courseId!,
			studentId: props.student.id,
			body: { mark, markType: props.markTime },
		})
	}

	return (
		<Modal show={props.isShow} onHide={props.onHide}>
			<Modal.Header closeButton>
				Изменение оценки для "{props.markTime === 'Final' ? 'Финальная аттестация' : 'Промежуточная аттестация'}"
			</Modal.Header>
			<Modal.Body>
				<Form id='setMarkForm' onSubmit={onSetMark}>
					<FormLabel>Студент - {props.student && props.student.name}</FormLabel>
					<FormCheck
						id='mark_1'
						name='mark'
						type='radio'
						label='Пройдено'
						onChange={() => {
							setMark('Passed')
						}}
					/>
					<FormCheck
						id='mark_2'
						name='mark'
						type='radio'
						label='Зафейлено'
						onChange={() => {
							setMark('Failed')
						}}
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button className='btn-secondary' onClick={props.onHide}>
					Отмена
				</Button>
				<ButtonCustom type='submit' form='setMarkForm' text='Сохранить' isLoading={isLoading} />
			</Modal.Footer>
		</Modal>
	)
}
