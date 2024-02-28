import {InputType} from "node:zlib";
import {Form} from "react-bootstrap";
import {IUserRegistration} from "../../../interfaces/Interfaces";
import React from "react";

interface IRegisterProps {
    label: string,
    placeholder?: string,
    isRequired?: boolean,
    type: string,
    value: string | number,
    onChange?: (value: string) => void
}

export function RegisterInput(props: IRegisterProps) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange && props.onChange(e.target.value)
    }

    return (
        <>
            <Form.Label className={'mt-3'}>{props.label}</Form.Label>

            <Form.Control type={props.type}
                          placeholder={props.placeholder}
                          onChange={handleChange}
                          value={props.value}
                          required={props.isRequired}/>
        </>
    )
}