import { useEffect } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { RegularsHelper } from '../../../helpers/RegularsHelper'
import { useLoginUserMutation } from '../../../store/api/accountApi'

export interface IUserLogin {
	email: string
	password: string
}

export default function LoginPage() {
	const [loginUser, { isLoading, error, data: response }] =
		useLoginUserMutation()
	const navigate = useNavigate()

	useEffect(() => {
		if (response) {
			localStorage.setItem('token', response.token)
			navigate('/')
		}
	}, [response])

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

	const onSubmit: SubmitHandler<IUserLogin> = data => {
		loginUser(data)
	}

	return (
		<Container className={'d-flex justify-content-center'}>
			<Card className={'w-75'}>
				<Card.Header>
					<Card.Title>Авторизация</Card.Title>
				</Card.Header>
				<Card.Body>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Label>Email</Form.Label>
						<Form.Control
							{...register('email', {
								required: true,
								pattern: RegularsHelper.EmailPattern,
							})}
						/>
						{errors.email && (
							<div className='text-danger'>Некорректный email</div>
						)}
						<Form.Label className='mt-3'>Пароль</Form.Label>
						<Form.Control
							{...register('password', { required: true })}
							type='password'
						/>
						{error && (
							<div className='text-danger'>Неверный email или пароль</div>
						)}
						<Button type={'submit'} className={'mt-3'}>
							Войти
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</Container>
	)
}
