import { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { RegularsHelper } from '../../../helpers/RegularsHelper'
import { useLoginUserMutation } from '../../../store/api/accountApi'
import { ButtonCustom } from '../../shared/ButtonCustom'
import { ErrorMessage } from '../../shared/ErrorMessage'

export interface IUserLogin {
	email: string
	password: string
}

export function LoginForm() {
	const nav = useNavigate()
	const [loginUser, { isLoading, error: serverError, data: response }] =
		useLoginUserMutation()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IUserLogin>({
		mode: 'onChange',
		defaultValues: {
			email: 'gymboss@gachi.com',
			password: 'B0yNextD00r',
		},
	})
	useEffect(() => {
		if (response) {
			nav('/')
			localStorage.setItem('token', response.token)
		}
	}, [response])

	const onSubmit: SubmitHandler<IUserLogin> = data => {
		loginUser(data)
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Form.Label>Email</Form.Label>
			<Form.Control
				{...register('email', {
					required: true,
					pattern: RegularsHelper.EmailPattern,
				})}
			/>
			{errors.email && <ErrorMessage text='Некорректный email' />}
			<Form.Label className='mt-3'>Пароль</Form.Label>
			<Form.Control
				{...register('password', { required: true })}
				type='password'
			/>
			{serverError && <ErrorMessage text='Неверный email или пароль' />}
			<ButtonCustom
				isLoading={isLoading || !!response}
				text='Войти'
				type='submit'
			/>
		</Form>
	)
}
