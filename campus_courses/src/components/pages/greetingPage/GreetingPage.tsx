import { Container } from 'react-bootstrap'
import { useTitle } from '../../../hooks/useTitle'
import { useTypedSelector } from '../../../hooks/useTypedSelector'

export default function GreetingPage() {
	useTitle('Добро пожаловать')
	const user = useTypedSelector(state => state.auth.user)

	return (
		<Container className={'text-center fw-light fs-1 '}>
			{user ? (
				<span>{user.fullName}, добро пожаловать в систему кампусных курсов</span>
			) : (
				<span>Добро пожаловать в систему кампусных курсов</span>
			)}
			<div className=' w-100 mt-5'>
				<img style={{ maxWidth: '100%' }} src={'/images/welcome_image.png'} title='welcome image' />
			</div>
		</Container>
	)
}
