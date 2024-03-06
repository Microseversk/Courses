import {Button, Col, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import React from "react";

interface ICommonCourseDetailsProps {
    name: string,
    startYear: number,
    semester: "Autumn" | "Spring",
    status: "Started" | "OpenForAssigning" | "Created" | "Finished",
    maximumStudentsCount: number,
    studentsEnrolledCount: number,
    studentsInQueueCount: number,
}

export function CommonCourseDetails(props: ICommonCourseDetailsProps) {

    return (
        <>
            <div className={'fs-2 fw-bold'}>{props?.name}</div>
            <div className={'d-flex align-items-end justify-content-between'}>
                <div className={'fw-bold'}>Основные данные курса</div>
                <Button className={'btn-warning'}>РЕДАКТИРОВАТЬ</Button>
            </div>
            <ListGroup className={'mt-2'}>
                <ListGroupItem>
                    <Row className={'d-flex align-content-stretch'}>
                        <Col>
                            <div className={'fw-bold'}>Статус курса</div>
                            <div className={'text-success'}>
                                {
                                    props?.status === "Started" ?
                                        <span className={'text-primary'}>В процессе обучения</span> :
                                        props?.status === "OpenForAssigning" ?
                                            <span className={'text-success'}>Открыт для записи</span> :
                                            props?.status === "Created" ?
                                                <span className={'text-secondary'}>Создан</span> :
                                                props?.status === "Finished" ?
                                                    <span className={'text-danger'}>Закрыт</span> : <></>
                                }
                            </div>
                        </Col>
                        <Col className={'text-end'}>
                            <Button className={'btn-warning h-100'}>ИЗМЕНИТЬ</Button>
                        </Col>
                    </Row>
                </ListGroupItem>
                <ListGroupItem>
                    <Row className={'d-flex align-content-stretch'}>
                        <Col>
                            <div className={'fw-bold'}>Учебный год</div>
                            <div>{props?.startYear}</div>
                        </Col>
                        <Col>
                            <div className={'fw-bold'}>Семестр</div>
                            <div>{props?.semester === 'Autumn' ? "Осенний" : "Весенний"}</div>
                        </Col>
                    </Row>
                </ListGroupItem>
                <ListGroupItem>
                    <Row className={'d-flex align-content-stretch'}>
                        <Col>
                            <div className={'fw-bold'}>Всего мест</div>
                            <div>{props?.maximumStudentsCount}</div>
                        </Col>
                        <Col>
                            <div className={'fw-bold'}>Студентов зачислено</div>
                            <div>{props?.studentsEnrolledCount}</div>
                        </Col>
                    </Row>
                </ListGroupItem>
                <ListGroupItem>
                    <Row className={'d-flex align-content-stretch'}>
                        <Col>
                            <div className={'fw-bold'}>Заявок на рассмотрении</div>
                            <div>{props?.studentsInQueueCount}</div>
                        </Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        </>
    )
}