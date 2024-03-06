import {
    Button,
    Form,
    FormCheck,
    FormControl,
    FormLabel, FormSelect,
    Modal,
    ModalBody, ModalFooter,
    ModalHeader,
    ModalTitle
} from "react-bootstrap";
import {TextEditToolbar} from "./TextEditToolbar";
import {FormEvent, useState} from "react";
import {ICourseCreate} from "../../../types/request.types";
import {useInput} from "../../../hooks/useInput";
import ModalContext from "react-bootstrap/ModalContext";
import {DateHelper} from "../../../helpers/DateHelper";
import {useGetUsersQuery} from "../../../store/api/usersApi";
import {useCreateCourseMutation} from "../../../store/api/coursesApi";
import {useParams} from "react-router-dom";


interface ICreateCourseModalProps {
    isShow: boolean,
    onHide: () => void,
}

export function CreateCourseModal(props: ICreateCourseModalProps) {

    const groupId = useParams()
    const [createCourse] = useCreateCourseMutation()
    const {data : users} = useGetUsersQuery('')
    const {data, handleOnChange} = useInput<ICourseCreate>({
        name: "",
        startYear: DateHelper.get_current_year(),
        maximumStudentsCount: 1,
        semester: "Autumn",
        annotations: "",
        requirements: "",
        mainTeacherId: ""
    })

    const handleCreateCourse = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        createCourse({body: data, groupId: groupId.id})
        props.onHide()
        handleOnChange('name',"")
        handleOnChange('startYear',DateHelper.get_current_year().toString())
        handleOnChange('maximumStudentsCount',"1")
        handleOnChange('semester',"Autumn")
        handleOnChange('annotations',"")
        handleOnChange('requirements',"")
        handleOnChange('mainTeacherId',"")
    }

    return (
        <Modal show={props.isShow} onHide={props.onHide} size={'lg'}>
            <ModalHeader closeButton>
                <ModalTitle>Создание курса</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form onSubmit={handleCreateCourse} id={'createCourseForm'}>
                    <FormLabel>Название курса</FormLabel>
                    <FormControl value={data.name} onChange={(e) => handleOnChange('name', e.target.value)}/>
                    <FormLabel className={'mt-3'}>Год начала курса</FormLabel>
                    <FormControl type={'number'} min={DateHelper.get_current_year()} value={data.startYear}
                                 onChange={(e) => handleOnChange('startYear', e.target.value, (e.target.value.length <= 4))}/>
                    <FormLabel className={'mt-3'}>Общее количество мест</FormLabel>
                    <FormControl type={'number'} min={1} value={data.maximumStudentsCount}
                                 onChange={(e) => handleOnChange('maximumStudentsCount', e.target.value, (e.target.value.length <= 4 && e.target.value[0] !== '0'))}/>
                    <FormLabel className={'mt-3'}>Семестр</FormLabel>
                    <div className={'d-flex gap-3'}>
                        <FormCheck name={'semester'} type={"radio"} label={'Осенний'}
                                   checked={data.semester === "Autumn"}
                                   onChange={() => handleOnChange('semester', 'Autumn')}/>
                        <FormCheck name={'semester'} type={"radio"} label={'Весенний'}
                                   checked={data.semester === "Spring"}
                                   onChange={() => handleOnChange('semester', 'Spring')}/>
                    </div>
                    <FormLabel className={'mt-3'}>Требования</FormLabel>
                    <TextEditToolbar value={data.requirements} handleChange={(value : string) => handleOnChange('requirements', value)}/>
                    <FormLabel className={'mt-3'}>Аннотации</FormLabel>
                    <TextEditToolbar value={data.annotations} handleChange={(value : string) => handleOnChange('annotations', value)}/>
                    <FormLabel className={'mt-3'}>Основной преподаватель курса</FormLabel>
                    <FormSelect onChange={(e) => handleOnChange('mainTeacherId',e.target.value)}>
                        {users?.map((user) => (
                            <option key={user.id} value={user.id}>{user.fullName}</option>
                        ))}
                    </FormSelect>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button className={'btn-secondary'} onClick={props.onHide}>Отмена</Button>
                <Button form={'createCourseForm'} type={'submit'}>Сохранить</Button>
            </ModalFooter>
        </Modal>
    )
}