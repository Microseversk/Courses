import { Card, Container } from 'react-bootstrap'
import { useTitle } from '../../../hooks/useTitle'
import { LoginForm } from './LoginForm'

export default function LoginPage() {
	useTitle('Вход')
	return (
		<Container className={'d-flex justify-content-center'}>
			<Card className={'w-75'}>
				<Card.Header>
					<Card.Title>Авторизация</Card.Title>
				</Card.Header>
				<Card.Body>
					<LoginForm />
				</Card.Body>
			</Card>
		</Container>
	)
}
