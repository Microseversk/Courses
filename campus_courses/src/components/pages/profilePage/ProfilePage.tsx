import { Card, Container } from 'react-bootstrap'
import { useTitle } from '../../../hooks/useTitle'
import { ProfileForm } from './ProfileForm'

export default function ProfilePage() {
	useTitle('Профиль')
	return (
		<Container className='d-flex justify-content-center'>
			<Card className='w-75'>
				<Card.Header>
					<Card.Title>Профиль</Card.Title>
				</Card.Header>
				<Card.Body>
					<ProfileForm />
				</Card.Body>
			</Card>
		</Container>
	)
}
