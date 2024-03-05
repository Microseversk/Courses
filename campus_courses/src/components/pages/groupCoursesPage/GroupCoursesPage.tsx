import {CardText, CardTitle, Col, Container, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import React from "react";
import {useGetGroupCoursesQuery, useGetGroupsQuery} from "../../../store/api/groupsApi";
import {useParams} from "react-router-dom";
import {GroupItem} from "./GroupItem";
import {Loader} from "../../layouts/loader/Loader";

export function GroupCoursesPage() {

    const groupId = useParams()
    const {data: courses, isLoading : isLoadingCourses} = useGetGroupCoursesQuery({id: groupId?.id})
    const {data : groups, isLoading : isLoadingGroups} = useGetGroupsQuery('')

    if (isLoadingCourses || isLoadingGroups) {
        return (
            <Loader/>
        )
    }
    const filteredGroups = groups?.filter(group => group.id === groupId?.id)

    return (
        <Container className={''}>
            <div className={'fw-bold fs-2'}>Группа - {filteredGroups && filteredGroups.pop()?.name}</div>
            <ListGroup className={'mt-3'}>
                {!courses?.length && <span className={'fs-2 text-danger'}>Курсы пока что не созданы</span>}
                {courses?.map((course) => (
                    <GroupItem key={course.id} id={course.id} name={course.name} startYear={course.startYear}
                               maximumStudentsCount={course.maximumStudentsCount}
                               remainingSlotsCount={course.remainingSlotsCount}
                               status={course.status}
                               semester={course.semester}/>
                ))}
            </ListGroup>
        </Container>
    )
}