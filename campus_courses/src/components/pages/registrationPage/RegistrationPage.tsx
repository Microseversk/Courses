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

    const handleInputChange = (key : keyof IUserRegistration, value : string) => {
        setRegisterData((prevState) => ({
            ...prevState,
            [key] : value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(registerData)
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
                    <Form onSubmit={handleSubmit}>
                        <RegisterInput label={'ФИО'}
                                       type={'name'}
                                       isRequired={true}
                                       onChange={(value) => handleInputChange('fullName', value)}
                                       value={registerData.fullName}/>
                        <RegisterInput label={'День рождения'}
                                       type={'date'}
                                       isRequired={true}
                                       onChange={(value) => handleInputChange('birthDate', value)}
                                       value={registerData.birthDate}/>
                        <RegisterInput label={'Email'}
                                       type={'email'}
                                       isRequired={true}
                                       onChange={(value) => handleInputChange('email', value)}
                                       value={registerData.email}/>
                        <Form.Text className={'d-block'}>Email будет использоваться для входа в систему</Form.Text>
                        <RegisterInput label={'Пароль'}
                                       type={'password'}
                                       isRequired={true}
                                       onChange={(value) => handleInputChange('password', value)}
                                       value={registerData.password}/>
                        <RegisterInput label={'Повторите пароль'}
                                       onChange={(value) => handleInputChange('confirmPassword', value)}
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