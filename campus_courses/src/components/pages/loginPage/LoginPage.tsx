import { FormEvent, useEffect } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useInput } from '../../../hooks/useInput'
import { useLoginUserMutation } from '../../../store/api/accountApi'
import { Loader } from '../../layouts/loader/Loader'
import { CustomInput } from '../registrationPage/CustomInput'

export interface IUserLogin {
	email: string
	password: string
}

export function LoginPage() {
	const { data: loginData, handleOnChange } = useInput<IUserLogin>({
		email: 'gymboss@gachi.com',
		password: 'B0yNextD00r',
	})
	const [loginUser, { isLoading, error, data: response }] =
		useLoginUserMutation()
	const navigate = useNavigate()

	useEffect(() => {
		if (response) {
			localStorage.setItem('token', response.token)
			navigate('/')
		}
	}, [response])

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		loginUser(loginData)
	}

	if (isLoading) {
		return <Loader />
	}

	return (
		<Container className={'d-flex justify-content-center'}>
			<Card className={'w-75'}>
				<Card.Header>
					<Card.Title>Авторизация</Card.Title>
				</Card.Header>
				<Card.Body>
					<Form onSubmit={handleSubmit}>
						<CustomInput
							label={'Email'}
							type={'email'}
							value={loginData.email}
							onChange={value => handleOnChange('email', value)}
						/>
						<CustomInput
							label={'Password'}
							type={'password'}
							value={loginData.password}
							onChange={value => handleOnChange('password', value)}
						/>
						{error && (
							<div className={'mt-1 text-danger'}>Неверные учетные данные</div>
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
