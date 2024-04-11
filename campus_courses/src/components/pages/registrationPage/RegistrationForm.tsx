import { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DateHelper } from '../../../helpers/DateHelper'
import { ValidateHelper } from '../../../helpers/ValidateHelper'
import { useToastMutate } from '../../../hooks/useToastMutate'
import { useRegisterUserMutation } from '../../../store/api/accountApi'
import { setAuth } from '../../../store/slices/auth.slice'
import { IUserRegistration } from '../../../types/request.types'
import { ButtonCustom } from '../../shared/ButtonCustom'
import { InputCustom } from '../../shared/InputCustom'

export function RegistrationForm() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [registerUser, { data: response, isLoading, error, isSuccess }] = useRegisterUserMutation()

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
		setError,
	} = useForm<IUserRegistration>({
		mode: 'onChange',
	})

	useEffect(() => {
		if (response) {
			localStorage.setItem('token', response.token)
			dispatch(setAuth(true))
			navigate('/')
		}
	}, [response])

	useEffect(() => {
		if (!error || !(error && 'status' in error)) return
		if (error.status === 409) {
			setError('email', { message: 'Такой email уже зарегистрирован' })
		}
	}, [error])

	useToastMutate(isSuccess, error && 'status' in error && error.status !== 409, 'Успешная регистрация')

	const onSubmit: SubmitHandler<IUserRegistration> = data => {
		registerUser({
			...data,
			birthDate: DateHelper.to_ISO_string(data.birthDate),
		})
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)} noValidate>
			<InputCustom
				label={'ФИО'}
				name={'fullName'}
				register={register}
				validateFn={ValidateHelper.fullName}
				messageError={errors.fullName?.message}
			/>
			<InputCustom
				label={'Дата рождения'}
				name={'birthDate'}
				register={register}
				validateFn={ValidateHelper.birthDate}
				messageError={errors.birthDate?.message}
				type='date'
			/>
			<InputCustom
				label={'Email'}
				name={'email'}
				register={register}
				validateFn={ValidateHelper.email}
				messageError={errors.email?.message}
			/>

			<InputCustom
				label={'Пароль'}
				name={'password'}
				register={register}
				validateFn={ValidateHelper.password}
				messageError={errors.password?.message}
				type='password'
			/>

			<InputCustom
				label={'Подтвердите пароль'}
				name={'confirmPassword'}
				register={register}
				validateFn={value => {
					if (value !== getValues('password')) {
						return 'Пароли не совпадают'
					}
					return true
				}}
				messageError={errors.confirmPassword?.message}
				type='password'
			/>
			<ButtonCustom className='mt-3' text='Зарегистрироваться' isLoading={isLoading || !!response} type='submit' />
		</Form>
	)
}
