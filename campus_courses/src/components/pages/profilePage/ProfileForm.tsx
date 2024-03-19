import { useEffect } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { DateHelper } from '../../../helpers/DateHelper'
import { ValidateHelper } from '../../../helpers/ValidateHelper'
import { useToastMutate } from '../../../hooks/useToastMutate'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useEditUserProfileMutation } from '../../../store/api/accountApi'
import { ButtonCustom } from '../../shared/ButtonCustom'
import { ErrorMessage } from '../../shared/ErrorMessage'

interface IEditProfile {
	fullName: string
	birthDate: string
}

export function ProfileForm() {
	const [editUserProfile, { isLoading, isSuccess, isError }] = useEditUserProfileMutation()
	const profile = useTypedSelector(state => state.auth.user)
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<IEditProfile>({
		mode: 'onChange',
	})

	useToastMutate(isSuccess, isError, 'Профиль обновлен')

	useEffect(() => {
		if (profile) {
			setValue('fullName', profile?.fullName)
			setValue('birthDate', DateHelper.to_DD_MM_YYYY(profile?.birthDate).yyyy_mm_dd)
		}
	}, [profile])

	const onSubmit: SubmitHandler<IEditProfile> = data => {
		editUserProfile({
			fullName: data.fullName,
			birthDate: DateHelper.to_ISO_string(data.birthDate),
		})
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
							validate: ValidateHelper.fullName,
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
							validate: ValidateHelper.birthDate,
						})}
					/>
					{errors.birthDate && <ErrorMessage text={errors.birthDate.message} />}
				</Col>
			</Row>
			<div className={'w-100 d-flex justify-content-end'}>
				<ButtonCustom className='mt-3' text='Изменить' isLoading={isLoading} type='submit' />
			</div>
		</Form>
	)
}
