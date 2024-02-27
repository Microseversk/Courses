import {Button, Card, Container, Form} from "react-bootstrap";
import {useState} from "react";
import {IUserRegistration} from "../../../interfaces/Interfaces";
import {RegisterInput} from "./Inputs";

export function RegistrationPage() {

    const [registerData, setRegisterData] = useState<IUserRegistration>({
        fullName: "",
        birthDate: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleInputChange = (key: keyof IUserRegistration, value: string) => {
        setRegisterData((prevState) => ({
                ...prevState,
                [key]: value
            })
        )
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //TODO сделать тут логику отправки данных
    }

    return (
        <Container fluid className={'d-flex justify-content-center'}>
            <Card className={'w-75'}>
                <Card.Header>
                    <Card.Title>
                        Регистрация нового пользователя
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <RegisterInput label={'ФИО'}
                                       type={'name'}
                                       isRequired={true}
                                       value={registerData.fullName}/>
                        <RegisterInput label={'День рождения'}
                                       type={'date'}
                                       isRequired={true}
                                       value={registerData.birthDate}/>
                        <RegisterInput label={'Email'}
                                       type={'email'}
                                       isRequired={true}
                                       value={registerData.email}/>
                        <Form.Text className={'d-block'}>Email будет использоваться для входа в систему</Form.Text>
                        <RegisterInput label={'Пароль'}
                                       type={'password'}
                                       isRequired={true}
                                       value={registerData.password}/>
                        <RegisterInput label={'Повторите пароль'}
                                       type={'password'}
                                       isRequired={true}
                                       value={registerData.confirmPassword}/>

                        <Button type={"submit"} className={'mt-3'}>Зарегистрироваться</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}