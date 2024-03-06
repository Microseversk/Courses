import {
    Form,
    FormCheck,
    FormControl,
    FormLabel, FormSelect,
    Modal,
    ModalBody,
    ModalHeader,
    ModalTitle
} from "react-bootstrap";
import {TextEditToolbar} from "./TextEditToolbar";


interface ICreateCourseModalProps {
    isShow: boolean,
    onHide: () => void,
}

export function CreateCourseModal(props: ICreateCourseModalProps) {
    return (
        <Modal show={props.isShow} onHide={props.onHide} size={'lg'}>
            <ModalHeader closeButton>
                <ModalTitle>Создание курса</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormLabel>Название курса</FormLabel>
                    <FormControl/>
                    <FormLabel className={'mt-3'}>Год начала курса</FormLabel>
                    <FormControl type={'number'}/>
                    <FormLabel className={'mt-3'}>Общее количество мест</FormLabel>
                    <FormControl type={'number'}/>
                    <FormLabel className={'mt-3'}>Семестр</FormLabel>
                    <div className={'d-flex gap-3'}>
                        <FormCheck name={'semester'} type={"radio"} label={'Осенний'}/>
                        <FormCheck name={'semester'} type={"radio"} label={'Весенний'}/>
                    </div>
                    <FormLabel className={'mt-3'}>Требования</FormLabel>
                    <TextEditToolbar/>
                    <FormLabel className={'mt-3'}>Аннотации</FormLabel>
                    <TextEditToolbar/>
                    <FormLabel className={'mt-3'}>Основной преподаватель курса</FormLabel>
                    <FormSelect>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </FormSelect>
                </Form>
            </ModalBody>
        </Modal>
    )
}