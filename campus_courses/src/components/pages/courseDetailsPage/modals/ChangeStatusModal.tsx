import {Button, Form, FormCheck, Modal, ModalBody, ModalFooter, ModalHeader} from "react-bootstrap";
import {FormEvent, useState} from "react";
import {CourseStatus} from "../../../../types/response.types";

interface IChangeStatusModalProps {
    isShow: boolean,
    onHide: () => void,
    status: "Started" | "OpenForAssigning" | "Created" | "Finished",
}

export function ChangeStatusModal(props: IChangeStatusModalProps) {

    const [newStatus,setNewStatus] = useState<"Started" | "OpenForAssigning" | "Created" | "Finished">(props.status)
    const handleChangeStatus = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(newStatus)
    }

    return (
        <Modal show={props.isShow} onHide={props.onHide} size={'lg'}>
            <ModalHeader closeButton>Изменение статуса курса</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleChangeStatus} className={'d-flex gap-3'} id={'formChangeStatus'}>
                    <FormCheck onChange={() => setNewStatus(CourseStatus.Created)} name={'status'} type={'radio'} label={'Создан'}/>
                    <FormCheck onChange={() => setNewStatus(CourseStatus.OpenForAssigning)} name={'status'} type={'radio'} label={'Открыт для записи'}/>
                    <FormCheck onChange={() => setNewStatus(CourseStatus.Started)} name={'status'} type={'radio'} label={'В процессе'}/>
                    <FormCheck onChange={() => setNewStatus(CourseStatus.Finished)} name={'status'} type={'radio'} label={'Завершен'}/>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button className={'btn-secondary'} onClick={props.onHide}>Отмена</Button>
                <Button type={"submit"} form={'formChangeStatus'}>Сохранить</Button>
            </ModalFooter>
        </Modal>
    )
}