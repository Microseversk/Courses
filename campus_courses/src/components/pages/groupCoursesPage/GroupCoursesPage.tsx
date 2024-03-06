import {Button, CardText, CardTitle, Col, Container, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import React, {useState} from "react";
import { useGetGroupsQuery} from "../../../store/api/groupsApi";
import {useParams} from "react-router-dom";
import {GroupItem} from "./GroupItem";
import {Loader} from "../../layouts/loader/Loader";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {CreateCourseModal} from "./CreateCourseModal";
import {useGetGroupCoursesQuery} from "../../../store/api/coursesApi";

export function GroupCoursesPage() {

    const groupId = useParams()
    const isAdmin = useTypedSelector(state => state.auth.user?.roles?.isAdmin)
    const {data: courses, isLoading : isLoadingCourses} = useGetGroupCoursesQuery({id: groupId?.id})
    const {data : groups, isLoading : isLoadingGroups} = useGetGroupsQuery('')
    const [isCreatingCourse, setIsCreatingCourse] = useState(false)

    if (isLoadingCourses || isLoadingGroups) {
        return (
            <Loader/>
        )
    }
    const filteredGroups = groups?.filter(group => group.id === groupId?.id)

    return (
        <Container>
            <CreateCourseModal isShow={isCreatingCourse} onHide={() => {setIsCreatingCourse(false)}}/>
            <div className={'fw-bold fs-2'}>Группа - {filteredGroups && filteredGroups.pop()?.name}</div>
            {isAdmin && <Button onClick={() => setIsCreatingCourse(true)} className={'mt-1'}>Создать курс</Button>}
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