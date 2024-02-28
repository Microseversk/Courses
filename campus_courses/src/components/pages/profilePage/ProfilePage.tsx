import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";

export function ProfilePage() {
    return (
            <Card>
                <Card.Header>
                    <Card.Title>Профиль</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Row className={'d-flex align-items-center'}>
                        <Col md={2} xs={12}>ФИО:</Col>
                        <Col>
                            <Form.Control className={'mt-1 mt-md-0'} value={'Тестовый авторизованный пользователь'}/>
                        </Col>
                    </Row>
                    <Row className={'d-flex mt-3 align-items-center'}>
                        <Col md={2} xs={12}>Email:</Col>
                        <Col>
                            <Card.Text className={'mt-1 mt-md-0'}>otrijka04@mail.ru</Card.Text>
                        </Col>
                    </Row>
                    <Row className={'d-flex mt-3 align-items-center'}>
                        <Col md={2} xs={12}>День рождения:</Col>
                        <Col className={'mt-1 mt-md-0'}>
                            <Form.Control type={'date'}/>
                        </Col>
                    </Row>
                    <div className={'w-100 d-flex justify-content-end'}>
                        <Button className={'mt-3'}>Изменить</Button>
                    </div>
                </Card.Body>
            </Card>
    )
}