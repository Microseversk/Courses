import {useState} from "react";

export function useInput<T>(initialState : T){

    const [data, setData] = useState(initialState)
    const handleOnChange = (key : keyof T, value : string) =>{
        setData(prevState => ({
            ...prevState,
            [key] : value
        }))
    }

    return {data, handleOnChange}
}