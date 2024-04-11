import { Button, Modal, ModalBody, ModalHeader, ModalTitle } from 'react-bootstrap'

type DeletePopupProps = {
	isShow: boolean
	onHide: () => void
	action?: any
}

export function DeletePopup(props: DeletePopupProps) {
	return (
		<Modal show={props.isShow} onHide={props.onHide}>
			<ModalHeader>
				<ModalTitle>Подтвердите действие</ModalTitle>
			</ModalHeader>
			<ModalBody>
				<Button
					onClick={() => {
						props.action()
						props.onHide()
					}}
					className='btn-danger w-100'>
					Подтвердить
				</Button>
			</ModalBody>
		</Modal>
	)
}
