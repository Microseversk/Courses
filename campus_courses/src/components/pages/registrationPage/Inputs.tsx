import {InputType} from "node:zlib";
import {Form} from "react-bootstrap";
import {IUserRegistration} from "../../../interfaces/Interfaces";

interface IRegisterProps {
    label: string,
    placeholder?: string,
    isRequired?: boolean,
    type: string,
    value: string | number,
    onChange?: () => void
}

export function RegisterInput(props: IRegisterProps) {
    return (
        <>
            <Form.Label className={'mt-3'}>{props.label}</Form.Label>

            <Form.Control type={props.type}
                          placeholder={props.placeholder}
                          value={props.value}
                          onChange={props.onChange}
                          required={props.isRequired}/>
        </>
    )
}