import {Button, Card, Container, Form} from "react-bootstrap";
import {CustomInput} from "./CustomInput";
import {useInput} from "../../../hooks/useInput";
import {FormEvent, useEffect} from "react";
import {useRegisterUserMutation} from "../../../store/api/accountApi";
import {useNavigate} from "react-router-dom";
import {IUserRegistration} from "../../../types/request.types";
import {DateHelper} from "../../../helpers/DateHelper";

export function RegistrationPage() {

    const {data, handleOnChange} = useInput<IUserRegistration>({
        'fullName': "",
        'email': "",
        'password': "",
        'confirmPassword': "",
        'birthDate': ""
    })
    const navigate = useNavigate()
    const [registerUser, {data: response, isLoading, error}] = useRegisterUserMutation()

    useEffect(() => {
        if (response) {
            localStorage.setItem('token', response.token)
            navigate('/')
        }
    }, [response]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        registerUser({
            ...data,
            birthDate: DateHelper.to_ISO_string(data.birthDate)
        })
    }

    return (
        <Container className={'d-flex justify-content-center'}>
            <Card className={'w-75'}>
                <Card.Header>
                    <Card.Title>
                        Регистрация нового пользователя
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <CustomInput label={'ФИО'}
                                     type={'name'}
                                     isRequired={true}
                                     onChange={(value) => handleOnChange('fullName', value)}
                                     value={data.fullName}/>
                        <CustomInput label={'День рождения'}
                                     type={'date'}
                                     isRequired={true}
                                     onChange={(value) => handleOnChange('birthDate', value)}
                                     value={data.birthDate}/>
                        <CustomInput label={'Email'}
                                     type={'email'}
                                     isRequired={true}
                                     onChange={(value) => handleOnChange('email', value)}
                                     value={data.email}/>
                        <Form.Text className={'d-block'}>Email будет использоваться для входа в систему</Form.Text>
                        <CustomInput label={'Пароль'}
                                     type={'password'}
                                     isRequired={true}
                                     onChange={(value) => handleOnChange('password', value)}
                                     value={data.password}/>
                        <CustomInput label={'Повторите пароль'}
                                     onChange={(value) => handleOnChange('confirmPassword', value)}
                                     type={'password'}
                                     isRequired={true}
                                     value={data.confirmPassword}/>

                        <Button type={"submit"} className={'mt-3'}>Зарегистрироваться</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}