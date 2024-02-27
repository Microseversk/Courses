import {Button, CardText, ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {EditGroupItemModal} from "./EditGroupItemModal";
import {useState} from "react";

export function GroupsItem() {

    const [isRefactor,setIsRefactor] = useState(false)

    return (
        <>
            <EditGroupItemModal isShow={isRefactor} onHide={() => setIsRefactor(false)}/>
            <ListGroup.Item className={'d-flex align-items-center'}>
                <Link to={'/groups'} className={'nav-link'}>
                    Группа
                </Link>
                <div className={'ms-auto d-flex gap-2'}>
                    <Button className={'btn-warning'} onClick={() => setIsRefactor(true)}>РЕДАКТИРОВАТЬ</Button>
                    <Button className={'btn-danger'}>УДАЛИТЬ</Button>
                </div>
            </ListGroup.Item>
        </>
    )
}