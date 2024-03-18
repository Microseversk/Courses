import { useEffect } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { DateHelper } from '../../../helpers/DateHelper'
import { ValidateHelper } from '../../../helpers/ValidateHelper'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useEditUserProfileMutation } from '../../../store/api/accountApi'
import { ButtonCustom } from '../../shared/ButtonCustom'
import { ErrorMessage } from '../../shared/ErrorMessage'

interface IEditProfile {
	fullName: string
	birthDate: string
}

export function ProfileForm() {
	const [editUserProfile, { isLoading }] = useEditUserProfileMutation()
	const profile = useTypedSelector(state => state.auth.user)
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<IEditProfile>({
		mode: 'onChange',
	})

	useEffect(() => {
		if (profile) {
			setValue('fullName', profile?.fullName)
			setValue(
				'birthDate',
				DateHelper.to_DD_MM_YYYY(profile?.birthDate).yyyy_mm_dd
			)
		}
	}, [profile])

	const onSubmit: SubmitHandler<IEditProfile> = data => {
		editUserProfile({
			fullName: data.fullName,
			birthDate: DateHelper.to_ISO_string(data.birthDate),
		})
		toast.success('Профиль обновлен')
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Row className={'d-flex align-items-center'}>
				<Col md={2} xs={12}>
					ФИО:
				</Col>
				<Col>
					<Form.Control
						{...register('fullName', {
							required: {
								value: true,
								message: 'Обязательное поле',
							},
							maxLength: {
								value: 50,
								message: `Длина ФИО не должна превышать 50 символов`,
							},
						})}
					/>
					{errors.fullName && <ErrorMessage text={errors.fullName.message} />}
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
					<Form.Control
						type='date'
						{...register('birthDate', {
							validate: ValidateHelper.validateBirthDate,
						})}
					/>
					{errors.birthDate && <ErrorMessage text={errors.birthDate.message} />}
				</Col>
			</Row>
			<div className={'w-100 d-flex justify-content-end'}>
				<ButtonCustom
					className='mt-3'
					text='Изменить'
					isLoading={isLoading}
					type='submit'
				/>
			</div>
		</Form>
	)
}
