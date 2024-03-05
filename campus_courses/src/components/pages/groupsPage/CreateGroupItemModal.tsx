import {Button, Form, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {groupsApi, useCreateGroupMutation, useEditGroupMutation} from "../../../store/api/groupsApi";

interface CreateGroupItemModalProps {
    isShow: boolean,
    onHide: () => void,
}

export function CreateGroupItemModal(props : CreateGroupItemModalProps) {

    const [groupName, setGroupName] = useState("")
    const [createGroup] = useCreateGroupMutation()

    const handleCreate = () => {
        createGroup({name: groupName})
        props.onHide()
        setGroupName("")
    }
    return (
        <Modal show={props.isShow} onHide={props.onHide} size={'lg'}>
            <Modal.Header closeButton>
                <Modal.Title>Создание группы</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label>Название новой группы</Form.Label>
                <Form.Control type={'text'} value={groupName} onChange={(e) => setGroupName(e.target.value)}/>
            </Modal.Body>
            <Modal.Footer>
                <Button className={'btn-secondary'} onClick={props.onHide}>Отмена</Button>
                <Button onClick={handleCreate}>Создать</Button>
            </Modal.Footer>
        </Modal>
    )
}