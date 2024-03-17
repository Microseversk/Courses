import { useEffect } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { DateHelper } from '../../../helpers/DateHelper'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useEditUserProfileMutation } from '../../../store/api/accountApi'
import { ButtonCustom } from '../../shared/ButtonCustom'

interface IEditProfile {
	fullName: string
	birthDate: string
}

export function ProfileForm() {
	const [editUserProfile, { isLoading }] = useEditUserProfileMutation()
	const profile = useTypedSelector(state => state.auth.user)
	const { register, handleSubmit, setValue } = useForm<IEditProfile>()
	const onSubmit: SubmitHandler<IEditProfile> = data => {
		console.log(data)
		editUserProfile({
			fullName: data.fullName,
			birthDate: DateHelper.to_ISO_string(data.birthDate),
		})
	}

	useEffect(() => {
		if (profile) {
			setValue('fullName', profile?.fullName)
			setValue(
				'birthDate',
				DateHelper.to_DD_MM_YYYY(profile?.birthDate).yyyy_mm_dd
			)
		}
	}, [profile])

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Row className={'d-flex align-items-center'}>
				<Col md={2} xs={12}>
					ФИО:
				</Col>
				<Col>
					<Form.Control {...register('fullName')} />
				</Col>
			</Row>
			<Row className={'d-flex mt-3 align-items-center'}>
				<Col md={2} xs={12}>
					Email:
				</Col>
				<Col>
					<Card.Text className={'mt-1 mt-md-0'}>{profile?.email}</Card.Text>
				</Col>
			</Row>
			<Row className={'d-flex mt-3 align-items-center'}>
				<Col md={2} xs={12}>
					День рождения:
				</Col>
				<Col className={'mt-1 mt-md-0'}>
					<Form.Control type='date' {...register('birthDate')} />
				</Col>
			</Row>
			<div className={'w-100 d-flex justify-content-end'}>
				<ButtonCustom text='Изменить' isLoading={isLoading} />
			</div>
		</Form>
	)
}
