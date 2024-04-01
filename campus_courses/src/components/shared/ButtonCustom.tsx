import { ButtonHTMLAttributes } from 'react'
import { Button } from 'react-bootstrap'
import Loading from 'react-loading'
import { useModal } from '../../hooks/useModal'
import { DeletePopup } from './DeletePopup'

interface IButtonCustomProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean
	text: string | undefined
	popup?: boolean
	action?: () => void
}

export function ButtonCustom({ popup, action, isLoading, text, ...other }: IButtonCustomProps) {
	const { isShow, onHide, onShow } = useModal()

	return (
		<>
			{popup === true && <DeletePopup isShow={isShow} onHide={onHide} action={action} />}
			<Button onClick={onShow} {...other} style={{ position: 'relative' }} disabled={isLoading}>
				{isLoading ? (
					<div
						style={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
						}}>
						<Loading width={'25px'} height={'25px'} type='spin' />
					</div>
				) : null}
				<span className={isLoading ? 'invisible ' : 'visible '}>{text}</span>
			</Button>
		</>
	)
}
