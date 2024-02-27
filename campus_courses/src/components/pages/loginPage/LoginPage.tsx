import {Button, Card, Container, Form} from "react-bootstrap";

export function LoginPage() {
    return (
        <Container fluid className={'d-flex justify-content-center'}>
            <Card className={'w-75'}>
                <Card.Header>
                    <Card.Title>
                        Авторизация
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type={'email'} required/>
                    <Form.Label className={'mt-3'}>Password</Form.Label>
                    <Form.Control type={'password'} required/>
                    <Button className={'mt-3'}>Войти</Button>
                </Card.Body>
            </Card>
        </Container>
    )
}