import { ReactNode, useId } from 'react'
import { FormControl, FormControlProps, FormGroup, FormLabel } from 'react-bootstrap'
import { ErrorMessage } from './ErrorMessage'

interface IInputCustom extends FormControlProps {
	label: ReactNode
	labelClassName?: string
	messageError?: string
	register?: any
	name: string
	validateFn?: (value: string) => boolean | string
}

export function InputCustom(props: IInputCustom) {
	const id = useId()
	return (
		<FormGroup>
			<FormLabel className={props.labelClassName} htmlFor={`custom_input_${props.label}_${id}`}>
				{props.label}
			</FormLabel>
			<FormControl
				id={`custom_input_${props.label}_${id}`}
				type={props.type}
				name={props.name}
				{...props.register(props.name, { validate: props.validateFn })}
			/>
			<ErrorMessage text={props.messageError}></ErrorMessage>
		</FormGroup>
	)
}
