import { Container } from 'react-bootstrap'

export default function NotFoundPage() {
	return (
		<Container className={'d-flex justify-content-center '}>
			<img style={{ maxWidth: '60%' }} src='/images/not_found_image.jpg' />
		</Container>
	)
}
