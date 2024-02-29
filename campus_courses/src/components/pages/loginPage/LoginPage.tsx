import {Button, Card, Container, Form} from "react-bootstrap";
import {CustomInput} from "../registrationPage/CustomInput";
import {useInput} from "../../../hooks/useInput";
import {IUserLogin} from "../../../services/accountService/AccountServiceTypes";
import {useMutation} from "react-query";
import AccountService from "../../../services/accountService/AccountService";
import {AxiosError} from "axios";

export function LoginPage() {

    const {data, handleOnChange} = useInput<IUserLogin>({'email' : "", 'password' : ""})

    const loginMutation = useMutation(['login'], (data : IUserLogin) => AccountService.login(data),
        {
            onSuccess(data) {
                console.log(data.data)
            },
            onError({response}: AxiosError) {
                console.log(response?.data)
            }
        })

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault()
        loginMutation.mutate(data)
    }

    return (
        <Container fluid className={'d-flex justify-content-center'}>
            <Card className={'w-75'}>
                <Card.Header>
                    <Card.Title>Авторизация</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <CustomInput label={'Email'} type={'email'} value={data.email}
                                     onChange={(value) => handleOnChange('email', value)}/>
                        <CustomInput label={'Password'} type={'password'} value={data.password}
                                     onChange={(value) => handleOnChange('password', value)}/>
                        <Button type={'submit'} className={'mt-3'}>Войти</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}