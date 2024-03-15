import { Button } from 'react-bootstrap'
import Loading from 'react-loading'

interface IButtonCustomProps {
	isLoading: boolean
	text: string | undefined
}

export function ButtonCustom({ isLoading, text }: IButtonCustomProps) {
	return (
		<Button type={'submit'} className={'mt-3'} style={{ position: 'relative' }}>
			{isLoading ? (
				<div
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
					}}
				>
					<Loading width={'25px'} height={'25px'} type='spin' />
				</div>
			) : null}
			<span className={isLoading ? 'invisible ' : 'visible '}>{text}</span>
		</Button>
	)
}
