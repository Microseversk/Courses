import {Button, Card, Container, Form} from "react-bootstrap";
import {CustomInput} from "./CustomInput";
import {useInput} from "../../../hooks/useInput";
import {IUserRegistration} from "../../../services/accountService/AccountServiceTypes";
import {useMutation} from "react-query";
import AccountService from "../../../services/accountService/AccountService";
import {AxiosError} from "axios";

export function RegistrationPage() {

    const {data, handleOnChange} = useInput<IUserRegistration>({
        'fullName': "",
        'email' : "",
        'password' : "",
        'confirmPassword' : "",
        'birthDate' : ""
    })

    const registerMutation = useMutation(['register'], (data: IUserRegistration) => AccountService.registration(data),
        {
            onSuccess(data){
                console.log(data.data)
            },
            onError({response} : AxiosError){
                console.log(response?.data)
            }
        })

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault()
        registerMutation.mutate(data)
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