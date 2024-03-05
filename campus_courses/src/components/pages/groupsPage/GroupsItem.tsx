import {Button, CardText, Col, ListGroup, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {EditGroupItemModal} from "./EditGroupItemModal";
import {useState} from "react";
import {useDeleteGroupMutation} from "../../../store/api/groupsApi";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {IGroupResponse} from "../../../types/request.types";

interface IGroupItemProps extends IGroupResponse {

}

export function GroupsItem(props: IGroupItemProps) {

    const [isRefactor, setIsRefactor] = useState(false)
    const user = useTypedSelector(state => state.auth.user)

    const [deleteGroup, {isLoading}] = useDeleteGroupMutation()


    const handleDelete = () => {
        deleteGroup({id : props.id})
    }

    return (
        <>
            <EditGroupItemModal name={props.name} id={props.id} isShow={isRefactor} onHide={() => setIsRefactor(false)}/>
            <ListGroup.Item className={'d-flex pe-0'}>
                <Row className={'w-100'}>
                    <Col sm={12} md={6}
                         className={'d-flex justify-content-center justify-content-md-start align-items-center '}>
                        <Link to={'/groups'} className={'nav-link'}>
                            {props.name}
                        </Link>
                    </Col>
                    {user?.roles.isAdmin
                        &&
                        <Col sm={12} md={6}
                             className={'d-flex gap-2 mt-3 mt-md-0 justify-content-center justify-content-md-end'}>
                            <Button className={'btn-warning'} onClick={() => setIsRefactor(true)}>РЕДАКТИРОВАТЬ</Button>
                            <Button className={'btn-danger'} onClick={handleDelete}>УДАЛИТЬ</Button>
                        </Col>
                    }
                </Row>


            </ListGroup.Item>
        </>
    )
}