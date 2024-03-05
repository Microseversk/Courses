import {CardText, CardTitle, Col, Container, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import React from "react";
import {useGetGroupCoursesQuery} from "../../../store/api/groupsApi";
import {useParams} from "react-router-dom";
import {GroupsItem} from "../groupsPage/GroupsItem";
import {GroupItem} from "./GroupItem";
import {Loader} from "../../layouts/loader/Loader";

export function GroupCoursesPage() {

    const groupId = useParams()
    console.log(groupId?.id)
    const {data: courses, isLoading} = useGetGroupCoursesQuery({id: groupId?.id})

    if (isLoading) {
        return (
            <Loader/>
        )
    }

    return (
        <Container className={''}>
            <div className={'fw-bold fs-2'}>Группа - Компьютерные науки</div>
            <ListGroup className={'mt-3'}>
                {!courses?.length && <span className={'fs-2 text-danger'}>Курсы пока что не созданы</span>}
                {courses?.map((course) => (
                    <GroupItem id={course.id} name={course.name} startYear={course.startYear}
                               maximumStudentsCount={course.maximumStudentsCount}
                               remainingSlotsCount={course.remainingSlotsCount}
                               status={course.status}
                               semester={course.semester}/>
                ))}
            </ListGroup>
        </Container>
    )
}