interface IErrorMessageProps {
	text: string | undefined
}

export function ErrorMessage({ text }: IErrorMessageProps) {
	return <div className='text-danger'>{text}</div>
}
