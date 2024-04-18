import { Container } from 'react-bootstrap'

export default function NotFoundPage() {
	return (
		<Container className={'d-flex justify-content-center '}>
			<img style={{ maxWidth: '50%' }} src='/images/not_found_image.webp' />
		</Container>
	)
}
