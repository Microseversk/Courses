import {Button, Form, Modal} from "react-bootstrap";
import {useState} from "react";

interface EditGroupItemModalProps {
    isShow: boolean,
    onHide: () => void,
}

export function EditGroupItemModal({isShow, onHide}: EditGroupItemModalProps) {

    const [groupName, setGroupName] = useState('имя группы')

    return (
        <Modal show={isShow} onHide={onHide} size={'lg'}>
            <Modal.Header closeButton>
                <Modal.Title>Редактирование группы</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label>Название группы</Form.Label>
                <Form.Control type={'text'} value={groupName} onChange={(e) => setGroupName(e.target.value)}/>
            </Modal.Body>
            <Modal.Footer>
                <Button className={'btn-secondary'} onClick={onHide}>Отмена</Button>
                <Button>Сохранить</Button>
            </Modal.Footer>
        </Modal>
    )
}