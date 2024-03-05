import {Button, Form, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {groupsApi, useEditGroupMutation} from "../../../store/api/groupsApi";

interface EditGroupItemModalProps {
    isShow: boolean,
    onHide: () => void,
    name : string,
    id : string

}

export function EditGroupItemModal(props : EditGroupItemModalProps) {

    const [groupName, setGroupName] = useState(props.name)
    const [editGroup, {isLoading}] = useEditGroupMutation()

    useEffect(() => {
        setGroupName(props.name)
    }, [props.isShow]);
    const handleEdit = () => {
        editGroup({id: props.id, name: groupName})
        props.onHide()
    }
    return (
        <Modal show={props.isShow} onHide={props.onHide} size={'lg'}>
            <Modal.Header closeButton>
                <Modal.Title>Редактирование группы</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label>Название группы</Form.Label>
                <Form.Control type={'text'} value={groupName} onChange={(e) => setGroupName(e.target.value)}/>
            </Modal.Body>
            <Modal.Footer>
                <Button className={'btn-secondary'} onClick={props.onHide}>Отмена</Button>
                <Button onClick={handleEdit}>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    )
}