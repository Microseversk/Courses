import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";

export function ProfilePage() {
    return (
            <Card>
                <Card.Header>
                    <Card.Title>Профиль</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Row className={'d-flex align-items-center'}>
                        <Col md={2} xs={12}>ФИО</Col>
                        <Col>
                            <Form.Control value={'Тестовый авторизованный пользователь'}></Form.Control>
                        </Col>
                    </Row>
                    <Row className={'d-flex mt-3 align-items-center'}>
                        <Col md={2} xs={12}>Email</Col>
                        <Col>
                            <Card.Text>otrijka04@mail.ru</Card.Text>
                        </Col>
                    </Row>
                    <Row className={'d-flex mt-3 align-items-center'}>
                        <Col md={2} xs={12}>День рождения</Col>
                        <Col>
                            <Form.Control type={'date'}></Form.Control>
                        </Col>
                    </Row>
                    <div className={'w-100 d-flex justify-content-end'}>
                        <Button className={'mt-3'}>Изменить</Button>
                    </div>
                </Card.Body>
            </Card>
    )
}