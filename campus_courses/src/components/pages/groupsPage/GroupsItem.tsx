import {Button, CardText, Col, ListGroup, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {EditGroupItemModal} from "./EditGroupItemModal";
import {useState} from "react";

export function GroupsItem() {

    const [isRefactor,setIsRefactor] = useState(false)

    return (
        <>
            <EditGroupItemModal isShow={isRefactor} onHide={() => setIsRefactor(false)}/>
            <ListGroup.Item className={'d-flex pe-0'}>
                <Row className={'w-100'}>
                    <Col sm={12}  md={6} className={'d-flex justify-content-center justify-content-md-start align-items-center '}>
                        <Link to={'/groups'} className={'nav-link'}>
                            Группа
                        </Link>
                    </Col>
                    <Col sm={12} md={6} className={'d-flex gap-2 mt-3 mt-md-0 justify-content-center justify-content-md-end'}>
                            <Button className={'btn-warning'} onClick={() => setIsRefactor(true)}>РЕДАКТИРОВАТЬ</Button>
                            <Button className={'btn-danger'}>УДАЛИТЬ</Button>
                    </Col>
                </Row>


            </ListGroup.Item>
        </>
    )
}