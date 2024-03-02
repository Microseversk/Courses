import {InputType} from "node:zlib";
import {Form} from "react-bootstrap";
import React, {ChangeEvent} from "react";

interface ICustomInputProps {
    label?: string,
    placeholder?: string,
    isRequired?: boolean,
    type: string,
    value?: string | number,
    onChange?: (value: string) => void
}

export function CustomInput(props: ICustomInputProps) {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange && props.onChange(e.target.value)
    }

    return (
        <>
            {props.label && <Form.Label className={'mt-3'}>{props.label}</Form.Label>}

            <Form.Control type={props.type}
                          placeholder={props.placeholder}
                          onChange={handleChange}
                          value={props.value}
                          required={props.isRequired}/>
        </>
    )
}