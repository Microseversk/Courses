import { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { DateHelper } from '../../../helpers/DateHelper'
import { ValidateHelper } from '../../../helpers/ValidateHelper'
import { useToastMutate } from '../../../hooks/useToastMutate'
import { useRegisterUserMutation } from '../../../store/api/accountApi'
import { IUserRegistration } from '../../../types/request.types'
import { ButtonCustom } from '../../shared/ButtonCustom'
import { ErrorMessage } from '../../shared/ErrorMessage'

export function RegistrationForm() {
	const navigate = useNavigate()
	const [registerUser, { data: response, isLoading, error, isSuccess }] =
		useRegisterUserMutation()

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<IUserRegistration>({
		mode: 'onChange',
	})

	useEffect(() => {
		console.log(error)
		if (response) {
			localStorage.setItem('token', response.token)
			navigate('/')
		}
	}, [response, error])

	useToastMutate(
		isSuccess,
		error && 'status' in error && error.status !== 409,
		'Успешная регистрация'
	)

	const onSubmit: SubmitHandler<IUserRegistration> = data => {
		registerUser({
			...data,
			birthDate: DateHelper.to_ISO_string(data.birthDate),
		})
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)} noValidate>
			<Form.Label>ФИО</Form.Label>
			<Form.Control
				{...register('fullName', {
					validate: ValidateHelper.fullName,
				})}
			/>
			{errors.fullName && <ErrorMessage text={errors.fullName.message} />}
			<Form.Label className='mt-3'>День рождения</Form.Label>
			<Form.Control
				type='date'
				{...register('birthDate', {
					validate: ValidateHelper.birthDate,
				})}
			/>
			{errors.birthDate && <ErrorMessage text={errors.birthDate.message} />}
			<Form.Label className='mt-3'>Email</Form.Label>
			<Form.Control
				{...register('email', {
					validate: ValidateHelper.email,
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
					validate: ValidateHelper.password,
				})}
			/>
			{errors.password && <ErrorMessage text={errors.password.message} />}

			<Form.Label className='mt-3'>Повторите пароль</Form.Label>
			<Form.Control
				type='password'
				{...register('confirmPassword', {
					validate: value => {
						if (!(value === getValues('password'))) {
							return 'Пароли не совпадают'
						}
						return true
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
