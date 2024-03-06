import {AlertLink, Button, Col, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {IStudent} from "../../../../types/response.types";

interface IStudentsListProps{
    students: IStudent[],
}
export function StudentsList(props: IStudentsListProps){
    return(
        <ListGroup>
            {props.students.map((student) => (
                <ListGroupItem key={student.id} className={'border-0 border-bottom'}>
                    <Row>
                        <Col sm={12} md={4}>
                            <div>{student.name}</div>
                            <div>
                                <span className={'text-muted'}>Статус - </span>
                                {
                                    student.status === 'Accepted' ?
                                        <span className={'text-success'}>принят в группу</span>
                                        :
                                        student.status === 'Declined' ?
                                            <span className={'text-danger'}>отклонен</span>
                                            :
                                            <span className={'text-primary'}>в очереди</span>
                                }
                            </div>
                            <div className={'text-muted'}>{student.email}</div>
                        </Col>
                        {student.status === 'Accepted' &&
                            <>
                                <Col sm={12} md={4} className={' mt-2 mt-md-0'}>
                                    <AlertLink className={'link-primary fw-normal'}>Промежуточная аттестация
                                        -</AlertLink>
                                    {student.midtermResult === 'Passed' ?
                                        <span className={'ms-1 badge bg-success'}>Пройдена</span>
                                        :
                                        student.midtermResult === 'Failed' ?
                                            <span className={'ms-1 badge bg-danger'}>Провалена</span>
                                            :
                                            <span className={'ms-1 badge bg-secondary'}>Нет отметки</span>
                                    }


                                </Col>
                                <Col sm={12} md={4}>
                                    <AlertLink className={'link-primary fw-normal'}>Финальная аттестация
                                        -</AlertLink>
                                    {student.finalResult === 'Passed' ?
                                        <span className={'ms-1 badge bg-success'}>Пройдена</span>
                                        :
                                        student.finalResult === 'Failed' ?
                                            <span className={'ms-1 badge bg-danger'}>Провалена</span>
                                            :
                                            <span className={'ms-1 badge bg-secondary'}>Нет отметки</span>
                                    }
                                </Col>
                            </>
                        }
                        {student.status === 'InQueue' &&
                            <Col sm={12} md={8} className={'d-flex align-content-stretch justify-content-start justify-content-md-end'}>
                                <Button>Принять</Button>
                                <Button className={'ms-3 btn-danger'}>Отклонить заявку</Button>
                            </Col>
                        }

                    </Row>
                </ListGroupItem>
            ))}
        </ListGroup>
    )
}