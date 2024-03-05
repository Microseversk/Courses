import {Button, Container, ListGroup} from "react-bootstrap";
import {GroupsItem} from "./GroupsItem";
import {useGetGroupsQuery} from "../../../store/api/groupsApi";
import {Loader} from "../../layouts/loader/Loader";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useEffect} from "react";

export function GroupsPage() {

    const {data: groups, isLoading, refetch} = useGetGroupsQuery('')
    const user = useTypedSelector(state => state.auth.user)

    useEffect(() => {
        refetch()
    }, []);

    if (isLoading) {
        return <Loader/>
    }

    return (
        <Container>
            <div className={'fw-bold fs-2'}>Группы кампусных курсов</div>
            {user?.roles.isAdmin && <Button className={'mt-1'}>Создать</Button>}
            <ListGroup className={'mt-3'}>
                {groups && groups.map(group => (<GroupsItem key={group.id} id={group.id} name={group.name}/>))}
            </ListGroup>
        </Container>
    )
}