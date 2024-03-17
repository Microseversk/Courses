import { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { DateHelper } from '../../../helpers/DateHelper'
import { RegularsHelper } from '../../../helpers/RegularsHelper'
import { ValidateHelper } from '../../../helpers/ValidateHelper'
import { useRegisterUserMutation } from '../../../store/api/accountApi'
import { IUserRegistration } from '../../../types/request.types'
import { ButtonCustom } from '../../shared/ButtonCustom'
import { ErrorMessage } from '../../shared/ErrorMessage'

export function RegistrationForm() {
	const navigate = useNavigate()
	const [registerUser, { data: response, isLoading, error }] =
		useRegisterUserMutation()

	useEffect(() => {
		console.log(error)
		if (response) {
			localStorage.setItem('token', response.token)
			navigate('/')
		}
	}, [response, error])

	const onSubmit: SubmitHandler<IUserRegistration> = data => {
		registerUser({
			...data,
			birthDate: DateHelper.to_ISO_string(data.birthDate),
		})
	}

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<IUserRegistration>({
		mode: 'onChange',
	})

	return (
		<Form onSubmit={handleSubmit(onSubmit)} noValidate>
			<Form.Label>ФИО</Form.Label>
			<Form.Control
				{...register('fullName', {
					required: 'Обязательное поле',
					maxLength: {
						value: 50,
						message: 'Длина ФИО не должна превышать 50 символов',
					},
				})}
			/>
			{errors.fullName && <ErrorMessage text={errors.fullName.message} />}
			<Form.Label className='mt-3'>День рождения</Form.Label>
			<Form.Control
				type='date'
				{...register('birthDate', {
					validate: value => ValidateHelper.validateBirthDate(value),
				})}
			/>
			{errors.birthDate && <ErrorMessage text={errors.birthDate.message} />}
			<Form.Label className='mt-3'>Email</Form.Label>
			<Form.Control
				{...register('email', {
					required: 'Обязательное поле',
					pattern: {
						value: RegularsHelper.EmailPattern,
						message: 'Некорректный email',
					},
				})}
			/>
			{errors.email && <ErrorMessage text={errors.email.message} />}
			{error && 'status' in error && error.status === 409 && (
				<ErrorMessage text='Такой email уже зарегистрирован' />
			)}

			<Form.Label className='mt-3'>Пароль</Form.Label>
			<Form.Control
				type='password'
				{...register('password', {
					required: 'Обязательное поле',
					minLength: {
						value: 6,
						message: 'Длина должна быть не меньше 6 символов',
					},
				})}
			/>
			{errors.password && <ErrorMessage text={errors.password.message} />}

			<Form.Label className='mt-3'>Повторите пароль</Form.Label>
			<Form.Control
				type='password'
				{...register('confirmPassword', {
					validate: value => {
						if (value === getValues('password')) {
							return true
						}
						return 'Пароли не совпадают'
					},
				})}
			/>
			{errors.confirmPassword && (
				<ErrorMessage text={errors.confirmPassword.message} />
			)}

			<ButtonCustom
				className='mt-3'
				text='Зарегистрироваться'
				isLoading={isLoading || !!response}
				type='submit'
			/>
		</Form>
	)
}
