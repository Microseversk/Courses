import {AlertLink, Button, Col, ListGroup, ListGroupItem, Row, Tab, Tabs} from "react-bootstrap";
import {IStudent, ITeacher} from "../../../../types/response.types";
import {Link} from "react-router-dom";
import {TeachersList} from "./TeachersList";
import {StudentsList} from "./StudentsList";

interface IMemberTabsDetailsProps {
    className?: string,
    students: IStudent[],
    teachers: ITeacher[],
}

export function MemberTabsDetails(props: IMemberTabsDetailsProps) {
    console.log(props.teachers)
    return (
        <Tabs className={props.className} defaultActiveKey={'Students'}>
            <Tab className={'border mb-3'} title={'Студенты'} eventKey={'Students'}>
                <StudentsList students={props.students}/>
            </Tab>
            <Tab className={'border'} title={'Преподаватели'} eventKey={'Teachers'}>
                <Button size={'sm'} className={'ms-3 mb-3 mt-3'}>ДОБАВИТЬ ПРЕПОДАВАТЕЛЯ</Button>
                <TeachersList teachers={props.teachers}/>
            </Tab>
        </Tabs>
    )
}